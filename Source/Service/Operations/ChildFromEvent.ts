// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Changeset } from '../Changes';
import { Expression } from '../Expressions';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor } from '../Properties';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';

export class ChildFromEvent implements IOperation {
    constructor(
        _filter: Expression,
        readonly keyStrategy: IKeyStrategy,
        readonly identifiedByProperty: PropertyAccessor,
        readonly storedInProperty: PropertyAccessor,
        readonly children: IOperation[]) {
        this.filter = _filter;
    }

    filter: Expression;


    async perform(context: IOperationContext) {
        return Changeset.noChanges(context.dataContext.eventContext);
    }
}
