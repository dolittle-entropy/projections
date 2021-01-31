// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId } from '@dolittle/sdk.events';

export interface IOperationDataContext {
    readonly model: any;
    readonly eventType: EventTypeId;
    readonly event: any;
    readonly eventContext: EventContext;
}
