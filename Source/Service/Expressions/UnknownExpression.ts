// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as Sdk from '../../SDK/Expressions';

export class UnknownExpression extends Error {
    constructor(expression: Sdk.Expression) {
        super(`Unknown expression '${expression}'`);
    }
}
