// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { EventContext } from '@dolittle/sdk.events';
import { PropertyAccessor } from '../Properties';
import { IKeyStrategy } from './IKeyStrategy';


export class PropertyKeyStrategy implements IKeyStrategy {

    constructor(private readonly _property: PropertyAccessor) {
    }

    has(event: any, eventContext: EventContext): boolean {
        return this._property.isValueSet(event);
    }

    get(event: any, eventContext: EventContext): any {
        return this._property.get(event);
    }
}
