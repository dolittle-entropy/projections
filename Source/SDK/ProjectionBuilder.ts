// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ClientBuilder } from '@dolittle/sdk';
import { Constructor } from '@dolittle/types';
import { IEventTypes } from '@dolittle/sdk.artifacts';
import { ScopeId } from '@dolittle/sdk.events';

import { ModelDescriptor } from './ModelDescriptor';
import { ProjectionDescriptor } from './ProjectionDescriptor';

import { ProjectionMustHaveAUniqueIdentifier } from './ProjectionMustHaveAUniqueIdentifier';
import { OperationBuilderContext } from './OperationBuilderContext';
import { KeyStrategiesBuilder, KeyStrategiesBuilderCallback } from './KeyStrategiesBuilder';
import { ProjectionOperationBuilder } from './ProjectionOperationBuilder';

export type ProjectionBuilderCallback<TDocument extends object> = (builder: ProjectionBuilder<TDocument>) => void;

/**
 * Represents the builder of a projection for a specific type.
 */
export class ProjectionBuilder<TDocument extends object> extends ProjectionOperationBuilder<TDocument, ProjectionBuilder<TDocument>> {
    private _id?: Guid;
    private _inScope: ScopeId = ScopeId.default;
    private _model: ModelDescriptor;

    private _keyStrategiesBuilder: KeyStrategiesBuilder;

    /**
     * Initializes a new instance of {@link ProjectionBuilder{TDocument}}
     * @param {Constructor{TDocument}} _targetType Type of document to build.
     * @param {ClientBuilder} _clientBuilder The Dolittle SDK {@link ClientBuilder}
     */
    constructor(targetType: Constructor<TDocument>, private readonly _clientBuilder: ClientBuilder) {
        super(targetType);
        this._model = new ModelDescriptor(targetType.name);
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

    /**
     * Build strategy for how to deal with keys. This can be used as a fallback mechanism or the default mechanism.
     * Unless a specific key strategy is specified within an operation, it will use this.
     * It will try the strategies in sequence and use the first that succeeds.
     * @param {KeyStrategiesBuilderCallback} callback Callback for building key strategies
     * @returns {ProjectionBuilder{TDocument}} Continuation for building.
     */
    withKeys(callback: KeyStrategiesBuilderCallback): ProjectionBuilder<TDocument> {
        callback(this._keyStrategiesBuilder);
        return this;
    }

    /**
     * The projection should be run in a specific scope.
     * @param {ScopeId | Guid | string} id Unique identifier of the scope.
     */
    inScope(id: ScopeId | Guid | string): ProjectionBuilder<TDocument> {
        this._inScope = ScopeId.from(id);
        return this;
    }

    /**
     * Use specific model name. This is typically used as the table / collection name in the persisted state.
     * @param {string} name Name of the model
     */
    useModelName(name: string): ProjectionBuilder<TDocument> {
        this._model = new ModelDescriptor(name);
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
            this._inScope);

        return projection;
    }

    private throwIfMissingUniqueIdentifier() {
        if (!this._id) {
            throw new ProjectionMustHaveAUniqueIdentifier();
        }
    }
}
