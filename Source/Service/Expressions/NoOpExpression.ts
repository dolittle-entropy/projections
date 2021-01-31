// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from '../Operations';
import { Expression } from './Expression';

export class NoOpExpression extends Expression {
    invoke(context: IOperationDataContext) {
        return true;
    }

    toString(): string {
        return '';
    }
}