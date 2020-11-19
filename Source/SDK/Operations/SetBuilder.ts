// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import OperationTypes from '../../OperationTypes';
import { ChildOperationDescriptor } from '../ChildOperationDescriptor';
import { IChildOperationBuilder } from '../IChildOperationBuilder';
import { OperationBuilderContext } from '../OperationBuilderContext';

export class SetBuilder<TParent, TDocument, TEvent> implements IChildOperationBuilder {
    constructor(private readonly _parent: TParent) {
    }

    to(property: PropertyAccessor<TEvent>): TParent {

        return this._parent;
    }

    build(buildContext: OperationBuilderContext): ChildOperationDescriptor {
        return new ChildOperationDescriptor(OperationTypes.PropertyMap);
    }
}
