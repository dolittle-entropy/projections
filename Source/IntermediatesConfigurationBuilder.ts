// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IntermediatesConfiguration } from './IntermediatesConfiguration';
import { MissingPersistenceConfigurationForIntermediates } from './MissingPersistenceConfigurationForIntermediates';

export type IntermediatesConfigurationBuilderCallback = (builder: IntermediatesConfigurationBuilder) => void;

export class IntermediatesConfigurationBuilder {
    private _connectionString?: string;
    private _databaseName?: string;

    storeInMongo(connectionString: string, databaseName: string) {
        this._connectionString = connectionString;
        this._databaseName = databaseName;
    }

    build(): IntermediatesConfiguration {
        if (!this._connectionString || !this._databaseName) {
            throw new MissingPersistenceConfigurationForIntermediates();
        }

        return new IntermediatesConfiguration(this._connectionString, this._databaseName);
    }
}
