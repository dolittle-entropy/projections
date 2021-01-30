// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expression';
import { BinaryExpression } from './BinaryExpression';

export class SubtractExpression extends BinaryExpression {
    constructor(left: Expression, right: Expression) {
        super(left, right);
    }

    readonly operationString: string = '-';
}
