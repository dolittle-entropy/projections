// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyId } from '../KeyStrategyId';

export class UnknownKeyStrategy extends Error {
    constructor(keyStrategyId: KeyStrategyId) {
        super(`Strategy of type '${keyStrategyId.toString()}' is unknown`);
    }
}
