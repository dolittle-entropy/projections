// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IChildOperation } from './IChildOperation';
import { IOperationContext } from './IOperationContext';
import { PropertyAccessor } from '../Properties';
import { IKeyStrategy } from '../Keys';

export class PropertyMapper implements IChildOperation {
    constructor(readonly sourceProperty: PropertyAccessor, readonly targetProperty: PropertyAccessor, readonly keyStrategy: IKeyStrategy, readonly children: IChildOperation[]) {
    }

    async perform(context: IOperationContext): Promise<any> {
        const changes = {};
        const value = this.sourceProperty.get(context);
        this.targetProperty.set(changes, value);
        return changes;
    }
}
