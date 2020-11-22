// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ConceptAs } from '@dolittle/concepts';

/**
 * Represents the unique identifier of an operation.
 */
export class OperationTypeId extends ConceptAs<Guid, '@dolittle/projections.OperationId'> {
    constructor(id: Guid) {
        super(id, '@dolittle/projections.OperationId');
    }

    /**
     * Gets the unknown {@link OperationId}
     */
    static unknown: OperationTypeId = OperationTypeId.from(Guid.empty);

    /**
     * Creates a {@link OperationId} from a guid.
     *
     * @static
     * @param {string | Guid | OperationTypeId} id
     * @returns {OperationTypeId}
     */
    static from(id: string | Guid | OperationTypeId): OperationTypeId {
        if (id instanceof OperationTypeId) return id;
        return new OperationTypeId(Guid.as(id));
    };
}
