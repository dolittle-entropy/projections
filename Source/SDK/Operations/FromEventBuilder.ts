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

    count(targetProperty: PropertyAccessor<TDocument>): FromEventBuilder<TDocument, TEvent> {
        this.add(targetProperty).withValue(1);
        return this;
    }

    subtract(targetProperty: PropertyAccessor<TDocument>): SubtractBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SubtractBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
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
