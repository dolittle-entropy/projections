// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { IKeyStrategy } from './IKeyStrategy';

export class EventSourceKeyStrategy implements IKeyStrategy {
    has(event: any, eventContext: EventContext): boolean {
        return true;
    }

    get(event: any, eventContext: EventContext): any {
        return eventContext.eventSourceId.value;
    }
}
