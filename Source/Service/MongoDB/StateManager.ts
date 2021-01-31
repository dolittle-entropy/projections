// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { IStateManager } from '../IStateManager';
import { State } from './State';
import { MongoClient } from 'mongodb';
import { StateConfiguration } from '../../StateConfiguration';
import { Logger } from 'winston';

export class StateManager implements IStateManager {
    private _mongoClient?: MongoClient;

    constructor(private readonly _configuration: StateConfiguration, private readonly _logger: Logger) {
    }

    async getFor(name: string): Promise<IState> {
        const mongoClient = await this.getMongoClient();
        const collection = mongoClient.db(this._configuration.databaseName).collection(name);
        return new State(collection, this._logger);
    }

    private async getMongoClient(): Promise<MongoClient> {
        if (!this._mongoClient || !this._mongoClient.isConnected) {
            this._mongoClient = await MongoClient.connect(this._configuration.connectionString, { useNewUrlParser: true });
        }
        return this._mongoClient;
    }
}
