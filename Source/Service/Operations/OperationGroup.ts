// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Logger } from 'winston';

import { EventContext, EventTypeId, StreamId, EventSourceId } from '@dolittle/sdk.events';
import { IOperation } from './IOperation';
import { IOperationGroup } from './IOperationGroup';
import { IState } from '../IState';
import { OperationContext } from './OperationContext';
import { IKeyStrategy, KeyContext } from '../Keys';
import { UnableToResolveKeyForEvent } from './UnableToResolveKeyForEvent';
import { OperationDataContext } from './OperationDataContext';
import { IOperationDataContext } from './IOperationDataContext';
import { IOperationContext } from './IOperationContext';
import { IObjectComparer } from '../Changes/IObjectComparer';
import { Changeset } from '../Changes';
import { Guid } from '@dolittle/rudiments';

export class OperationGroup implements IOperationGroup {

    constructor(
        readonly name: string,
        readonly stream: StreamId,
        readonly keyStrategies: IKeyStrategy[],
        readonly operations: IOperation[],
        readonly children: IOperationGroup[],
        readonly state: IState,
        private readonly _objectComparer: IObjectComparer,
        private readonly _logger: Logger) {

    }

    async handle(eventType: EventTypeId, event: any, context: EventContext, parentGroup?: IOperationGroup): Promise<void> {
        try {
            const keyContext = new KeyContext(eventType, event, context) as IOperationDataContext;
            const operations = this.operations.filter(_ => _.filter.invoke(keyContext));

            for (const operation of operations) {
                const key = this.getKey(operation, keyContext);

                const initial = await this.state.get(key) || {};
                const dataContext = new OperationDataContext(initial, eventType, event, context);
                const operationContext = new OperationContext(this._objectComparer, key, dataContext, this, parentGroup);
                const changes = await this.performOperationAndChildren(operation, dataContext, operationContext, initial);

                if (changes.hasChanges) {
                    await changes.apply(key, initial, this.state);
                    this._logger.info('Changes');
                    for (const change of changes.changes) {
                        this._logger.info(change);
                    }
                }
            }

            for (const childGroup of this.children) {
                await childGroup.handle(eventType, event, context, this);
            }
        } catch (ex) {
            this._logger.error(`Couldn't handle event of type '${eventType.toString()}' in projection '${this.stream.toString()}'`, ex);
            throw ex;
        }
    }

    private getKey(operation: IOperation, keyContext: IOperationDataContext) {
        let key: any;
        if (operation.keyStrategy.has(keyContext)) {
            key = operation.keyStrategy.get(keyContext);
        }

        if (!key) {
            const keyStrategy = this.getKeyStrategyFor(keyContext);
            key = keyStrategy.get(keyContext);
        }

        if (key instanceof Guid || key instanceof EventSourceId) {
            key = key.toString();
        }
        return key;
    }

    private async performOperationAndChildren(operation: IOperation, dataContext: IOperationDataContext, operationContext: IOperationContext, currentState: any): Promise<Changeset> {
        let changes = await operation.perform(operationContext);

        for (const child of operation.children) {
            changes = changes.mergeWith(await this.performOperationAndChildren(child, dataContext, operationContext, currentState));
        }

        return changes;
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
