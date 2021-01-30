// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IKeyStrategy } from './IKeyStrategy';
import { IOperationDataContext } from '../Operations';
import { Expression } from '../Expressions';


export class ExpressionKeyStrategy implements IKeyStrategy {

    constructor(private readonly _expression: Expression) {
    }

    has(context: IOperationDataContext): boolean {
        return true;
    }

    get(context: IOperationDataContext): any {
        return this._expression.invoke(context);
    }
}
