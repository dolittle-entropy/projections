// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Collection, MongoClient } from 'mongodb';
import { IState } from '../IState';
import { PropertyAccessor } from '../Properties';
import { Logger } from 'winston';
import { Guid } from '@dolittle/rudiments';
import { EventSourceId, EventContext } from '@dolittle/sdk.events';
import { MongoDBConfigurationProvider } from '../../MongoDBConfigurationProvider';

export class State implements IState {
    private _collectionsPerConnectionStringAndDatabase: Map<string, Collection> = new Map();

    constructor(private readonly _provider: MongoDBConfigurationProvider, private _collectionName: string, private readonly _logger: Logger) {
    }

    private async getCollection(context: EventContext): Promise<Collection> {
        const configuration = this._provider(context);
        const key = `${configuration.connectionString}/${configuration.databaseName}`;

        if (this._collectionsPerConnectionStringAndDatabase.has(key)) {
            return this._collectionsPerConnectionStringAndDatabase.get(key)!;
        }

        const mongoClient = await MongoClient.connect(configuration.connectionString, { useNewUrlParser: true });
        const collection = mongoClient.db(configuration.databaseName).collection(this._collectionName);
        this._collectionsPerConnectionStringAndDatabase.set(configuration.connectionString, collection);

        return collection;
    }


    async get(id: any, context: EventContext): Promise<any> {
        const collection = await this.getCollection(context);
        const result = await collection.findOne({ _id: id });
        if (result) {
            delete result._id;
        }
        return result;
    }

    async set(id: any, content: any, context: EventContext): Promise<void> {
        delete content._id;

        const collection = await this.getCollection(context);

        const key = { _id: id };
        this._logger.info(`Set state on '${collection.collectionName}'`, key, content);
        await collection.updateOne(key, { $set: content }, { upsert: true });
    }

    async setMany(property: PropertyAccessor, id: any, content: any, context: EventContext): Promise<void> {
        const filter: any = {};
        if (id instanceof Guid || id instanceof EventSourceId) {
            id = id.toString();
        }
        property.set(filter, id);

        const collection = await this.getCollection(context);

        this._logger.info(`Update '${collection.collectionName}'`, filter, content);

        await collection.updateMany(filter, { $set: content });
    }
}
