// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IChildOperation } from '../IChildOperation';
import { IOperationContext } from '../IOperationContext';
import { PropertyAccessor } from '../PropertyAccessor';

export class PropertyMapper implements IChildOperation {
    constructor(private readonly _sourceProperty: PropertyAccessor, private readonly _targetProperty: PropertyAccessor, readonly children: IChildOperation[]) {
    }

    async perform(context: IOperationContext): Promise<any> {
        const changes = {};
        const value = this._sourceProperty.get(context);
        this._targetProperty.set(changes, value);
        return changes;
    }
}
