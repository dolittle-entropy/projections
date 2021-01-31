// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from '../Expressions';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor } from '../Properties';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';

export class PostJoinEvent implements IOperation {
    constructor(readonly filter: Expression, readonly keyStrategy: IKeyStrategy, readonly onProperty: PropertyAccessor, readonly children: IOperation[]) {
    }

    async perform(context: IOperationContext) {
        if (context.hasParentGroup) {
            const key = this.keyStrategy.get(context.dataContext);
            const valuesToUpdate = { ...context.dataContext.model };
            context.parentGroup?.state.setMany(this.onProperty, key, valuesToUpdate);
        }

        return context.dataContext.model;
    }
}


