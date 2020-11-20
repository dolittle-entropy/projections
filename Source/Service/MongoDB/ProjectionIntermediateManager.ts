// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StreamId } from '@dolittle/sdk.events';
import { IProjectionIntermediates } from '../IProjectionIntermediates';
import { IProjectionIntermediatesManager } from '../IProjectionIntermediatesManager';

export class ProjectionIntermediateManager implements IProjectionIntermediatesManager {

    /** @inheritdoc */
    getFor(stream: StreamId, identifier: string): Promise<IProjectionIntermediates> {
        throw new Error('Method not implemented.');
    }
}
