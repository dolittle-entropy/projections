// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ConceptAs } from '@dolittle/concepts';

/**
 * Represents the unique identifier of a key strategy.
 */
export class KeyStrategyId extends ConceptAs<Guid, '@dolittle/projections.KeyStrategyId'> {
    constructor(id: Guid) {
        super(id, '@dolittle/projections.KeyStrategyId');
    }

    /**
     * Gets the unknown {@link KeyStrategyId}
     */
    static unknown: KeyStrategyId = KeyStrategyId.from(Guid.empty);

    /**
     * Creates a {@link KeyStrategyId} from a guid.
     *
     * @static
     * @param {string | Guid | KeyStrategyId} id
     * @returns {KeyStrategyId}
     */
    static from(id: string | Guid | KeyStrategyId): KeyStrategyId {
        if (id instanceof KeyStrategyId) return id;
        return new KeyStrategyId(Guid.as(id));
    };
}
