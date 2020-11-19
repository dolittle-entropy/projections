// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { EventAndContext } from './EventAndContext';

export interface IOperationContext {
    identifier: Guid;
    model: any;
    eventsWithContext: EventAndContext[];

    getState(key: string): any;
    setState(key: string, state: any);
}

