// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from '../../ExpressionTypeId';

export abstract class Expression {
    constructor(readonly type: ExpressionTypeId) {
    }

    abstract toString(): string;
}



