// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expression';
import { BinaryExpression } from './BinaryExpression';
import { PropertyExpression } from './PropertyExpression';
import { IOperationDataContext } from '../Operations';

export class AssignExpression extends BinaryExpression {
    constructor(left: PropertyExpression, right: Expression) {
        super(left, right);
    }

    invoke(context: IOperationDataContext) {
        const value = this.right.invoke(context);
        (this.left as PropertyExpression).propertyAccessor.set(context, value);
        return true;
    }

    readonly operationString: string = '=';
}
