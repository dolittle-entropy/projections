// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from './Expression';
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
import { PropertyAccessor, PropertyPath } from '../Properties';
import { AndExpression } from './AndExpression';
import { OrExpression } from './OrExpression';
import { NoOpExpression } from './NoOpExpression';
import { ConcatExpression } from './ConcatExpression';

declare module '@dolittle/projections/Service/Expressions/Expression' {
    namespace Expression {
        export function property(path: string): PropertyExpression;
        export function constant(value: any): ConstantExpression;
        export function assign(left: PropertyExpression, right: Expression): AssignExpression;
        export function add(left: Expression, right: Expression): AddExpression;
        export function subtract(left: Expression, right: Expression): SubtractExpression;
        export function equal(left: Expression, right: Expression): EqualExpression;
        export function notEqual(left: Expression, right: Expression): NotEqualExpression;
        export function greaterThan(left: Expression, right: Expression): GreaterThanExpression;
        export function greaterThanOrEqual(left: Expression, right: Expression): GreaterThanOrEqualExpression;
        export function lessThan(left: Expression, right: Expression): LessThanExpression;
        export function lessThanOrEqual(left: Expression, right: Expression): LessThanOrEqualExpression;
        export function and(left: Expression, right: Expression): AndExpression;
        export function or(left: Expression, right: Expression): OrExpression;
        export function concat(left: Expression, right: Expression): ConcatExpression;
        export function noOp(): NoOpExpression;
    }
}

Expression.property = function (path: string): PropertyExpression {
    return new PropertyExpression(new PropertyAccessor(new PropertyPath(path)));
};

Expression.constant = function (value: any): ConstantExpression {
    return new ConstantExpression(value);
};

Expression.assign = function (left: PropertyExpression, right: Expression): AssignExpression {
    return new AssignExpression(left, right);
};

Expression.add = function (left: Expression, right: Expression): AddExpression {
    return new AddExpression(left, right);
};

Expression.subtract = function (left: Expression, right: Expression): SubtractExpression {
    return new SubtractExpression(left, right);
};

Expression.equal = function (left: Expression, right: Expression): EqualExpression {
    return new EqualExpression(left, right);
};

Expression.notEqual = function (left: Expression, right: Expression): NotEqualExpression {
    return new NotEqualExpression(left, right);
};

Expression.greaterThan = function (left: Expression, right: Expression): GreaterThanExpression {
    return new GreaterThanExpression(left, right);
};

Expression.greaterThanOrEqual = function (left: Expression, right: Expression): GreaterThanOrEqualExpression {
    return new GreaterThanOrEqualExpression(left, right);
};

Expression.lessThan = function (left: Expression, right: Expression): LessThanExpression {
    return new LessThanExpression(left, right);
};

Expression.lessThanOrEqual = function (left: Expression, right: Expression): LessThanOrEqualExpression {
    return new LessThanOrEqualExpression(left, right);
};

Expression.and = function (left: Expression, right: Expression): AndExpression {
    return new AndExpression(left, right);
};

Expression.or = function (left: Expression, right: Expression): OrExpression {
    return new OrExpression(left, right);
};

Expression.concat = function (left: Expression, right: Expression): OrExpression {
    return new ConcatExpression(left, right);
};

Expression.noOp = function () {
    return new NoOpExpression();
};