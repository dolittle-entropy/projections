// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as grpc from '@grpc/grpc-js';
import { Projection } from './Projection';
import { ProjectionDescriptor } from '../SDK/ProjectionDescriptor';
import { EventHandlersClient } from '@dolittle/runtime.contracts/Runtime/Events.Processing/EventHandlers_grpc_pb';
import { Client } from '@dolittle/sdk';
import { IContainer } from '@dolittle/sdk.common';
import { EventHandlersBuilder } from '@dolittle/sdk.events.handling';
import { Cancellation } from '@dolittle/sdk.resilience';
import { MicroserviceId, Environment, ExecutionContext, TenantId, CorrelationId, Claims, Version } from '@dolittle/sdk.execution';

export class ProjectionService {
    static register(client: Client, container: IContainer, connectionString: string, descriptor: ProjectionDescriptor): void {
        // This is just a workaround since we're not part of the SDK
        const executionContext = new ExecutionContext(
            MicroserviceId.from('7c3d7387-6324-4309-980f-31b9c4b39046'),
            TenantId.system,
            Version.notSet,
            Environment.undetermined,
            CorrelationId.system,
            Claims.empty);

        const credentials = grpc.credentials.createInsecure();
        const eventHandlersBuilder = new EventHandlersBuilder();


        const eventHandlersForProjections = eventHandlersBuilder.buildAndRegister(
            new EventHandlersClient(connectionString, credentials),
            container,
            executionContext,
            client.eventTypes,
            client.logger,
            Cancellation.default);


    }
}

        /*
        set(targetProperty: PropertyAccessor<TDocument>, propertyMapBuilderCallback: PropertyMapBuilderCallback): ProjectionBuilder<TDocument> {
            const targetPropertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
            const propertyMapBuilder = new PropertyMapBuilder(targetPropertyDescriptor);
            propertyMapBuilderCallback(propertyMapBuilder);
            this._propertyMapBuilders.push(propertyMapBuilder);

            return this;
        }

        const distinct = (value: any, index: number, self: any[]) => {
            return self.indexOf(value) === index;
        };
        const reducers = this._propertyMapBuilders.map(_ => _.build());
        const events = reducers.flatMap(_ => _.eventTypes).filter(distinct);
        const projection = new Projection(this._id, this._targetType, keyStrategy, reducers, this._model);

        eventHandlers.createEventHandler(this._id!, b => {
            const builder = b.partitioned();
            if (this._fromScope) {
                b.inScope(this._fromScope);
            }
            for (const eventType of events) {
                builder.handle(eventType, projection.handle.bind(projection));
            }
        });
        */
