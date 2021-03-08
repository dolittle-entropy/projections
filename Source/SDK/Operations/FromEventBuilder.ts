// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { SetBuilder } from './SetBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { PropertyUtilities } from '../../PropertyUtilities';
import { KeyStrategyDescriptor } from '../KeyStrategyDescriptor';
import OperationTypes from '../../OperationTypes';
import { Expression } from '../Expressions';
import { AddBuilder } from './AddBuilder';
import { SubtractBuilder } from './SubtractBuilder';
import { EventContext } from '@dolittle/sdk.events';
import { MultiplyBuilder } from './MultiplyBuilder';
import { DivideBuilder } from './DivideBuilder';

export type FromEventBuilderCallback<TDocument extends object, TEvent extends object> = (builder: FromEventBuilder<TDocument, TEvent>) => void;

export type FromEventConfiguration = {
    filter: Expression;
    keyStrategy: KeyStrategyDescriptor;
};

/**
 * Represents the builder for building From event operation.
 */
export class FromEventBuilder<TDocument extends object, TEvent extends object> implements IOperationBuilder {
    private readonly _builders: IOperationBuilder[] = [];
    private _keyStrategy: KeyStrategyDescriptor = KeyStrategyDescriptor.fromEventSourceId();

    constructor(private readonly _eventType: Constructor<TEvent>) { }

    usingConstantKey(key: string): FromEventBuilder<TDocument, TEvent> {
        this._keyStrategy = KeyStrategyDescriptor.fromConstant(key);
        return this;
    }

    usingCompositeKeyFromContext(...properties: PropertyAccessor<EventContext>[]): FromEventBuilder<TDocument, TEvent> {
        return this.usingCompositeKeyFrom<EventContext>('eventContext', ...properties);
    }

    usingCompositeKey(...properties: PropertyAccessor<TEvent>[]): FromEventBuilder<TDocument, TEvent> {
        return this.usingCompositeKeyFrom<TEvent>('event', ...properties);
    }

    usingCompositeKeyFrom<T extends object>(propertyPrefix: string, ...properties: PropertyAccessor<T>[]): FromEventBuilder<TDocument, TEvent> {
        const propertyPaths = properties.map(_ => {
            const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor<T>(_);
            return `${propertyPrefix}.${propertyDescriptor.path}`;
        });

        this._keyStrategy = KeyStrategyDescriptor.fromProperties(...propertyPaths);
        return this;
    }


    usingKeyFrom(property: PropertyAccessor<TEvent>): FromEventBuilder<TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._keyStrategy = KeyStrategyDescriptor.fromProperty(`event.${propertyDescriptor.path}`);
        return this;
    }

    set(targetProperty: PropertyAccessor<TDocument>): SetBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SetBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    add(targetProperty: PropertyAccessor<TDocument>): AddBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new AddBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    subtract(targetProperty: PropertyAccessor<TDocument>): SubtractBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SubtractBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    multiply(targetProperty: PropertyAccessor<TDocument>): MultiplyBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new MultiplyBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    divide(targetProperty: PropertyAccessor<TDocument>): DivideBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new DivideBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    count(targetProperty: PropertyAccessor<TDocument>): FromEventBuilder<TDocument, TEvent> {
        this.add(targetProperty).withValue(1);
        return this;
    }


    build(buildContext: OperationBuilderContext): OperationDescriptor {
        const children = this._builders.map(_ => _.build(buildContext));
        const eventTypeId = buildContext.eventTypes.getFor(this._eventType).id;
        const configuration: FromEventConfiguration = {
            filter: Expression.equal(Expression.property('eventType'), Expression.constant(eventTypeId)),
            keyStrategy: this._keyStrategy
        };
        return new OperationDescriptor(OperationTypes.FromEvent,
            Expression.equal(
                Expression.property('eventType'),
                Expression.constant(eventTypeId)),
            configuration, children);
    }
}
