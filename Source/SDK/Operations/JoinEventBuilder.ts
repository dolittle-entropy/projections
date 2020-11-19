// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { SetBuilder } from './SetBuilder';
import OperationTypes from '../../OperationTypes';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { IChildOperationBuilder } from '../IChildOperationBuilder';

export type JoinEventBuilderCallback<TDocument, TEvent> = (builder: JoinEventBuilder<TDocument, TEvent>) => void;

export class JoinEventBuilder<TDocument, TEvent> implements IOperationBuilder {
    private readonly _builders: IChildOperationBuilder[] = [];

    on(property: PropertyAccessor<TDocument>): JoinEventBuilder<TDocument, TEvent> {
        return this;
    }

    set(property: PropertyAccessor<TDocument>): SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent> {
        const builder = new SetBuilder<JoinEventBuilder<TDocument, TEvent>, TDocument, TEvent>(this);
        this._builders.push(builder);
        return builder;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        const children = this._builders.map(_ => _.build(buildContext));
        return new OperationDescriptor(OperationTypes.FromEvent, [], children);
    }
}

