// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from '../../ExpressionTypeId';
import { IOperationContext } from '../Operations';

export abstract class Expression {
    constructor(readonly type: ExpressionTypeId) {
    }

    abstract invoke(context: IOperationContext): any;
    abstract toString(): string;
}



