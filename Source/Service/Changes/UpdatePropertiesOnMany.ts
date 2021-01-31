// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { PropertyAccessor } from '../Properties';
import { Change } from './Change';
import { PropertySet } from './PropertySet';

export class UpdatePropertiesOnMany extends Change {
    constructor(readonly property: PropertyAccessor, readonly key: any, readonly properties: PropertySet[], readonly targetState: IState) {
        super();
    }

    async apply(model: any, state: IState): Promise<void> {
        const propertyValues = {};
        this.properties.forEach(_ => _.apply(propertyValues, state));
        await this.targetState.setMany(this.property, this.key, propertyValues);
    }

    toString() {
        return `Update on relation property '${this.property.path}' with key '${this.key}' with properties {${this.properties.join(', ')}}`;
    }
}
