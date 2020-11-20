// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjections } from '../IProjections';
import { IProjectionsManager } from '../IProjectionsManager';
import { Projections } from './Projections';

export class ProjectionsManager implements IProjectionsManager {
    async getFor(name: string): Promise<IProjections> {
        return new Projections();
    }
}
