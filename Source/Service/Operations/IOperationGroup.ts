// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId } from '@dolittle/sdk.events';
import { IState } from '../IState';
import { IOperation } from './IOperation';

export interface IOperationGroup {
    name: string;
    children: IOperationGroup[];
    operations: IOperation[];
    state: IState;

    handle(eventType: EventTypeId, event: any, context: EventContext, parentGroup?: IOperationGroup): Promise<void>;
}
