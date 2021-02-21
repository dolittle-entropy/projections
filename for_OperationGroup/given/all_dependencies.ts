// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { DateTime } from 'luxon';

import { EventTypeId, EventContext, EventSourceId } from '@dolittle/sdk.events';
import {
    Claims,
    CorrelationId,
    Environment,
    ExecutionContext,
    MicroserviceId,
    TenantId,
    Version
} from '@dolittle/sdk.execution';

import { IState } from '@dolittle/projections/Service/IState';
import { Logger } from 'winston';
import { LoggerInstance } from '@dolittle/projections/Service/SpecMocks/Logger';
import { ObjectComparer } from '../../Source/Service/Changes/ObjectComparer';

export class all_dependencies {
    state: IState;
    logger: Logger = LoggerInstance;

    eventType: EventTypeId = EventTypeId.from('83a1e4ce-b63d-45b3-9641-0c268b91a673');
    event: any = {};
    eventSourceId: EventSourceId = EventSourceId.from('e5392d64-1987-4193-8d3a-57aea4759cef');
    eventContext: EventContext;
    objectComparer: ObjectComparer;

    constructor() {

        this.eventContext = new EventContext(
            0,
            this.eventSourceId,
            DateTime.local(),
            new ExecutionContext(
                MicroserviceId.from('9a234837-5f28-4c02-8542-06ab1066d1a8'),
                TenantId.from('493a4170-64d6-48db-9dee-e13819afcea9'),
                Version.first,
                Environment.production,
                CorrelationId.new(),
                new Claims()

            )
        );
        this.state = {
            get: sinon.stub().returns({}),
            set: sinon.stub(),
            setMany: sinon.stub()
        };
        this.objectComparer = new ObjectComparer();
    }
}
