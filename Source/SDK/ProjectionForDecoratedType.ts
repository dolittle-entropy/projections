// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionId } from '../ProjectionId';
import { Constructor } from '@dolittle/types';

/**
 * Represents a projection registered using the decorator
 */
export class ProjectionForDecoratedType<TDocument extends object = {}> {
    constructor(readonly documentType: Constructor<TDocument>, readonly projectionId: ProjectionId, readonly target: Constructor<any>) { }
}
