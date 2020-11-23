// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyDescriptor } from '../../SDK/KeyStrategyDescriptor';
import { IKeyStrategy } from './IKeyStrategy';
import { EventSourceKeyStrategy } from './EventSourceKeyStrategy';
import { PropertyKeyStrategy } from './PropertyKeyStrategy';
import { UnknownKeyStrategy } from './UnknownKeyStrategy';
import { NullKeyStrategy } from './NullKeyStrategy';
import KeyStrategyTypes from '../../KeyStrategyTypes';
import { PropertyAccessor, PropertyPath } from '../Properties';

export class KeyStrategiesConverter {
    static toKeyStrategies(keyStrategies: KeyStrategyDescriptor[]): IKeyStrategy[] {
        return keyStrategies.map(this.toKeyStrategy);
    }

    static toKeyStrategy(keyStrategy: KeyStrategyDescriptor): IKeyStrategy {
        switch (keyStrategy.id) {
            case KeyStrategyTypes.NotSet: {
                return new NullKeyStrategy();
            };

            case KeyStrategyTypes.EventSourceIdentifier: {
                return new EventSourceKeyStrategy();
            };
            case KeyStrategyTypes.Property: {
                return new PropertyKeyStrategy(new PropertyAccessor(new PropertyPath(keyStrategy.configuration)));
            }
        }

        throw new UnknownKeyStrategy(keyStrategy.id);
    }
}