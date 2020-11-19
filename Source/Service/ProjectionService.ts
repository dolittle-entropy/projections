// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as grpc from '@grpc/grpc-js';
import { Projection } from './Projection';
import { ProjectionDescriptor } from '../SDK/ProjectionDescriptor';
import { EventHandlersClient } from '@dolittle/runtime.contracts/Runtime/Events.Processing/EventHandlers_grpc_pb';
import { Client } from '@dolittle/sdk';
import { IContainer } from '@dolittle/sdk.common';
import { ScopeId } from '@dolittle/sdk.events';
import { EventHandlersBuilder } from '@dolittle/sdk.events.handling';
import { Cancellation } from '@dolittle/sdk.resilience';
import { MicroserviceId, Environment, ExecutionContext, TenantId, CorrelationId, Claims, Version } from '@dolittle/sdk.execution';
import { EventSourceKeyStrategy } from './Keys/EventSourceKeyStrategy';
import { PropertyKeyStrategy } from './Keys/PropertyKeyStrategy';
import { UnknownKeyStrategy } from './UnknownKeyStrategy';
import { FromEvent } from './Operations/FromEvent';

import { OperationDescriptor } from '../SDK/OperationDescriptor';
import { ChildOperationDescriptor } from '../SDK/ChildOperationDescriptor';
import { JoinEvent } from './Operations/JoinEvent';
import { UnknownOperation } from './UnknownOperation';
import { UnknownChildOperation } from './UnknownChildOperation';
import { PropertyMapper } from './Operations/PropertyMapper';
import { IChildOperation } from './IChildOperation';

import KeyStrategyTypes from '../KeyStrategyTypes';
import OperationTypes from '../OperationTypes';
import ChildOperationTypes from '../ChildOperationTypes';

export class ProjectionService {
    static register(client: Client, container: IContainer, connectionString: string, descriptor: ProjectionDescriptor): Projection {
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
        const eventTypes = descriptor.operations.flatMap(_ => _.eventTypes); //.filter(distinct);

        console.log(eventTypes);

        const projection = new Projection(
            descriptor.stream,
            this.getKeyStrategyFor(descriptor),
            descriptor.operations.map(_ => ProjectionService.buildOperationFrom(_))
        );

        eventHandlers.createEventHandler(descriptor.stream, b => {
            const builder = b.partitioned();

            if (descriptor.scope !== ScopeId.default) {
                b.inScope(descriptor.scope);
            }

            for (const eventType of eventTypes) {
                builder.handle(eventType, projection.handle.bind(projection));
            }
        });

        const eventHandlersForProjections = eventHandlers.buildAndRegister(
            new EventHandlersClient(connectionString, credentials),
            container,
            executionContext,
            client.eventTypes,
            client.logger,
            Cancellation.default);

        return projection;
    }


    private static getKeyStrategyFor(descriptor: ProjectionDescriptor) {
        switch (descriptor.keyStrategy.id) {
            case KeyStrategyTypes.EventSourceIdentifier: {
                return new EventSourceKeyStrategy();
            };
            case KeyStrategyTypes.Property: {
                return new PropertyKeyStrategy(descriptor.keyStrategy.configuration);
            }
        }

        throw new UnknownKeyStrategy(descriptor.keyStrategy.id);
    }

    private static buildOperationFrom(descriptor: OperationDescriptor) {
        switch (descriptor.id) {
            case OperationTypes.FromEvent: {
                return new FromEvent(descriptor.eventTypes, ProjectionService.buildChildOperations(descriptor.children));
            };
            case OperationTypes.JoinEvent: {
                return new JoinEvent(descriptor.eventTypes, ProjectionService.buildChildOperations(descriptor.children));
            };
        }

        throw new UnknownOperation(descriptor.id);
    }


    private static buildChildOperations(children: ChildOperationDescriptor[]): IChildOperation[] {
        return children.map(_ => {
            switch (_.id) {
                case ChildOperationTypes.PropertyMap: {
                    return new PropertyMapper(ProjectionService.buildChildOperations(_.children));
                };
            }

            throw new UnknownChildOperation(_.id);
        });
    }
}