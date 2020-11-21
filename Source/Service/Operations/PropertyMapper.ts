// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IChildOperation } from '../IChildOperation';
import { IOperationContext } from '../IOperationContext';
import { PropertyAccessor } from '../PropertyAccessor';

export class PropertyMapper implements IChildOperation {
    constructor(private readonly targetProperty: PropertyAccessor, private readonly sourceProperty: PropertyAccessor, readonly children: IChildOperation[]) {
    }

    perform(context: IOperationContext) {
        const changes = {};

        return context.model;

        /*
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
        */
    }
}
