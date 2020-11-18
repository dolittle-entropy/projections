// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperation } from './IOperation';
import { Constructor, PropertyAccessorDescriptor } from '@dolittle/types';
import { IOperationContext } from './IOperationContext';

export class PropertyMapper<TDocument extends object = any> implements IOperation {
    readonly eventTypes: Constructor[];
    readonly subOperations: IOperation[] = [];
    readonly composite: boolean = false;

    constructor(eventType: Constructor,
        private readonly _targetProperty: PropertyAccessorDescriptor,
        private readonly _sourceProperty: PropertyAccessorDescriptor) {
        this.eventTypes = [eventType];
    }

    perform(context: IOperationContext) {
        for (const event of context.events) {
            const value = this._sourceProperty.accessor(event);

            let current = context.model;
            this._targetProperty.segments.forEach((segment: string, index: number) => {
                if (index !== this._sourceProperty.segments.length - 1) {
                    current[segment] = current[segment] || {};
                } else {
                    current[segment] = value;
                }

                current = current[segment];
            });

            return context.model;
        }
    }
}
