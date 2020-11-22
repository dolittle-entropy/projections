// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { KeyStrategyId } from './KeyStrategyId';

export default {
    NotSet: KeyStrategyId.from(Guid.empty),
    EventSourceIdentifier: KeyStrategyId.from('01a2a722-48f6-4c57-8a3e-64e972b04da6'),
    Property: KeyStrategyId.from('f9288c8d-3373-4cbf-8d89-0c4232a91766')
};