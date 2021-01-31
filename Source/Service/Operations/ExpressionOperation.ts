// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationContext } from './IOperationContext';
import { IKeyStrategy } from '../Keys';
import { AssignExpression, Expression, PropertyExpression } from '../Expressions';
import { OperationDataContext } from './OperationDataContext';
import { IOperation } from './IOperation';
import { MissingPropertyExpression } from './MissingPropertyExpression';
export class ExpressionOperation implements IOperation {
    readonly filter: Expression = Expression.noOp();

    constructor(readonly expression: Expression, readonly keyStrategy: IKeyStrategy, readonly children: IOperation[]) {
    }

    async perform(context: IOperationContext): Promise<any> {
        const changes = {};
        const dataContext = new OperationDataContext(changes, context.dataContext.eventType, context.dataContext.event, context.dataContext.eventContext);
        this.expression.invoke(dataContext);
        return dataContext.model;
    }

    hasAssignmentToProperty(): boolean {
        if (this.expression instanceof AssignExpression) {
            return (this.expression as AssignExpression).left instanceof PropertyExpression;
        }
        return false;
    }

    getAssignmentProperty(): PropertyExpression {
        if (this.expression instanceof AssignExpression) {
            return (this.expression as AssignExpression).left as PropertyExpression;
        }

        throw new MissingPropertyExpression(this.expression);
    }
}
