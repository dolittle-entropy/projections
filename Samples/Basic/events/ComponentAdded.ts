// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('a3a12d67-6c04-441f-b1ca-57fa89be3137')
export class ComponentAdded {
    constructor(readonly name: string) {}
}
