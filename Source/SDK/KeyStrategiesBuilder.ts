// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import KeyStrategyTypes from '../KeyStrategyTypes';
import { KeyStrategyDescriptor } from './KeyStrategyDescriptor';

export type KeyStrategiesBuilderCallback = (builder: KeyStrategiesBuilder) => void;

export class KeyStrategiesBuilder {
    private _strategies: KeyStrategyDescriptor[] = [];
    private _defaultKeyStrategy: KeyStrategyDescriptor = new KeyStrategyDescriptor(KeyStrategyTypes.EventSourceIdentifier);

    usingProperty(propertyPath: string): KeyStrategiesBuilder {
        this._strategies.push(new KeyStrategyDescriptor(KeyStrategyTypes.Property, propertyPath));
        return this;
    }

    usingEventSourceId(): KeyStrategiesBuilder {
        this._strategies.push(new KeyStrategyDescriptor(KeyStrategyTypes.EventSourceIdentifier));
        return this;
    }

    build(): KeyStrategyDescriptor[] {
        if (this._strategies.length === 0) {
            return [this._defaultKeyStrategy];
        }
        return this._strategies;
    }
}
