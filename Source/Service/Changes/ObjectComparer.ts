// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import deepEqual from 'deep-equal';
import { IObjectComparer } from './IObjectComparer';
import { PropertyAccessor, PropertyPath } from '../Properties';
import { PropertySet } from './PropertySet';
import { DateTime } from 'luxon';

export class ObjectComparer implements IObjectComparer {
    compare(existingState: any, newState: any): PropertySet[] {
        if (this.areEqual(existingState, newState)) {
            return [];
        }

        const changes: PropertySet[] = [];

        const collectChangesFor = (current: any, incoming: any, parentPropertyPath: string = '') => {
            const keys = Object.keys(incoming);
            for (const property of keys) {
                const propertyPath = parentPropertyPath.length > 0 ? `${parentPropertyPath}.${property}` : property;

                if (current[property] !== incoming[property]) {
                    changes.push(new PropertySet(new PropertyAccessor(new PropertyPath(propertyPath)), incoming[property]));
                }

                const incomingValue = incoming[property];
                const deepCompare = !(incomingValue instanceof DateTime);
                if (incomingValue instanceof Object && deepCompare) {
                    collectChangesFor(current[property] || {}, incoming[property], propertyPath);
                }
            }
        };

        collectChangesFor(existingState, newState);
        return changes;
    }

    areEqual(left: any, right: any): boolean {
        return deepEqual(left, right);
    }
}
