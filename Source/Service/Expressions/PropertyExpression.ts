// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor, PropertyPath } from '../Properties';
import { Expression } from './Expression';
import { IOperationDataContext } from '../Operations';

export class PropertyExpression extends Expression {
    constructor(readonly propertyAccessor: PropertyAccessor) {
        super();
    }

    invoke(context: IOperationDataContext) {
        return this.propertyAccessor.get(context);
    }

    toString() {
        return this.propertyAccessor.path.path;
    }
}
