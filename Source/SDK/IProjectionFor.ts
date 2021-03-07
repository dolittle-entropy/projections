// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionBuilder } from './ProjectionBuilder';

/**
 * Defines a projection
 */
export interface IProjectionFor<TDocument extends object> {

    /**
     * Defines the projection.
     * @param {ProjectionBuilder} projectionBuilder Builder to use for the definition.
     */
    define(projectionBuilder: ProjectionBuilder<TDocument>): void;
}
