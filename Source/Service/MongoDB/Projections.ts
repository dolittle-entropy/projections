// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjections } from '../IProjections';

export class Projections implements IProjections {
    async get(id: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async set(id: any, content: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
