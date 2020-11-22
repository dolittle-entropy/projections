// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';
import { IKeyStrategy } from './IKeyStrategy';

export class NullKeyStrategy implements IKeyStrategy {
    has(event: any, eventContext: EventContext): boolean {
        return false;
    }
    get(event: any, eventContext: EventContext) {
        return undefined;
    }
}
