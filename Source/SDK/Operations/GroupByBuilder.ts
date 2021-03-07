// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationBuilder } from '../IOperationBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { OperationDescriptor } from '../OperationDescriptor';
import { PropertyAccessor, Constructor } from '@dolittle/types';
import { FromEventBuilder, FromEventBuilderCallback } from './FromEventBuilder';
import OperationTypes from '../../OperationTypes';
import { Expression } from '../Expressions';
import { PropertyUtilities } from '../../PropertyUtilities';

export type GroupByBuilderCallback<TDocument extends object> = (builder: GroupByBuilder<TDocument>) => void;

export type GroupByConfiguration = {
    property: string;
};

export class GroupByBuilder<TDocument extends object> implements IOperationBuilder {
    protected _builders: IOperationBuilder[] = [];
    private _property: string;

    constructor(readonly targetProperty: PropertyAccessor<TDocument>) {
        const property = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        this._property = `model.${property.path}`;
    }

    from<TEvent extends object>(eventType: Constructor<TEvent>, callback: FromEventBuilderCallback<TDocument, TEvent>): GroupByBuilderCallback<TDocument> {
        const builder = new FromEventBuilder<TDocument, TEvent>(eventType);
        callback(builder);
        this._builders.push(builder);
        return this as unknown as GroupByBuilderCallback<TDocument>;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        const children = this._builders.map(_ => _.build(buildContext));
        const configuration: GroupByConfiguration = {
            property: this._property
        };
        const descriptor = new OperationDescriptor(
            OperationTypes.GroupBy,
            Expression.noOp(),
            configuration,
            children);
        return descriptor;
    }
}