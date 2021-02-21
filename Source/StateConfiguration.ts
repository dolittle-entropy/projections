// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MongoDBConfigurationProvider } from './MongoDBConfigurationProvider';
export class StateConfiguration {
    constructor(readonly provider: MongoDBConfigurationProvider) {
    }
}
