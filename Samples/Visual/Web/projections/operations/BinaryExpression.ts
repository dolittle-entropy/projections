// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expression';

export class BinaryExpression extends Expression {
    left!: Expression;
    right!: Expression;
}
