// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Expression } from '../Expressions';


export class MissingPropertyExpression extends Error {
    constructor(expression: Expression) {
        super(`Missing property expression in '${expression}'`);
    }
}
