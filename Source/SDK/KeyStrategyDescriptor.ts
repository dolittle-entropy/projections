// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyId } from '../KeyStrategyId';

export class KeyStrategyDescriptor {
    constructor(readonly id: KeyStrategyId, readonly configuration?: any) {
    }
}
