// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext } from '@dolittle/sdk.events';

/**
 * Exception that is thrown when key is not possible to resolve
 */
export class UnableToResolveKeyForEvent extends Error {

    /**
     * Initializes a new instance of {@link UnableToResolveKeyForEvent}.
     * @param {*} event Event content.
     * @param {EventContext} context The context of the event.
     */
    constructor(event: any, context: EventContext) {
        super(`Unable to resolve key from event '${JSON.stringify(event)}' originating from '${context.eventSourceId}' with sequence number ${context.sequenceNumber}`);
    }
}
