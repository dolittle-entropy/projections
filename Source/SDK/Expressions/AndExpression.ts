// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { Expression } from './Expression';
import { BinaryExpression } from './BinaryExpression';

export class AndExpression extends BinaryExpression {
    constructor(left: Expression, right: Expression) {
        super(ExpressionTypes.And, left, right);
    }

    readonly operationString: string = '&&';
}


