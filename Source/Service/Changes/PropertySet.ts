// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { PropertyAccessor } from '../Properties';
import { Change } from './Change';

export class PropertySet extends Change {
    constructor(readonly property: PropertyAccessor, readonly value: any) {
        super();
    }

    async apply(model: any, state: IState): Promise<void> {
        this.property.set(model, this.value);
    }

    toString() {
        return `'${this.property.path}'='${this.value}'`;
    }
}
