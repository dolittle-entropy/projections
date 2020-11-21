// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import {EventContext,  StreamId } from '@dolittle/sdk.events';

export interface IOperationContext {
    stream: StreamId;
    key: any;
    model: any;
    event: any;
    eventContext: EventContext;

    getState(key: string): any;
    setState(key: string, state: any);
}

