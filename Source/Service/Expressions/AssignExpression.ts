// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { Expression } from './Expression';
import { BinaryExpression } from './BinaryExpression';
import { PropertyExpression } from './PropertyExpression';
import { IOperationContext } from '../Operations';

export class AssignExpression extends BinaryExpression {
    constructor(left: PropertyExpression, right: Expression) {
        super(ExpressionTypes.Assign, left, right);
    }

    invoke(context: IOperationContext) {
        const value = this.right.invoke(context);
        (this.left as PropertyExpression).propertyAccessor.set(context, value);
    }

    readonly operationString: string = '=';
}
