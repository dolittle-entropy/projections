// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventContext, EventTypeId, StreamId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';
import { IProjections } from './IProjections';
import { IKeyStrategy } from './Keys/IKeyStrategy';

import { Logger } from 'winston';
import { OperationContext } from './OperationContext';
import { UnableToResolveKeyForEvent } from './UnableToResolveKeyForEvent';

export class Projection {
    private readonly _operationsByEventType: Map<EventTypeId, IOperation[]> = new Map();

    constructor(readonly stream: StreamId,
        private readonly _keyStrategies: IKeyStrategy[],
        _operations: IOperation[],
        private readonly _projections: IProjections,
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
            const keyStrategy = this.getKeyStrategyFor(event, context);
            const key = keyStrategy.get(event, context);

            if (this._operationsByEventType.has(event.constructor)) {
                const currentProjectedState = await this._projections.get(key);

                let currentState = currentProjectedState || {};

                const operationContext = new OperationContext(this.stream, currentState, [{ event, context }]);

                for (const operation of this._operationsByEventType.get(event.constructor)!) {
                    currentState = operation.perform(operationContext);
                }
                await this._projections.set(key, currentState);
            }
        } catch (ex) {
            this._logger.error(`Couldn't handle event in projection ${this.stream}`, ex);
        }
    }

    private getKeyStrategyFor(event: any, context: EventContext): IKeyStrategy {
        const keyStrategy = this._keyStrategies.find(_ => _.has(event, context));
        this.throwIfUnableToResolveKey(keyStrategy, event, context);
        return keyStrategy!;
    }

    private throwIfUnableToResolveKey(keyStrategy: IKeyStrategy | undefined, event: any, context: EventContext) {
        if (!keyStrategy) {
            throw new UnableToResolveKeyForEvent(event, context);
        }
    }
}


