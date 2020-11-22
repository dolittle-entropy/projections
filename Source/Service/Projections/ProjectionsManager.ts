// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as grpc from '@grpc/grpc-js';

import { EventHandlersClient } from '@dolittle/runtime.contracts/Runtime/Events.Processing/EventHandlers_grpc_pb';
import { EventHandlersBuilder } from '@dolittle/sdk.events.handling';
import { Cancellation } from '@dolittle/sdk.resilience';
import { MicroserviceId, Environment, ExecutionContext, TenantId, CorrelationId, Claims, Version } from '@dolittle/sdk.execution';
import { Client } from '@dolittle/sdk';
import { IContainer } from '@dolittle/sdk.common';


import { Projection } from './Projection';
import { IProjectionsManager } from './IProjectionsManager';

import { Logger } from 'winston';

export class ProjectionsManager implements IProjectionsManager {

    constructor(
        private readonly _connectionString: string,
        private readonly _client: Client,
        private readonly _container: IContainer,
        private readonly _logger: Logger) {

    }

    async register(projection: Projection): Promise<void> {
        // This is just a workaround since we're not part of the SDK - this would be in the ClientBuilder Build method
        const executionContext = new ExecutionContext(
            MicroserviceId.from('7c3d7387-6324-4309-980f-31b9c4b39046'),
            TenantId.system,
            Version.notSet,
            Environment.undetermined,
            CorrelationId.system,
            Claims.empty);


        const credentials = grpc.credentials.createInsecure();
        const eventHandlers = new EventHandlersBuilder();

        const distinct = (value: any, index: number, self: any[]) => {
            return self.indexOf(value) === index;
        };
        const eventTypes = projection.operationGroups.flatMap(_ => _.operations.flatMap(o => o.eventTypes)).filter(distinct);

        eventHandlers.createEventHandler(projection.stream.value, b => {
            const builder = b.partitioned();
            if (projection.isScoped) {
                b.inScope(projection.scope);
            }

            for (const eventType of eventTypes) {
                builder.handle(eventType, (event, context) => projection.handle.call(projection, eventType, event, context));
            }
        });

        const eventHandlersForProjections = eventHandlers.buildAndRegister(
            new EventHandlersClient(this._connectionString, credentials),
            this._container,
            executionContext,
            this._client.eventTypes,
            this._logger,
            Cancellation.default);
    }
}
