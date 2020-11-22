// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StateConfiguration } from './StateConfiguration';
import { MissingPersistenceConfigurationForIntermediates } from './MissingPersistenceConfigurationForIntermediates';

export type StateConfigurationBuilderCallback = (builder: StateConfigurationBuilder) => void;

export class StateConfigurationBuilder {
    private _connectionString?: string;
    private _databaseName?: string;

    storeInMongo(connectionString: string, databaseName: string) {
        this._connectionString = connectionString;
        this._databaseName = databaseName;
    }

    build(): StateConfiguration {
        if (!this._connectionString || !this._databaseName) {
            throw new MissingPersistenceConfigurationForIntermediates();
        }

        return new StateConfiguration(this._connectionString, this._databaseName);
    }
}
