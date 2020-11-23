// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor } from '../Properties';
import { IChildOperation } from './IChildOperation';
import { IOperationContext } from './IOperationContext';


export class PostRelationalPropertySet implements IChildOperation {
    constructor(readonly keyStrategy: IKeyStrategy, readonly targetProperty: PropertyAccessor, private readonly _intermediateState: IState, readonly children: IChildOperation[]) {
    }

    async perform(context: IOperationContext) {
        const id = this.targetProperty.get(context.model);

        const state = await this._intermediateState.get(id);
        if (state) {
            return state;
        }
        return context.model;
    }
}
