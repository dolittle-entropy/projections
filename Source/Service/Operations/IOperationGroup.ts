// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';

export interface IOperationGroup {
    children: IOperationGroup[];
    operations: IOperation[];

    handle(eventType: EventTypeId, event: any, context: EventContext): Promise<void>;
}
