// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { Expression } from './Expression';

export class PropertyExpression extends Expression {
    constructor(readonly path: string) {
        super(ExpressionTypes.Property);
    }

    toString() {
        return this.path;
    }
}
