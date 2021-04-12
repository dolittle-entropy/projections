// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Client } from '@dolittle/sdk';
import bodyParser from 'body-parser';
import express from 'express';
import { TenantId } from '@dolittle/sdk.execution';
import { ComponentAdded, FeatureAdded, RuleDefined } from './events';
import { createLogger, format, transports } from 'winston';
import { ChildAdded } from './events/ChildAdded';

//import './RuleProjection';
import './RuleStatisticsProjection';

(async () => {
    const loggerOptions = {
        level: 'info',
        format: format.colorize(),
        defaultMeta: {
        },
        transports: [
            new transports.Console({
                format: format.simple()
            })
        ]
    };

    const logger = createLogger(loggerOptions);

    const client = Client
        .forMicroservice('78cf6cf3-2ed1-4e8c-b456-f8f4365c31cd')
        .withLogging(logger)
        .withEventTypes(_ => _
            .register(ComponentAdded)
            .register(FeatureAdded)
            .register(RuleDefined)
            .register(ChildAdded))
        .useProjections(_ => _.storeInMongo('mongodb://localhost:27017', 'Basic'))
        .useProjectionIntermediates(_ => _.storeInMongo('mongodb://localhost:27017', 'event_store_basic'))
        .build();

    const app = express();
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );
    app.use(bodyParser.json());

    const eventStore = client.eventStore.forTenant(TenantId.development);

    app.get('/doStuff', async (req, res) => {
        const featureId = 'c2d3b8ec-505d-4905-8441-8ac6ad2bfd2f';
        const componentId = '7c5b0da1-cfdf-48c0-a8c7-e3ad7b751b21';
        const ruleId = 'afe8b77f-5430-4a98-8fa5-a7c6f63c2e1f';
        const childId = 'eb461aa0-0d69-4e84-a402-5fd12e866b74';

        await eventStore.commit(new FeatureAdded(featureId, 'My Feature'), featureId);
        await eventStore.commit(new RuleDefined(ruleId, 1, 2, featureId, componentId), ruleId);
        await eventStore.commit(new ComponentAdded('My Component'), componentId);
        await eventStore.commit(new RuleDefined(ruleId, 1, 3, featureId, componentId), ruleId);
        await eventStore.commit(new ChildAdded(ruleId, 'Something'), childId);

        await res.send('Ok');
    });

    app.get('/projections', async (req, res) => {
        const projections = ((client as any).projections);
        console.log(projections);

        res.setHeader('Content-Type', 'application/json');
        await res.send(projections);

    });

    const expressPort = process.env.PORT || 3000;
    app.listen({ port: expressPort, hostname: '0.0.0.0' }, () => {
        console.log(`Server is running on port ${expressPort}.`);
    });
})();
