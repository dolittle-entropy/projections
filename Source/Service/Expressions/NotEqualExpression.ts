// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expression';
import { BinaryExpression } from './BinaryExpression';
import { IOperationDataContext } from '../Operations';
export class NotEqualExpression extends BinaryExpression {
    constructor(left: Expression, right: Expression) {
        super(left, right);
    }

    invoke(context: IOperationDataContext) {
        const leftValue = this.left.invoke(context);
        const rightValue = this.right.invoke(context);
        if (leftValue.equals) {
            return !leftValue.equals(rightValue);
        }

        return leftValue !== rightValue;
    }

    readonly operationString: string = '!=';
}
