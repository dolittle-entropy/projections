// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { SetBuilder } from './SetBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { PropertyUtilities } from '../../PropertyUtilities';
import { KeyStrategyDescriptor } from '../KeyStrategyDescriptor';
import OperationTypes from '../../OperationTypes';
import KeyStrategyTypes from '../../KeyStrategyTypes';

export type FromEventBuilderCallback<TDocument extends object, TEvent extends object> = (builder: FromEventBuilder<TDocument, TEvent>) => void;

export type FromEventConfiguration = {
    keyStrategy: KeyStrategyDescriptor;
};

/**
 * Represents the builder for building From event operation.
 */
export class FromEventBuilder<TDocument extends object, TEvent extends object> implements IOperationBuilder {
    private readonly _builders: IChildOperationBuilder[] = [];
    private _keyStrategy: KeyStrategyDescriptor = new KeyStrategyDescriptor(KeyStrategyTypes.NotSet);

    constructor(private readonly _eventType: Constructor<TEvent>) { }

    usingKeyFrom(property: PropertyAccessor<TEvent>): FromEventBuilder<TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._keyStrategy = new KeyStrategyDescriptor(KeyStrategyTypes.Property, propertyDescriptor.path);
        return this;
    }

    set(targetProperty: PropertyAccessor<TDocument>): SetBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SetBuilder<FromEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        const children = this._builders.map(_ => _.build(buildContext));
        const eventTypeId = buildContext.eventTypes.getFor(this._eventType).id;
        const configuration: FromEventConfiguration = {
            keyStrategy: this._keyStrategy
        };
        return new OperationDescriptor(OperationTypes.FromEvent, [eventTypeId], configuration, children);
    }
}
