// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MissingPersistenceConfigurationForProjections } from './MissingPersistenceConfigurationForProjections';
import { ProjectionsConfiguration } from './ProjectionsConfiguration';

export type ProjectionsConfigurationBuilderCallback = (builder: ProjectionsConfigurationBuilder) => void;

export class ProjectionsConfigurationBuilder {
    private _connectionString?: string;
    private _databaseName?: string;

    storeInMongo(connectionString: string, databaseName: string) {
        this._connectionString = connectionString;
        this._databaseName = databaseName;
    }

    build(): ProjectionsConfiguration {
        if (!this._connectionString || !this._databaseName) {
            throw new MissingPersistenceConfigurationForProjections();
        }

        return new ProjectionsConfiguration(this._connectionString, this._databaseName);
    }
}
