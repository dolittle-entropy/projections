// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionRepository } from '../IProjectionRepository';
import { IProjectionRepositoryFactory } from '../IProjectionRepositoryFactory';
import { ProjectionRepository } from './ProjectionRepository';

export class ProjectionRepositoryFactory implements IProjectionRepositoryFactory {
    async getFor(name: string): Promise<IProjectionRepository> {
        return new ProjectionRepository();
    }
}
