// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { IKeyStrategy } from './IKeyStrategy';

export class EventSourceKeyStrategy implements IKeyStrategy {
    get(event: any, eventContext: EventContext): Guid {
        return eventContext.eventSourceId.value;
    }
}
