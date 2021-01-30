// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyDescriptor } from '../../SDK/KeyStrategyDescriptor';
import { IKeyStrategy } from './IKeyStrategy';

export class KeyStrategiesConverter {
    static toKeyStrategies(keyStrategies: KeyStrategyDescriptor[]): IKeyStrategy[] {
        return keyStrategies.map(this.toKeyStrategy);
    }

    static toKeyStrategy(keyStrategy: KeyStrategyDescriptor): IKeyStrategy {
        throw new Error('Not implemented');
    }
}