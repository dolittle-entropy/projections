// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ClientBuilder } from '@dolittle/sdk';
import { Constructor } from '@dolittle/types';
import { IEventTypes } from '@dolittle/sdk.artifacts';
import { ScopeId } from '@dolittle/sdk.events';

import { FromEventBuilder, FromEventBuilderCallback } from './Operations/FromEventBuilder';
import { JoinEventBuilder, JoinEventBuilderCallback } from './Operations/JoinEventBuilder';

import { ModelDescriptor } from './ModelDescriptor';
import { ProjectionDescriptor } from './ProjectionDescriptor';

import { IOperationBuilder } from './IOperationBuilder';

import { ProjectionMustHaveAUniqueIdentifier } from './ProjectionMustHaveAUniqueIdentifier';
import { OperationBuilderContext } from './OperationBuilderContext';
import { KeyStrategiesBuilder, KeyStrategiesBuilderCallback } from './KeyStrategiesBuilder';

export type ProjectionBuilderCallback<TDocument extends object> = (builder: ProjectionBuilder<TDocument>) => void;

/**
 * Represents the builder of a projection for a specific type.
 */
export class ProjectionBuilder<TDocument extends object> {
    private _id?: Guid;
    private _fromScope: ScopeId = ScopeId.default;
    private _model: ModelDescriptor;
    private _operationBuilders: IOperationBuilder[] = [];
    private _keyStrategiesBuilder: KeyStrategiesBuilder;

    /**
     * Initializes a new instance of {@link ProjectionBuilder{TDocument}}
     * @param {Constructor{TDocument}} _targetType Type of document to build.
     * @param {ClientBuilder} _clientBuilder The Dolittle SDK {@link ClientBuilder}
     */
    constructor(private readonly _targetType: Constructor<TDocument>, private readonly _clientBuilder: ClientBuilder) {
        this._model = new ModelDescriptor(_targetType.name);
        this._keyStrategiesBuilder = new KeyStrategiesBuilder();
    }

    /**
     * Identifies the projections stream.
     * @param id Unique identifier that identifies the projection stream.
     * @returns {ProjectionBuilder{TDocument}} Continuation for building.
     */
    withId(id: Guid | string): ProjectionBuilder<TDocument> {
        this._id = Guid.as(id);

        return this;
    }

    withKeys(callback: KeyStrategiesBuilderCallback): ProjectionBuilder<TDocument> {
        callback(this._keyStrategiesBuilder);
        return this;
    }

    inScope(id: ScopeId | Guid | string): ProjectionBuilder<TDocument> {
        this._fromScope = ScopeId.from(id);
        return this;
    }

    useModelName(name: string): ProjectionBuilder<TDocument> {
        this._model = new ModelDescriptor(name);
        return this;
    }

    from<TEvent extends object>(eventType: Constructor<TEvent>, callback: FromEventBuilderCallback<TDocument, TEvent>): ProjectionBuilder<TDocument> {
        const builder = new FromEventBuilder<TDocument, TEvent>(eventType);
        callback(builder);
        this._operationBuilders.push(builder);
        return this;
    }

    join<TEvent extends object>(eventType: Constructor<TEvent>, callback: JoinEventBuilderCallback<TDocument, TEvent>): ProjectionBuilder<TDocument> {
        const builder = new JoinEventBuilder<TDocument, TEvent>(eventType);
        callback(builder);
        this._operationBuilders.push(builder);
        return this;
    }

    build(eventTypes: IEventTypes): ProjectionDescriptor {
        this.throwIfMissingUniqueIdentifier();

        const operationBuilderContext = new OperationBuilderContext(eventTypes);

        const operations = this._operationBuilders.map(_ => _.build(operationBuilderContext));
        const projection = new ProjectionDescriptor(
                                this._id!,
                                this._model,
                                this._keyStrategiesBuilder.build(),
                                operations,
                                this._fromScope);

        return projection;
    }

    private throwIfMissingUniqueIdentifier() {
        if (!this._id) {
            throw new ProjectionMustHaveAUniqueIdentifier();
        }
    }
}
