// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { SetBuilder } from './SetBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { PropertyUtilities } from '../../PropertyUtilities';
import { MissingOnDefinitionForJoin } from './MissingOnDefinitionForJoin';
import { KeyStrategyDescriptor } from '../KeyStrategyDescriptor';
import OperationTypes from '../../OperationTypes';
import KeyStrategyTypes from '../../KeyStrategyTypes';

export type JoinEventBuilderCallback<TDocument extends object, TEvent extends object> = (builder: JoinEventBuilder<TDocument, TEvent>) => void;

export type JoinEventConfiguration = {
    onProperty: string;
    keyStrategy: KeyStrategyDescriptor;
};

export class JoinEventBuilder<TDocument extends object, TEvent extends object> implements IOperationBuilder {
    private readonly _builders: IChildOperationBuilder[] = [];
    private _onProperty?: string;
    private _keyStrategy: KeyStrategyDescriptor = new KeyStrategyDescriptor(KeyStrategyTypes.EventSourceIdentifier);

    constructor(private readonly _eventType: Constructor<TEvent>) { }

    on(property: PropertyAccessor<TDocument>): JoinEventBuilder<TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._onProperty = propertyDescriptor.path;
        return this;
    }

    usingKeyFrom(property: PropertyAccessor<TEvent>): JoinEventBuilder<TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._keyStrategy = new KeyStrategyDescriptor(KeyStrategyTypes.Property, propertyDescriptor.path);
        return this;
    }

    set(targetProperty: PropertyAccessor<TDocument>): SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        if (!this._onProperty) {
            throw new MissingOnDefinitionForJoin();
        }

        const children = this._builders.map(_ => _.build(buildContext));
        const eventTypeId = buildContext.eventTypes.getFor(this._eventType).id;
        const configuration: JoinEventConfiguration = {
            onProperty: this._onProperty,
            keyStrategy: this._keyStrategy
        };
        return new OperationDescriptor(OperationTypes.JoinEvent, [eventTypeId], configuration, children);
    }
}
