// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionId } from '../ProjectionId';
import { Guid } from '@dolittle/rudiments';
import { ProjectionForDecoratedTypes } from './ProjectionForDecoratedTypes';
import { ProjectionForDecoratedType } from './ProjectionForDecoratedType';
import { Constructor } from '@dolittle/types';

/**
 * Decorator to mark a class as a projection definition - must implement the interface {@link IProjectionFor}
 * @param {ProjectionId | Guid | string} projectionId Unique identifier of the projection
 */
export function projectionFor<TDocument extends object>(documentType: Constructor<TDocument>, projectionId: ProjectionId | Guid | string) {
    return function (target: any) {
        if (!target.prototype.hasOwnProperty('define')) {
            throw new Error(`Type '${target.prototype.name}' does not implement IProjectionFor<Model> interface`);
        }

        ProjectionForDecoratedTypes.register(new ProjectionForDecoratedType(documentType, ProjectionId.from(projectionId), target));
    };
}
