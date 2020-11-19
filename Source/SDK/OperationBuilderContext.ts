// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IEventTypes } from '@dolittle/sdk.artifacts';

export class OperationBuilderContext {
    constructor(readonly eventTypes: IEventTypes) {
    }
}
