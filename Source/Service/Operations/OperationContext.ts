// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { IOperationContext } from './IOperationContext';
import { IOperationGroup } from './IOperationGroup';

export class OperationContext implements IOperationContext {
    constructor(
        readonly key: any,
        readonly model: any,
        readonly event: any,
        readonly eventContext: EventContext,
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
