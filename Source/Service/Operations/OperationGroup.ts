// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import deepEqual from 'deep-equal';
import { Logger } from 'winston';

import { EventContext, EventTypeId, StreamId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';
import { IOperationGroup } from './IOperationGroup';
import { IState } from '../IState';
import { OperationContext } from './OperationContext';
import { IBaseOperation } from './IBaseOperation';
import { IKeyStrategy } from '../Keys';
import { UnableToResolveKeyForEvent } from './UnableToResolveKeyForEvent';
import { OperationDataContext } from './OperationDataContext';
import { IOperationDataContext } from './IOperationDataContext';
import { IOperationContext } from './IOperationContext';

export class OperationGroup implements IOperationGroup {
    private readonly _operationsByEventType: Map<EventTypeId, IOperation[]> = new Map();

    constructor(
        readonly name: string,
        readonly stream: StreamId,
        readonly keyStrategies: IKeyStrategy[],
        readonly operations: IOperation[],
        readonly children: IOperationGroup[],
        readonly state: IState,
        private readonly _logger: Logger) {

        for (const operation of operations) {
            for (const eventType of operation.eventTypes) {
                const operations = this._operationsByEventType.get(eventType) || [];
                this._operationsByEventType.set(eventType, [...operations, operation]);
            }
        }
    }

    async handle(eventType: EventTypeId, event: any, context: EventContext, parentGroup?: IOperationGroup): Promise<void> {
        try {
            let currentState: any = {};
            const stateToSet: Map<any, any> = new Map();

            if (this._operationsByEventType.has(eventType)) {
                for (const operation of this._operationsByEventType.get(eventType)!) {
                    let dataContext = new OperationDataContext({}, event, context);
                    let key: any;
                    if (operation.keyStrategy.has(dataContext)) {
                        key = operation.keyStrategy.get(dataContext);
                    }

                    if (!key) {
                        const keyStrategy = this.getKeyStrategyFor(dataContext);
                        key = keyStrategy.get(dataContext);
                    }

                    const initial = await this.state.get(key) || {};
                    dataContext = new OperationDataContext(initial, event, context);
                    const operationContext = new OperationContext(key, dataContext, this, parentGroup);
                    const modifiedState = await this.performOperationAndChildren(operation, dataContext, operationContext, initial);
                    currentState = { ...currentState, ...modifiedState };

                    if (!deepEqual(initial, currentState)) {
                        stateToSet.set(key, currentState);
                    }
                }
            }

            for (const childGroup of this.children) {
                await childGroup.handle(eventType, event, context, this);
            }

            for (const [key, state] of stateToSet) {
                await this.state.set(key, state);
            }
        } catch (ex) {
            this._logger.error(`Couldn't handle event of type '${eventType.toString()}' in projection '${this.stream.toString()}'`, ex);
            throw ex;
        }
    }

    private async performOperationAndChildren(operation: IBaseOperation, dataContext: IOperationDataContext, operationContext: IOperationContext, currentState: any): Promise<any> {
        let stateAfterOperation = await operation.perform(operationContext);
        currentState = { ...currentState, ...stateAfterOperation };

        for (const child of operation.children) {
            dataContext = new OperationDataContext(currentState, dataContext.event, dataContext.eventContext);
            operationContext = new OperationContext(
                operationContext.key,
                dataContext,
                operationContext.group,
                operationContext.parentGroup);
            stateAfterOperation = await this.performOperationAndChildren(child, dataContext, operationContext, currentState);
            currentState = { ...currentState, ...stateAfterOperation };
        }

        return currentState;
    }

    private getKeyStrategyFor(dataContext: IOperationDataContext): IKeyStrategy {
        const keyStrategy = this.keyStrategies.find(_ => _.has(dataContext));
        this.throwIfUnableToResolveKey(keyStrategy, dataContext);
        return keyStrategy!;
    }

    private throwIfUnableToResolveKey(keyStrategy: IKeyStrategy | undefined, dataContext: IOperationDataContext) {
        if (!keyStrategy) {
            throw new UnableToResolveKeyForEvent(dataContext);
        }
    }
}
