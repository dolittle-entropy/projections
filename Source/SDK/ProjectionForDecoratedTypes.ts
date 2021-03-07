// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionForDecoratedType } from './ProjectionForDecoratedType';

/**
 * Represents all {@link ProjectionDecoratedType}s.
 */
export class ProjectionForDecoratedTypes {
    static readonly types: ProjectionForDecoratedType[] = [];

    /**
     * Register a {@link ProjectionDecoratedType}
     * @param {ProjectionDecoratedType} projectionDecoratedType Decorated type.
     */
    static register(projectionDecoratedType: ProjectionForDecoratedType) {
        this.types.push(projectionDecoratedType);
    }
}
