// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as grpc from '@grpc/grpc-js';
import { Constructor } from '@dolittle/types';
import { IContainer, Container } from '@dolittle/sdk.common';
import { Client, ClientBuilder } from '@dolittle/sdk';
import { ProjectionBuilder, ProjectionBuilderCallback } from './SDK/ProjectionBuilder';
import { MicroserviceId, Environment, ExecutionContext, TenantId, CorrelationId, Claims, Version } from '@dolittle/sdk.execution';
import { IEventHandlers, EventHandlersBuilder } from '@dolittle/sdk.events.handling';
import { EventHandlersClient } from '@dolittle/runtime.contracts/Runtime/Events.Processing/EventHandlers_grpc_pb';
import { Cancellation } from '@dolittle/sdk.resilience';

declare module '@dolittle/sdk' {
    interface ClientBuilder {
        eventHandlersForProjections: IEventHandlers;

        /**
         * Build a projection from events to a document of a type.
         * @param {Constructor} targetType Type of document to project to.
         * @param {ProjectionBuilderCallback} callback Callback for building the projection.
         */
        withProjectionFor<TDocument extends object>(targetType: Constructor<TDocument>, callback: ProjectionBuilderCallback<TDocument>): ClientBuilder;

    }
}

const _projections: ProjectionBuilder<any>[] = [];

ClientBuilder.prototype.withProjectionFor = function <TDocument extends object>(targetType: Constructor<TDocument>, callback: ProjectionBuilderCallback<TDocument>) {
    const projectionBuilder = new ProjectionBuilder<TDocument>(targetType, this);
    callback(projectionBuilder);
    _projections.push(projectionBuilder);
    return this;
};

let _host = 'localhost';
let _port = 50053;
let _container: IContainer = new Container();

const originalWithRuntimeOn = ClientBuilder.prototype.withRuntimeOn;
ClientBuilder.prototype.withRuntimeOn = function (host: string, port: number): ClientBuilder {
    originalWithRuntimeOn(host, port);
    _host = host;
    _port = port;
    return this;
};

const originalWithContainer = ClientBuilder.prototype.withContainer;
ClientBuilder.prototype.withContainer = function (container: IContainer): ClientBuilder {
    originalWithContainer(container);
    _container = container;
    return this;
};

const originalBuild = ClientBuilder.prototype.build;
ClientBuilder.prototype.build = function (): Client {
    const client = originalBuild();

    const connectionString = `${_host}:${_port}`;
    const credentials = grpc.credentials.createInsecure();

    // This is just a workaround since we're not part of the SDK
    const executionContext = new ExecutionContext(
        MicroserviceId.from('7c3d7387-6324-4309-980f-31b9c4b39046'),
        TenantId.system,
        Version.notSet,
        Environment.undetermined,
        CorrelationId.system,
        Claims.empty);

    const eventHandlersBuilder = new EventHandlersBuilder();

    for (const projectionBuilder of _projections) {
        projectionBuilder.build(eventHandlersBuilder);
    }

    this.eventHandlersForProjections = eventHandlersBuilder.buildAndRegister(
        new EventHandlersClient(connectionString, credentials),
        _container,
        executionContext,
        client.eventTypes,
        client.logger,
        Cancellation.default);

    // Goals:
    // - An  Operation holds a reference to the event type(s) it is for by its EventTypeId.
    //      + Resolved through EventTypes built from the client
    // - Leverage event handlers infrastructure and its mechanism
    //      + EventHandlerBuilder

    return client;
};
