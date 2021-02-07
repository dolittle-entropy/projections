// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import { Host } from '@dolittle/vanir-backend';
import { RegisterRoutes } from './routes';
import { EventTypeQueries } from './eventTypes/EventTypeQueries';
import { EventTypeMutations } from './eventTypes/EventTypeMutations';
import { EventInstanceQueries } from './events/EventInstanceQueries';
import { EventInstanceMutations } from './events/EventInstanceMutations';
import { ReadModelTypeMutations } from './readModelTypes/ReadModelTypeMutations';
import { ReadModelTypeQueries } from './readModelTypes/ReadModelTypeQueries';
import { ProjectionQueries } from './projections/ProjectionQueries';
import { ProjectionMutations } from './projections/ProjectionMutations';
const swaggerDoc = require('./swagger.json');

import { registerEnumType } from 'type-graphql';
import { PropertyType } from './common/PropertyType';

(async () => {
    registerEnumType(PropertyType, { name: 'PropertyType' });
    await Host.start({
        swaggerDoc,
        graphQLResolvers: [
            EventTypeQueries,
            EventTypeMutations,
            EventInstanceQueries,
            EventInstanceMutations,
            ReadModelTypeQueries,
            ReadModelTypeMutations,
            ProjectionQueries,
            ProjectionMutations
        ],
        expressCallback: (app) => {
            RegisterRoutes(app);
        }
    });
})();
