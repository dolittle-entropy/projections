// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from '../Operations';
import { Expression } from './Expression';

export abstract class BinaryExpression extends Expression {
    constructor(readonly left: Expression, readonly right: Expression) {
        super();
    }

    abstract operationString: string;

    abstract invoke(context: IOperationDataContext);

    toString() {
        return `${this.left.toString()} ${this.operationString} ${this.right.toString()}`;
    }
}
