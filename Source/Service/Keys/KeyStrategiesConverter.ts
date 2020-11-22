// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyDescriptor } from 'Source/SDK/KeyStrategyDescriptor';
import { IKeyStrategy } from './IKeyStrategy';
import KeyStrategyTypes from '../../KeyStrategyTypes';
import { EventSourceKeyStrategy } from './EventSourceKeyStrategy';
import { PropertyKeyStrategy } from './PropertyKeyStrategy';
import { UnknownKeyStrategy } from './UnknownKeyStrategy';

export class KeyStrategiesConverter {
    static getFor(keyStrategies: KeyStrategyDescriptor[]): IKeyStrategy[] {
        return keyStrategies.map(_ => {
            switch (_.id) {
                case KeyStrategyTypes.EventSourceIdentifier: {
                    return new EventSourceKeyStrategy();
                };
                case KeyStrategyTypes.Property: {
                    return new PropertyKeyStrategy(_.configuration);
                }
            }

            throw new UnknownKeyStrategy(_.id);
        });
    }
}