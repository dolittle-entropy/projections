// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { SetBuilder } from './SetBuilder';
import OperationTypes from '../../OperationTypes';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { PropertyUtilities } from '../PropertyUtilities';

export type JoinEventBuilderCallback<TDocument extends object, TEvent extends object> = (builder: JoinEventBuilder<TDocument, TEvent>) => void;

export class JoinEventBuilder<TDocument extends object, TEvent extends object> implements IOperationBuilder {
    private readonly _builders: IChildOperationBuilder[] = [];

    constructor(private readonly _eventType: Constructor<TEvent>) {}

    on(property: PropertyAccessor<TDocument>): JoinEventBuilder<TDocument, TEvent> {
        return this;
    }

    set(targetProperty: PropertyAccessor<TDocument>): SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const builder = new SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent>(propertyDescriptor.path, this);
        this._builders.push(builder);
        return builder;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        const children = this._builders.map(_ => _.build(buildContext));
        const eventTypeId = buildContext.eventTypes.getFor(this._eventType).id;
        return new OperationDescriptor(OperationTypes.FromEvent, [eventTypeId], {}, children);
    }
}

