// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId, StreamId } from '@dolittle/sdk.events';
import { IOperationGroup } from './IOperationGroup';

export class Projection {
    constructor(readonly stream: StreamId, readonly operationGroups: IOperationGroup[]) {
    }

    async handle(eventType: EventTypeId, event: any, context: EventContext) {
        for (const operationGroup of this.operationGroups) {
            await operationGroup.handle(eventType, event, context);
        }
    }
}
