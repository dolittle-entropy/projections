// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ProjectionsConfiguration } from '../../ProjectionsConfiguration';
import { IState } from '../IState';
import { IStateManager } from '../IStateManager';
import { Projections } from './Projections';
import { MongoClient } from 'mongodb';

export class ProjectionsManager implements IStateManager {
    private _mongoClient?: MongoClient;


    constructor(private readonly _configuration: ProjectionsConfiguration) {
    }


    async getFor(name: string): Promise<IState> {
        const mongoClient = await this.getMongoClient();
        const collection = mongoClient.db(this._configuration.databaseName).collection(name);
        return new Projections(collection);
    }

    private async getMongoClient(): Promise<MongoClient> {
        if (!this._mongoClient || !this._mongoClient.isConnected) {
            this._mongoClient = await MongoClient.connect(this._configuration.connectionString, { useUnifiedTopology: true });
        }
        return this._mongoClient;

    }
}
