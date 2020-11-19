// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventTypeId } from '@dolittle/sdk.events';
import { IChildOperation } from './IChildOperation';
import { IOperationContext } from './IOperationContext';

export interface IOperation {
    eventTypes: EventTypeId[];
    children: IChildOperation[];

    perform(context: IOperationContext): any;
}
