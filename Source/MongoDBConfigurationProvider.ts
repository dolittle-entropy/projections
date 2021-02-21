// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MongoDBConfiguration } from './MongoDBConfiguration';
import { EventContext } from '@dolittle/sdk.events';

export type MongoDBConfigurationProvider = (context: EventContext) => MongoDBConfiguration;
