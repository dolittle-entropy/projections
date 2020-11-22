// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ConceptAs } from '@dolittle/concepts';

/**
 * Represents the unique identifier of an expression.
 */
export class ExpressionTypeId extends ConceptAs<Guid, '@dolittle/projections.ExpressionTypeId'> {
    constructor(id: Guid) {
        super(id, '@dolittle/projections.ExpressionTypeId');
    }

    /**
     * Gets the unknown {@link ExpressionTypeId}
     */
    static unknown: ExpressionTypeId = ExpressionTypeId.from(Guid.empty);

    /**
     * Creates a {@link ExpressionTypeId} from a guid.
     *
     * @static
     * @param {string | Guid | ExpressionTypeId} id
     * @returns {ExpressionTypeId}
     */
    static from(id: string | Guid | ExpressionTypeId): ExpressionTypeId {
        if (id instanceof ExpressionTypeId) return id;
        return new ExpressionTypeId(Guid.as(id));
    };
}
