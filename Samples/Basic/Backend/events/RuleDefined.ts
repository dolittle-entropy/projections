// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('005a782f-bb11-4ee6-959c-e38191a66249')
export class RuleDefined {
    constructor(readonly ruleId: string, readonly type: number, readonly priority: number, readonly featureId: string, readonly componentId: string) {}
}
