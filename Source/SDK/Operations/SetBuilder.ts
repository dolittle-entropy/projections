// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { EventContext } from '@dolittle/sdk.events';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { PropertyUtilities } from '../../PropertyUtilities';
import { MissingOperationForSettingProperty } from './MissingOperationForSettingProperty';
import { Expression } from '../Expressions';
import OperationTypes from '../../OperationTypes';
import { OperationDescriptor } from '../OperationDescriptor';
import { IOperationBuilder } from '../IOperationBuilder';

export class SetBuilder<TParent, TDocument, TEvent extends object> implements IOperationBuilder {

    private _operationDescriptor?: OperationDescriptor;

    constructor(private readonly _targetPropertyPath: string, private readonly _parent: TParent) {
    }

    to(sourceProperty: PropertyAccessor<TEvent>): TParent {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);
        const expression = Expression.assign(
            Expression.property(`model.${this._targetPropertyPath}`),
            Expression.property(`event.${propertyDescriptor.path}`)
        );
        this._operationDescriptor = new OperationDescriptor(OperationTypes.Expression, Expression.noOp(), expression);
        return this._parent;
    }

    toValue(value: any): TParent {
        const expression = Expression.assign(
            Expression.property(`model.${this._targetPropertyPath}`),
            Expression.constant(value)
        );
        this._operationDescriptor = new OperationDescriptor(OperationTypes.Expression, Expression.noOp(), expression);
        return this._parent;
    }

    toContext(sourceProperty: PropertyAccessor<EventContext>): TParent {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);
        const expression = Expression.assign(
            Expression.property(`model.${this._targetPropertyPath}`),
            Expression.property(`eventContext.${propertyDescriptor.path}`)
        );
        this._operationDescriptor = new OperationDescriptor(OperationTypes.Expression, Expression.noOp(), expression);
        return this._parent;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        this.throwIfMissingOperation();
        return this._operationDescriptor!;
    }

    private throwIfMissingOperation() {
        if (!this._operationDescriptor) {
            throw new MissingOperationForSettingProperty(this._targetPropertyPath);
        }
    }
}
