// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { Expression } from './Expression';

export class NoOpExpression extends Expression {
    constructor() {
        super(ExpressionTypes.NoOp);
    }

    toString(): string {
        return '';
    }
}