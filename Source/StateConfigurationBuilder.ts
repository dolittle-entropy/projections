// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StateConfiguration } from './StateConfiguration';
import { MissingPersistenceConfigurationForIntermediates } from './MissingPersistenceConfigurationForIntermediates';
import { MongoDBConfigurationProvider } from './MongoDBConfigurationProvider';
import { EventContext } from '@dolittle/sdk.events';

export type StateConfigurationBuilderCallback = (builder: StateConfigurationBuilder) => void;

export class StateConfigurationBuilder {
    private _provider: MongoDBConfigurationProvider | undefined;

    storeInMongo(connectionString: string, databaseName: string) {
        this.storeInMongoUsingProvider((eventContext: EventContext) => {
            return {
                connectionString,
                databaseName
            };
        });
    }

    storeInMongoUsingProvider(provider: MongoDBConfigurationProvider) {
        this._provider = provider;
    }

    build(): StateConfiguration {
        if (!this._provider) {
            throw new MissingPersistenceConfigurationForIntermediates();
        }

        return new StateConfiguration(this._provider);
    }
}
