// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expressions';

export class KeyStrategyDescriptor {
    constructor(readonly expression: Expression) {
    }

    static fromProperty(path: string): KeyStrategyDescriptor {
        return new KeyStrategyDescriptor(Expression.property(path));
    }

    static fromEventSourceId(): KeyStrategyDescriptor {
        return new KeyStrategyDescriptor(Expression.property('eventContext.eventSourceId'));
    }
}
