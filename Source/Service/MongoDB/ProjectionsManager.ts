// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionsConfiguration } from 'Source/ProjectionsConfiguration';
import { IProjections } from '../IProjections';
import { IProjectionsManager } from '../IProjectionsManager';
import { Projections } from './Projections';

export class ProjectionsManager implements IProjectionsManager {

    constructor(private readonly _configuration: ProjectionsConfiguration) {
    }


    async getFor(name: string): Promise<IProjections> {
        return new Projections();
    }
}
