// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expressions/Expression';
import { KeyStrategyDescriptor } from './KeyStrategyDescriptor';

export type KeyStrategiesBuilderCallback = (builder: KeyStrategiesBuilder) => void;

export class KeyStrategiesBuilder {
    private _strategies: KeyStrategyDescriptor[] = [];

    usingProperty(propertyPath: string): KeyStrategiesBuilder {
        this._strategies.push(KeyStrategyDescriptor.fromProperty(`event.${propertyPath}`));
        return this;
    }

    usingEventSourceId(): KeyStrategiesBuilder {
        this._strategies.push(KeyStrategyDescriptor.fromEventSourceId());
        return this;
    }

    build(): KeyStrategyDescriptor[] {
        if (this._strategies.length === 0) {
            return [KeyStrategyDescriptor.fromEventSourceId()];
        }
        return this._strategies;
    }
}
