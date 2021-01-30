// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from '../../ExpressionTypeId';
import { Expression } from './Expression';

export abstract class BinaryExpression extends Expression {
    constructor(readonly type: ExpressionTypeId, readonly left: Expression, readonly right: Expression) {
        super(type);
    }

    abstract operationString: string;

    invoke() {
        throw new Error('Method not implemented.');
    }

    toString() {
        return `${this.left.toString()} ${this.operationString} ${this.right.toString()}`;
    }
}
