// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import { EventTypeQueries } from './events/EventTypeQueries';
import { EventTypeMutations } from './events/EventTypeMutations';
const swaggerDoc = require('./swagger.json');

(async () => {
    await Host.start({
        swaggerDoc,
        graphQLResolvers: [EventTypeQueries, EventTypeMutations],
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
