// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId, ScopeId, StreamId } from '@dolittle/sdk.events';
import { IOperationGroup } from '../Operations';

export class Projection {
    constructor(readonly stream: StreamId, readonly scope: ScopeId, readonly operationGroups: IOperationGroup[]) {
    }

    get isScoped() {
        return this.scope !== ScopeId.default;
    }

    async handle(eventType: EventTypeId, event: any, context: EventContext) {
        for (const operationGroup of this.operationGroups) {
            await operationGroup.handle(eventType, event, context);
        }
    }
}
