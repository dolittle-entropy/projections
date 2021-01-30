// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationContext } from './IOperationContext';
import { IOperationDataContext } from './IOperationDataContext';
import { IOperationGroup } from './IOperationGroup';


export class OperationContext implements IOperationContext {
    constructor(
        readonly key: any,
        readonly dataContext: IOperationDataContext,
        readonly group: IOperationGroup,
        readonly parentGroup?: IOperationGroup) {
    }

    get hasParentGroup(): boolean {
        if (this.parentGroup) {
            return true;
        }
        return false;
    }
}
