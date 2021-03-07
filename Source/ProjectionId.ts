// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ConceptAs } from '@dolittle/concepts';
import { Guid } from '@dolittle/rudiments';

/**
 * Represents the unique identifier for a EventHandler.
 */
export class ProjectionId extends ConceptAs<Guid, '@dolittle/projections.ProjectionId'> {
    constructor(id: Guid) {
        super(id, '@dolittle/projections.ProjectionId');
    }

    /**
     * Creates an {ProjectionId} from a guid.
     *
     * @static
     * @param {string | Guid |ProjectionId} id
     * @returns {ProjectionId}
     */
    static from(id: string | Guid | ProjectionId): ProjectionId {
        if (id instanceof ProjectionId) return id;
        return new ProjectionId(Guid.as(id));
    }
}
