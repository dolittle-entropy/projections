// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { EventContext } from '@dolittle/sdk.events';
import { ChildOperationDescriptor } from '../ChildOperationDescriptor';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { PropertyUtilities } from '../../PropertyUtilities';
import ChildOperationTypes from '../..//ChildOperationTypes';
import { MissingOperationForSettingProperty } from './MissingOperationForSettingProperty';

export type PropertyMapConfiguration = {
    sourceProperty: string;
    targetProperty: string;
};

export class SetBuilder<TParent, TDocument, TEvent extends object> implements IChildOperationBuilder {

    private _operationDescriptor?: ChildOperationDescriptor;

    constructor(private readonly _targetPropertyPath: string, private readonly _parent: TParent) {
    }

    to(sourceProperty: PropertyAccessor<TEvent>): TParent {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);

        const config: PropertyMapConfiguration = {
            sourceProperty: propertyDescriptor.path,
            targetProperty: this._targetPropertyPath
        };
        this._operationDescriptor = new ChildOperationDescriptor(ChildOperationTypes.PropertyMap, config);

        return this._parent;
    }

    toContext(sourceProperty: PropertyAccessor<EventContext>): TParent {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);

        const config: PropertyMapConfiguration = {
            sourceProperty: propertyDescriptor.path,
            targetProperty: this._targetPropertyPath
        };
        this._operationDescriptor = new ChildOperationDescriptor(ChildOperationTypes.PropertyMapFromContext, config);

        return this._parent;
    }

    build(buildContext: OperationBuilderContext): ChildOperationDescriptor {
        this.throwIfMissingOperation();
        return this._operationDescriptor!;
    }

    private throwIfMissingOperation() {
        if (!this._operationDescriptor) {
            throw new MissingOperationForSettingProperty(this._targetPropertyPath);
        }
    }
}
