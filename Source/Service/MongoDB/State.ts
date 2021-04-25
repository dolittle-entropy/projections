// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Collection, MongoClient, Binary } from 'mongodb';
import { IState } from '../IState';
import { PropertyAccessor } from '../Properties';
import { Logger } from 'winston';
import { Guid } from '@dolittle/rudiments';
import { EventSourceId, EventContext } from '@dolittle/sdk.events';
import { MongoDBConfigurationProvider } from '../../MongoDBConfigurationProvider';
import './GuidExtensions';

export class State implements IState {
    private _collectionsPerConnectionStringAndDatabase: Map<string, Collection> = new Map();

    constructor(
        private readonly _provider: MongoDBConfigurationProvider,
        private readonly _collectionName: string,
        private readonly _initialState: any,
        private readonly _logger: Logger) {
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
        id = this.convertToMongo(id);
        let result = await collection.findOne({ _id: id });
        if (result) {
            delete result._id;
        } else {
            result = this._initialState;
        }
        result = this.convertFromMongo(result);
        return result;
    }

    async set(id: any, content: any, context: EventContext): Promise<void> {
        delete content._id;

        id = this.convertToMongo(id);

        const collection = await this.getCollection(context);

        const key = { _id: id };
        const convertedContent = this.convertToMongo({ ...content });
        this._logger.info(`Set state on '${collection.collectionName}'`, key, convertedContent);
        await collection.updateOne(key, { $set: convertedContent }, { upsert: true });
    }

    async setMany(property: PropertyAccessor, id: any, content: any, context: EventContext): Promise<void> {
        const filter: any = {};
        id = this.convertToMongo(id);
        property.set(filter, id);

        const collection = await this.getCollection(context);

        this._logger.info(`Update '${collection.collectionName}'`, filter, content);

        await collection.updateMany(filter, { $set: content });
    }

    private convertToMongo(value: any) {
        if (!value) { return value; }
        if (typeof value === 'string') { return value; }
        if (value instanceof Guid) {
            return (value as Guid).toMUUID();
        }
        if (value.value instanceof Guid) {
            return (value.value as Guid).toMUUID();
        }

        for (const property of Object.getOwnPropertyNames(value)) {
            if (typeof value[property] === 'function') continue;
            value[property] = this.convertToMongo(value[property]);
        }

        return value;
    }

    private convertFromMongo(value: any) {
        if (!value) { return value; }
        if (typeof value === 'string') { return value; }
        if (value instanceof Binary) {
            return (value as Binary).toGuid();
        }

        for (const property of Object.getOwnPropertyNames(value)) {
            if (typeof value[property] === 'function') continue;
            value[property] = this.convertFromMongo(value[property]);
        }

        return value;
    }
}
