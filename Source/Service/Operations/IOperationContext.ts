// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {EventContext } from '@dolittle/sdk.events';

export interface IOperationContext {
    key: any;
    model: any;
    event: any;
    eventContext: EventContext;
}

