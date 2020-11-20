// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Collection, FilterQuery } from 'mongodb';
import { IProjections } from '../IProjections';

export class Projections implements IProjections {

    constructor(private readonly _collection: Collection) {

    }

    async get(id: any): Promise<any> {
        const result = await this._collection.findOne({ _id: id });
        return result;
    }

    async set(id: any, content: any): Promise<void> {
        await this._collection.updateOne({ _id: id }, content, { upsert: true });
    }
}
