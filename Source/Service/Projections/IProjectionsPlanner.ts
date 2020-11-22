// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Projection } from './Projection';
import { ProjectionDescriptor } from '../../SDK/ProjectionDescriptor';

export interface IProjectionsPlanner {
    planFrom(descriptor: ProjectionDescriptor): Promise<Projection>;
}
