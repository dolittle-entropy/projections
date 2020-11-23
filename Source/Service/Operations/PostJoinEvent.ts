// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventTypeId } from '@dolittle/sdk.events';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor } from '../Properties';
import { IChildOperation } from './IChildOperation';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';

export class PostJoinEvent implements IOperation {
    constructor(readonly eventTypes: EventTypeId[], readonly keyStrategy: IKeyStrategy, readonly onProperty: PropertyAccessor, readonly children: IChildOperation[]) {
    }

    perform(context: IOperationContext) {
        if (context.hasParentGroup) {
            const key = this.keyStrategy.get(context.event, context.eventContext);
            const valuesToUpdate = { ...context.model };
            delete valuesToUpdate._id;
            context.parentGroup?.state.setMany(this.onProperty, key, valuesToUpdate);
        }

        return context.model;
    }
}
