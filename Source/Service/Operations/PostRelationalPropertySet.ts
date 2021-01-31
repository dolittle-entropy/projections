// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Changeset } from '../Changes';
import { Expression } from '../Expressions';
import { IState } from '../IState';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor } from '../Properties';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';

export class PostRelationalPropertySet implements IOperation {
    readonly filter: Expression = Expression.noOp();

    constructor(readonly keyStrategy: IKeyStrategy, readonly targetProperty: PropertyAccessor, private readonly _intermediateState: IState, readonly children: IOperation[]) {
    }

    async perform(context: IOperationContext) {
        const id = this.targetProperty.get(context.dataContext.model);

        const state = await this._intermediateState.get(id);
        if (state) {
            return new Changeset(context.comparer.compare({}, state));
        }
        return Changeset.noChanges;
    }
}
