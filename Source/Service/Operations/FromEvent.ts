// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from '../Expressions';
import { IKeyStrategy } from '../Keys';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';


export class FromEvent implements IOperation {
    constructor(readonly filter: Expression, readonly keyStrategy: IKeyStrategy, readonly children: IOperation[]) {
    }

    perform(context: IOperationContext) {
        return context.dataContext.model;
    }
}
