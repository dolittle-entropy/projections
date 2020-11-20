// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StreamId } from '@dolittle/sdk.events';
import { EventAndContext } from './EventAndContext';

export interface IOperationContext {
    identifier: StreamId;
    model: any;
    eventsWithContext: EventAndContext[];

    getState(key: string): any;
    setState(key: string, state: any);
}

