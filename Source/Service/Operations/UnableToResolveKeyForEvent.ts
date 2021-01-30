// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from './IOperationDataContext';

/**
 * Exception that is thrown when key is not possible to resolve
 */
export class UnableToResolveKeyForEvent extends Error {

    /**
     * Initializes a new instance of {@link UnableToResolveKeyForEvent}.
     * @param {IOperationContext} dataContext The operation data context.
     */
    constructor(dataContext: IOperationDataContext) {
        super(`Unable to resolve key from event '${JSON.stringify(dataContext.event)}' originating from '${dataContext.eventContext.eventSourceId}' with sequence number ${dataContext.eventContext.sequenceNumber}`);
    }
}
