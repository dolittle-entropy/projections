// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventTypeId } from '@dolittle/sdk.events';
import { IChildOperation } from '../IChildOperation';
import { IOperation } from '../IOperation';
import { IOperationContext } from '../IOperationContext';


export class FromEvent implements IOperation {
    constructor(readonly eventTypes: EventTypeId[], readonly children: IChildOperation[]) {
    }

    perform(context: IOperationContext) {
    }
}
