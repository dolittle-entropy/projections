// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Changeset } from '../Changes';
import { Expression } from '../Expressions';
import { IKeyStrategy } from '../Keys';
import { PropertyAccessor, PropertyPath } from '../Properties';
import { IOperation } from './IOperation';
import { IOperationContext } from './IOperationContext';
import { UpdatePropertiesOnMany } from '../Changes/UpdatePropertiesOnMany';
import { Guid } from '@dolittle/rudiments';
import { EventSourceId } from '@dolittle/sdk.events';

export class PostJoinEvent implements IOperation {
    constructor(readonly filter: Expression, readonly keyStrategy: IKeyStrategy, readonly onProperty: PropertyAccessor, readonly children: IOperation[]) {
    }

    async perform(context: IOperationContext) {
        if (context.hasParentGroup) {
            let key = this.keyStrategy.get(context.dataContext);
            if (key instanceof Guid ||key instanceof EventSourceId) {
                key = key.toString();
            }
            const propertiesChanged = context.comparer.compare({}, context.dataContext.model);
            if (propertiesChanged.length > 0) {
                let actualOnProperty = this.onProperty;
                if (this.onProperty.path.path.indexOf('model.') === 0) {
                    actualOnProperty = new PropertyAccessor(new PropertyPath(this.onProperty.path.path.substr('model.'.length)));
                }
                return new Changeset([new UpdatePropertiesOnMany(actualOnProperty, key, propertiesChanged, context.parentGroup?.state || context.group.state)], context.dataContext.eventContext);
            }
        }

        return Changeset.noChanges(context.dataContext.eventContext);
    }
}


