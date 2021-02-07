// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategyType } from './KeyStrategyType';

export class KeyStrategy {
    type: KeyStrategyType = KeyStrategyType.eventContext;
    property: string = 'eventSourceId';
}
