// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Constructor } from '@dolittle/types';
import { EventContext, EventTypeId } from '@dolittle/sdk.events';

import { getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IOperation } from './IOperation';
import { IKeyStrategy } from './Keys/IKeyStrategy';
import { OperationContext } from './OperationContext';

export class Projection {
    private readonly _databaseModel: ModelType<any>;
    private readonly _operationsByEventType: Map<Constructor, IOperation[]> = new Map();

    constructor(readonly stream: Guid,
        private readonly _targetType: Constructor,
        private readonly _keyStrategy: IKeyStrategy,
        private readonly _operations: IOperation[],
        databaseModel?: ModelType<any>) {
        this._databaseModel = databaseModel || getModelForClass(_targetType);

        for (const operation of _operations) {
            for (const eventType of operation.eventTypes) {
                const operations = this._operationsByEventType.get(eventType) || [];
                this._operationsByEventType.set(eventType, [...operations, operation]);
            }
        }
    }

    async handle(event: any, context: EventContext) {
        try {
            const currentProjectionState = await this._databaseModel.findById(context.eventSourceId.value).exec();

            const currentState = currentProjectionState || {};

            if (this._operationsByEventType.has(event.constructor)) {
                const context = new OperationContext(this.stream, currentProjectionState, [event]);

                for (const operation of this._operationsByEventType.get(event.constructor)!) {
                    operation.perform(context);
                }
            }

            await this._databaseModel.updateOne({ _id: context.eventSourceId.value }, currentState, { upsert: true });

        } catch (ex) {
            console.log(ex);
        }
    }
}


