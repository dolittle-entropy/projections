// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationContext } from './IOperationContext';
import { IKeyStrategy } from '../Keys';
import { AssignExpression, Expression, PropertyExpression } from '../Expressions';
import { IOperation } from './IOperation';
import { MissingPropertyExpression } from './MissingPropertyExpression';
import { Changeset } from '../Changes';

export class ExpressionOperation implements IOperation {
    readonly filter: Expression = Expression.noOp();

    constructor(readonly expression: Expression, readonly keyStrategy: IKeyStrategy, readonly children: IOperation[]) {
    }

    async perform(context: IOperationContext): Promise<any> {
        const initial = {...context.dataContext.model};
        this.expression.invoke(context.dataContext);
        const changes =  new Changeset(context.comparer.compare(initial, context.dataContext.model), context.dataContext.eventContext);
        return changes;
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
