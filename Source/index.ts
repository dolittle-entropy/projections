// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import { IContainer, Container } from '@dolittle/sdk.common';
import { Client, ClientBuilder } from '@dolittle/sdk';
import { ProjectionBuilder, ProjectionBuilderCallback } from './SDK/ProjectionBuilder';
import { ProjectionService } from './Service/ProjectionService';
import { ProjectionDescriptor } from './SDK/ProjectionDescriptor';
import { ProjectionsConfigurationBuilder, ProjectionsConfigurationBuilderCallback } from './ProjectionsConfigurationBuilder';
import { ProjectionsManager } from './Service/MongoDB/ProjectionsManager';

let _host = 'localhost';
let _port = 50053;
let _container: IContainer = new Container();

const configurationBuilder = new ProjectionsConfigurationBuilder();

declare module '@dolittle/sdk' {
    interface ClientBuilder {

        /**
         * Configure the behavior of projections, system wide.
         * @param {ProjectionsConfigurationBuilderCallback} callback Callback for building the projections configuration.
         */
        withProjections(callback: ProjectionsConfigurationBuilderCallback): ClientBuilder;

        /**
         * Build a projection from events to a document of a type.
         * @param {Constructor} targetType Type of document to project to.
         * @param {ProjectionBuilderCallback} callback Callback for building the projection.
         */
        withProjectionFor<TDocument extends object>(targetType: Constructor<TDocument>, callback: ProjectionBuilderCallback<TDocument>): ClientBuilder;
    }

    interface Client {
        projections: ProjectionDescriptor[];
    }
}

const _projections: ProjectionBuilder<any>[] = [];


ClientBuilder.prototype.withProjections = function (callback: ProjectionsConfigurationBuilderCallback) {
    callback(configurationBuilder);
    return this;
};


ClientBuilder.prototype.withProjectionFor = function <TDocument extends object>(targetType: Constructor<TDocument>, callback: ProjectionBuilderCallback<TDocument>) {
    const projectionBuilder = new ProjectionBuilder<TDocument>(targetType, this);
    callback(projectionBuilder);
    _projections.push(projectionBuilder);
    return this;
};

const originalWithRuntimeOn = ClientBuilder.prototype.withRuntimeOn;
ClientBuilder.prototype.withRuntimeOn = function (host: string, port: number): ClientBuilder {
    originalWithRuntimeOn.call(this, host, port);
    _host = host;
    _port = port;
    return this;
};

const originalWithContainer = ClientBuilder.prototype.withContainer;
ClientBuilder.prototype.withContainer = function (container: IContainer): ClientBuilder {
    originalWithContainer.call(this, container);
    _container = container;
    return this;
};

const originalBuild = ClientBuilder.prototype.build;
ClientBuilder.prototype.build = function (): Client {
    const client = originalBuild.call(this);

    const connectionString = `${_host}:${_port}`;
    client.projections = [];

    const configuration = configurationBuilder.build();
    const projectionsManager = new ProjectionsManager(configuration);

    for (const projectionBuilder of _projections) {
        const projectionDescriptor = projectionBuilder.build(client.eventTypes);
        client.projections.push(projectionDescriptor);
        ProjectionService.register(client, projectionsManager, _container, connectionString, projectionDescriptor);
    }

    return client;
};
