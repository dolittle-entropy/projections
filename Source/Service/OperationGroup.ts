// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import deepEqual from 'deep-equal';
import { Logger } from 'winston';

import { EventContext, EventTypeId, StreamId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';
import { IOperationGroup } from './IOperationGroup';
import { IState } from './IState';
import { OperationContext } from './OperationContext';
import { IBaseOperation } from './IBaseOperation';
import { IKeyStrategy } from './Keys/IKeyStrategy';
import { UnableToResolveKeyForEvent } from './UnableToResolveKeyForEvent';

export class OperationGroup implements IOperationGroup {
    private readonly _operationsByEventType: Map<EventTypeId, IOperation[]> = new Map();

    constructor(
        readonly stream: StreamId,
        readonly keyStrategies: IKeyStrategy[],
        readonly operations: IOperation[],
        readonly children: IOperationGroup[],
        private readonly _state: IState,
        private readonly _logger: Logger) {
        for (const operation of operations) {
            for (const eventType of operation.eventTypes) {
                const operations = this._operationsByEventType.get(eventType) || [];
                this._operationsByEventType.set(eventType, [...operations, operation]);
            }
        }
    }


    async handle(eventType: EventTypeId, event: any, context: EventContext): Promise<void> {
        try {
            if (this._operationsByEventType.has(eventType)) {
                const keyStrategy = this.getKeyStrategyFor(event, context);
                const key = keyStrategy.get(event, context);

                const initial = await this._state.get(key) || {};

                let currentState: any = { ...initial };

                for (const operation of this._operationsByEventType.get(eventType)!) {
                    const operationContext = new OperationContext(key, currentState, event, context);
                    currentState = await this.performOperationAndChildren(operation, operationContext, currentState);
                }

                if (!deepEqual(initial, currentState)) {
                    await this._state.set(key, currentState);
                }
            }
        } catch (ex) {
            this._logger.error(`Couldn't handle event of type '${eventType.toString()}' in projection '${this.stream.toString()}'`, ex);
            throw ex;
        }
    }

    private async performOperationAndChildren(operation: IBaseOperation, operationContext: OperationContext, currentState: any): Promise<any> {
        let stateAfterOperation = await operation.perform(operationContext);
        currentState = { ...currentState, ...stateAfterOperation };

        for (const child of operation.children) {
            operationContext = new OperationContext(operationContext.key, currentState, operationContext.event, operationContext.eventContext);
            stateAfterOperation = await this.performOperationAndChildren(child, operationContext, currentState);
            currentState = { ...currentState, ...stateAfterOperation };
        }

        return currentState;
    }


    private getKeyStrategyFor(event: any, context: EventContext): IKeyStrategy {
        const keyStrategy = this.keyStrategies.find(_ => _.has(event, context));
        this.throwIfUnableToResolveKey(keyStrategy, event, context);
        return keyStrategy!;
    }

    private throwIfUnableToResolveKey(keyStrategy: IKeyStrategy | undefined, event: any, context: EventContext) {
        if (!keyStrategy) {
            throw new UnableToResolveKeyForEvent(event, context);
        }
    }
}
