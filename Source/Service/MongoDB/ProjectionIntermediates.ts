// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionIntermediates } from '../IProjectionIntermediates';

export class ProjectionIntermediate implements IProjectionIntermediates {

    /** @inheritdoc */
    get(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    /** @inheritdoc */
    upsert(id: any, content: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
