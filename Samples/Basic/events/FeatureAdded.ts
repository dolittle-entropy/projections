// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { eventType } from '@dolittle/sdk.events';

@eventType('988ebe3f-1270-46ca-a515-f973b6d64dca')
export class FeatureAdded {
    constructor(readonly name: string) {}
}

