// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { EventContext, EventTypeId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';
import { IProjections } from './IProjections';
import { IKeyStrategy } from './Keys/IKeyStrategy';

import { Logger } from 'winston';
import { OperationContext } from './OperationContext';

export class Projection {
    private readonly _operationsByEventType: Map<EventTypeId, IOperation[]> = new Map();

    constructor(readonly stream: Guid,
        private readonly _keyStrategy: IKeyStrategy,
        private readonly _operations: IOperation[],
        private readonly _projectionRepository: IProjections,
        private readonly _logger: Logger) {

        for (const operation of _operations) {
            for (const eventType of operation.eventTypes) {
                const operations = this._operationsByEventType.get(eventType) || [];
                this._operationsByEventType.set(eventType, [...operations, operation]);
            }
        }
    }

    async handle(event: any, context: EventContext) {
        this._logger.info('Handling');

        try {
            const key = this._keyStrategy.get(event, context);
            const currentProjectedState = await this._projectionRepository.get(key);

            let currentState = currentProjectedState || {};

            if (this._operationsByEventType.has(event.constructor)) {
                const operationContext = new OperationContext(this.stream, currentState, [{event, context}]);

                for (const operation of this._operationsByEventType.get(event.constructor)!) {
                    currentState = operation.perform(operationContext);
                }
            }

            await this._projectionRepository.upsert(key, currentState);

        } catch (ex) {
            this._logger.error(`Couldn't handle event in projection ${this.stream}`, ex);
        }
    }
}
