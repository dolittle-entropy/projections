// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MissingPersistenceConfigurationForProjections } from './MissingPersistenceConfigurationForProjections';
import { ProjectionsConfiguration } from './ProjectionsConfiguration';

export type ProjectionsConfigurationBuilderCallback = (builder: ProjectionsConfigurationBuilder) => void;

export class ProjectionsConfigurationBuilder {
    private _connectionString?: string;

    storeInMongo(connectionString: string) {
        this._connectionString = connectionString;
    }

    build(): ProjectionsConfiguration {
        if(!this._connectionString) {
            throw new MissingPersistenceConfigurationForProjections();
        }

        return new ProjectionsConfiguration(this._connectionString);
    }
}
