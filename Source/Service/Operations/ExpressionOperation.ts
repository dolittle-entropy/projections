// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IChildOperation } from './IChildOperation';
import { IOperationContext } from './IOperationContext';
import { IKeyStrategy } from '../Keys';
import { Expression } from '../Expressions';
import { OperationDataContext } from './OperationDataContext';

export class ExpressionOperation implements IChildOperation {
    constructor(readonly expression: Expression, readonly keyStrategy: IKeyStrategy, readonly children: IChildOperation[]) {
    }

    async perform(context: IOperationContext): Promise<any> {
        const changes = {};
        const dataContext = new OperationDataContext(changes, context.dataContext.eventContext, context.dataContext.eventContext);
        this.expression.invoke(dataContext);
        return dataContext.model;
    }

}
