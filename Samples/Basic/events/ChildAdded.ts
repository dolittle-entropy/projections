// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('5c277aa6-7a97-4673-ac2c-953abe7a973a')
export class ChildAdded {
    constructor(readonly ruleId: string, readonly name: string) {}
}
