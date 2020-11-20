// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';

export interface IKeyStrategy {
    has(event: any, eventContext: EventContext): boolean;
    get(event: any, eventContext: EventContext): any;
}
