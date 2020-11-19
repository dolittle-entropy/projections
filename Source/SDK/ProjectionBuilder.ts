// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ClientBuilder } from '@dolittle/sdk';
import { ProjectionMustHaveAUniqueIdentifier } from './ProjectionMustHaveAUniqueIdentifier';
import { Constructor } from '@dolittle/types';
import { FromEventBuilderCallback } from './Operations/FromEventBuilder';
import { EventHandlersBuilder } from '@dolittle/sdk.events.handling';
import { KeyStrategyDescriptor } from './KeyStrategyDescriptor';
import { ModelDescriptor } from './ModelDescriptor';
import KeyStrategyTypes from './KeyStrategyTypes';
import { ProjectionDescriptor } from './ProjectionDescriptor';
import { IOperationBuilder } from './IOperationBuilder';
import { JoinEventBuilderCallback } from './Operations/JoinEventBuilder';

export type ProjectionBuilderCallback<TDocument extends object> = (builder: ProjectionBuilder<TDocument>) => void;

/**
 * Represents the builder of a projection for a specific type.
 */
export class ProjectionBuilder<TDocument extends object> {
    private _id?: Guid;
    private _fromScope?: Guid;
    private _model: ModelDescriptor;
    private _keyStrategy: KeyStrategyDescriptor = new KeyStrategyDescriptor(KeyStrategyTypes.EventSourceIdentifier);
    private _operationBuilders: IOperationBuilder[] = [];

    /**
     * Initializes a new instance of {@link ProjectionBuilder{TDocument}}
     * @param {Constructor{TDocument}} _targetType Type of document to build.
     * @param {ClientBuilder} _clientBuilder The Dolittle SDK {@link ClientBuilder}
     */
    constructor(private readonly _targetType: Constructor<TDocument>, private readonly _clientBuilder: ClientBuilder) {
        this._model = new ModelDescriptor(_targetType.name);
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

    usingPropertyAsKey(propertyPath: string): ProjectionBuilder<TDocument> {
        this._keyStrategy = new KeyStrategyDescriptor(KeyStrategyTypes.Property, propertyPath);
        return this;
    }

    inScope(id: Guid | string): ProjectionBuilder<TDocument> {
        this._fromScope = Guid.as(id);
        return this;
    }

    useModelName(name: string): ProjectionBuilder<TDocument> {
        this._model = new ModelDescriptor(name);
        return this;
    }

    from<TEvent extends object>(eventType: Constructor<TEvent>, callback: FromEventBuilderCallback<TDocument, TEvent>): ProjectionBuilder<TDocument> {
        return this;
    }

    join<TEvent extends object>(eventType: Constructor<TEvent>, callback: JoinEventBuilderCallback<TDocument, TEvent>): ProjectionBuilder<TDocument> {
        return this;
    }

    build(eventHandlers: EventHandlersBuilder): ProjectionDescriptor {
        if (!this._id) {
            throw new ProjectionMustHaveAUniqueIdentifier();
        }

        const operations = this._operationBuilders.map(_ => _.build());
        const projection = new ProjectionDescriptor(this._id, this._model, this._keyStrategy, operations);

        return projection;
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
