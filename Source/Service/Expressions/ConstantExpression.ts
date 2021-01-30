// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ExpressionTypes from '../../ExpressionTypes';
import { IOperationDataContext } from '../Operations';
import { Expression } from './Expression';

export class ConstantExpression extends Expression {
    constructor(readonly value: any) {
        super();
    }

    invoke(context: IOperationDataContext) {
        return this.value;
    }

    toString(): string {
        return `${this.value}`;
    }
}
