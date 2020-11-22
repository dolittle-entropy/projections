// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { IStateManager } from '../IStateManager';
import { State } from './State';
import { MongoClient } from 'mongodb';
import { IntermediatesConfiguration } from 'Source/IntermediatesConfiguration';

export class IntermediatesStateManager implements IStateManager {
    private _mongoClient?: MongoClient;

    constructor(private readonly _configuration: IntermediatesConfiguration) {
    }

    async getFor(name: string): Promise<IState> {
        const mongoClient = await this.getMongoClient();
        const collection = mongoClient.db(this._configuration.databaseName).collection(name);
        return new State(collection);
    }

    private async getMongoClient(): Promise<MongoClient> {
        if (!this._mongoClient || !this._mongoClient.isConnected) {
            this._mongoClient = await MongoClient.connect(this._configuration.connectionString, { useUnifiedTopology: true });
        }
        return this._mongoClient;
    }
}
