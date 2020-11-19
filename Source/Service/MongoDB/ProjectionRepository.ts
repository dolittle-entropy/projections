// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IProjectionRepository } from '../IProjectionRepository';

export class ProjectionRepository implements IProjectionRepository {
    async getCurrentState(id: Guid): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async upsert(id: Guid, content: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}


