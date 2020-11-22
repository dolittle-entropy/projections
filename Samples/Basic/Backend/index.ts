// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Client } from '@dolittle/sdk';
import bodyParser from 'body-parser';
import express from 'express';
import { TenantId } from '@dolittle/sdk.execution';
import { ComponentAdded, FeatureAdded, RuleDefined } from './events';
import { createLogger, format, transports } from 'winston';

import { Guid } from '@dolittle/rudiments';
import '@dolittle/projections';

export class Rule {
    type!: number;
    priority!: number;
    featureId!: string;
    featureName!: string;
    componentId!: string;
    componentName!: string;
    lastUpdated!: Date;
}

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
            .register(RuleDefined))
        .withProjections(_ => _.storeInMongo('mongodb://localhost:27017', 'Basic'))
        .withProjectionIntermediates(_ => _.storeInMongo('mongodb://localhost:27017', 'event_store_basic'))
        .withProjectionFor(Rule, p => p
            .withId('0ded8a37-5a69-41f3-b31e-c1f20867e1de')
            .useModelName('TheRules')
            .withKeys(_ => _.usingProperty('ruleId').usingEventSourceId())
            .from(RuleDefined, e => e
                .set(r => r.type).to(ev => ev.type)
                .set(r => r.priority).to(ev => ev.priority)
                .set(r => r.featureId).to(ev => ev.featureId)
                .set(r => r.componentId).to(ev => ev.componentId)
                .set(r => r.lastUpdated).toContext(ec => ec.occurred))
            .join(FeatureAdded, e => e
                .on(r => r.featureId)
                .usingKeyFrom(ev => ev.name)
                .set(r => r.featureName).to(ev => ev.name))
            .join(ComponentAdded, e => e
                .on(r => r.componentId)
                .set(r => r.componentName).to(ev => ev.name)))
        .build();

        /*
        Notes:

        - IOperation should have a way to tell if projections should be persisted - the join operation don't persist directly to the projections
        - Another approach; Projection engine could ask operation for how to persist and also provide a key strategy - benefit is that it is then recursively working on child operations
        - In ProjectionService when setting things up, run through 'Joins' at the end
        - The On() should resolve in Service to become a child operation for when the property it refers to is set, this should then resolve from intermediate state
           - The "ResolveJoin" that should occur when an event needs access to the projections repository to do updates with filter (update many)
        - Intermediate state should include the event payload - so that we can run ResolveJoin using the operations on the original Join.
           - Or... State that is stored is mapped to the target format and all we need to do is just Update with this - which effectively means for ResolveJoin to go get the state and update the projection with it
        */

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

        await eventStore.commit(new FeatureAdded(featureId, 'My Feature'), featureId);
        await eventStore.commit(new RuleDefined(ruleId, 1, 2, featureId, componentId), ruleId);
        await eventStore.commit(new ComponentAdded('My Component'), componentId);
        await eventStore.commit(new RuleDefined(ruleId, 1, 3, featureId, componentId), ruleId);

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