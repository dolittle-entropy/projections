// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId } from '@dolittle/sdk.events';
import { IOperationDataContext } from './IOperationDataContext';

export class OperationDataContext implements IOperationDataContext {
    constructor(
        readonly model: any,
        readonly eventType: EventTypeId,
        readonly event: any,
        readonly eventContext: EventContext) {
    }
}
