// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { PropertyPath } from './PropertyPath';

/* eslint-disable no-eval */

export class PropertyAccessor {
    private _getter: (instance) => any;
    private _setter: (instance, value) => void;

    constructor(readonly path: PropertyPath) {
        this._getter = eval(`(instance) => { return instance.${path.path}; }`);
        this._setter = eval(`(instance, value) => { instance.${path.path} = value; }`);
    }

    get(instance: any): any {
        try {
            return this._getter(instance);
        } catch (ex) {
            return undefined;
        }
    }

    set(instance: any, value): void {
        this.ensureStructure(instance);
        this._setter(instance, value);
    }

    private ensureStructure(instance) {
        let currentInstance = instance;
        for (const segment of this.path.segments) {
            if (!currentInstance[segment]) {
                currentInstance[segment] = {};
            }
            currentInstance = currentInstance[segment];
        }
    }
}
