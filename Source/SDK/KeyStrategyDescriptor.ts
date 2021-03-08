// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expressions';
export class KeyStrategyDescriptor {
    constructor(readonly expression: Expression) {
    }

    static fromConstant(key: string): KeyStrategyDescriptor {
        return new KeyStrategyDescriptor(Expression.constant(key));
    }

    static fromProperty(path: string): KeyStrategyDescriptor {
        return new KeyStrategyDescriptor(Expression.property(path));
    }

    static fromProperties(...paths: string[]): KeyStrategyDescriptor {
        let expression: Expression | undefined;

        for (const path of paths) {
            const propertyExpression = Expression.property(path);
            if (expression) {
                expression = Expression.concat(expression, Expression.concat(
                    Expression.constant('-'), propertyExpression)
                );
            } else {
                expression = propertyExpression;
            }
        }

        if (!expression) {
            expression = Expression.noOp();
        }

        return new KeyStrategyDescriptor(expression);
    }

    static fromEventSourceId(): KeyStrategyDescriptor {
        return new KeyStrategyDescriptor(Expression.property('eventContext.eventSourceId'));
    }
}
