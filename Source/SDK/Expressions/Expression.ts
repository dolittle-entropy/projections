// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from '../../ExpressionTypeId';
import { AssignExpression } from './AssignExpression';
import { AddExpression } from './AddExpression';
import { SubtractExpression } from './SubtractExpression';
import { PropertyExpression } from './PropertyExpression';
import { ConstantExpression } from './ConstantExpression';
import { EqualExpression } from './EqualExpression';
import { NotEqualExpression } from './NotEqualExpression';
import { GreaterThanExpression } from './GreaterThanExpression';
import { GreaterThanOrEqualExpression } from './GreaterThanOrEqualExpression';
import { LessThanExpression } from './LessThanExpression';
import { LessThanOrEqualExpression } from './LessThanOrEqualExpression';

export class Expression {
    constructor(readonly type: ExpressionTypeId) {
    }

    static property(path: string) {
        return new PropertyExpression(path);
    }

    static constant(value: any) {
        return new ConstantExpression(value);
    }

    static assign(left: Expression, right: Expression): Expression {
        return new AssignExpression(left, right);
    }

    static add(left: Expression, right: Expression): Expression {
        return new AddExpression(left, right);
    }

    static subtract(left: Expression, right: Expression): Expression {
        return new SubtractExpression(left, right);
    }

    static equal(left: Expression, right: Expression): Expression {
        return new EqualExpression(left, right);
    }

    static notEqual(left: Expression, right: Expression): Expression {
        return new NotEqualExpression(left, right);
    }

    static greaterThan(left: Expression, right: Expression): Expression {
        return new GreaterThanExpression(left, right);
    }

    static greaterThanOrEqual(left: Expression, right: Expression): Expression {
        return new GreaterThanOrEqualExpression(left, right);
    }

    static lessThan(left: Expression, right: Expression): Expression {
        return new LessThanExpression(left, right);
    }

    static lessThanOrEqual(left: Expression, right: Expression): Expression {
        return new LessThanOrEqualExpression(left, right);
    }
}



