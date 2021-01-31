// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Collection, FilterQuery } from 'mongodb';
import { IState } from '../IState';
import { PropertyAccessor } from '../Properties';
import { Logger } from 'winston';
import { Guid } from '@dolittle/rudiments';
import { EventSourceId } from '@dolittle/sdk.events';

export class State implements IState {

    constructor(private readonly _collection: Collection, private readonly _logger: Logger) {
    }

    async get(id: any): Promise<any> {
        const result = await this._collection.findOne({ _id: id });
        if (result) {
            delete result._id;
        }
        return result;
    }

    async set(id: any, content: any): Promise<void> {
        delete content._id;

        const key = { _id: id };
        this._logger.info(`Set state on '${this._collection.collectionName}'`, key, content);
        await this._collection.updateOne(key, { $set: content }, { upsert: true });
    }

    async setMany(property: PropertyAccessor, id: any, content: any): Promise<void> {
        const filter: any = {};
        if (id instanceof Guid ||id instanceof EventSourceId) {
            id = id.toString();
        }
        property.set(filter, id);

        this._logger.info(`Update '${this._collection.collectionName}'`, filter, content);

        await this._collection.updateMany(filter, { $set: content });
    }
}
