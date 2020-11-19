// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { ChildOperationDescriptor } from '../ChildOperationDescriptor';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { PropertyUtilities } from '../PropertyUtilities';
import ChildOperationTypes from '../..//ChildOperationTypes';

export type PropertyMapData = {
    sourceProperty: string;
    targetProperty: string;
};

export class SetBuilder<TParent, TDocument, TEvent extends object> implements IChildOperationBuilder {
    private _sourceProperty: string = '';

    constructor(private readonly targetPropertyPath: string, private readonly _parent: TParent) {
    }

    to(sourceProperty: PropertyAccessor<TEvent>): TParent {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(sourceProperty);
        this._sourceProperty = propertyDescriptor.path;

        return this._parent;
    }

    build(buildContext: OperationBuilderContext): ChildOperationDescriptor {
        const data: PropertyMapData = {
            sourceProperty: this._sourceProperty,
            targetProperty: this.targetPropertyPath
        };
        return new ChildOperationDescriptor(ChildOperationTypes.PropertyMap, data);
    }
}
