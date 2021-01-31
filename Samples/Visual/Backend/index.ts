// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import { EventTypeQueries } from './eventTypes/EventTypeQueries';
import { EventTypeMutations } from './eventTypes/EventTypeMutations';
import { EventInstanceQueries } from './events/EventInstanceQueries';
import { EventInstanceMutations } from './events/EventInstanceMutations';
const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        graphQLResolvers: [EventTypeQueries, EventTypeMutations, EventInstanceQueries, EventInstanceMutations],
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
