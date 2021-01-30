// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { Expression } from './Expression';

export class ConstantExpression extends Expression {
    constructor(readonly value: any) {
        super(ExpressionTypes.Constant);
    }

    invoke() {
        throw new Error('Method not implemented.');
    }
}
