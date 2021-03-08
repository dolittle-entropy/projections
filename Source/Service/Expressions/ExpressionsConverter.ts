// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as Sdk from '../../SDK/Expressions';
import { Expression } from '../Expressions';
import { UnknownExpression } from './UnknownExpression';

export class ExpressionsConverter {

    static toExpression(expression: Sdk.Expression) {
        if (expression instanceof Sdk.AddExpression) {
            return Expression.add(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.AssignExpression) {
            return Expression.assign(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.ConstantExpression) {
            return Expression.constant((expression as Sdk.ConstantExpression).value);
        }

        if (expression instanceof Sdk.EqualExpression) {
            return Expression.equal(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.GreaterThanExpression) {
            return Expression.greaterThan(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.GreaterThanOrEqualExpression) {
            return Expression.greaterThanOrEqual(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.LessThanExpression) {
            return Expression.lessThan(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.LessThanOrEqualExpression) {
            return Expression.lessThanOrEqual(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.NotEqualExpression) {
            return Expression.notEqual(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.PropertyExpression) {
            return Expression.property((expression as Sdk.PropertyExpression).path);
        }

        if (expression instanceof Sdk.SubtractExpression) {
            return Expression.subtract(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.AndExpression) {
            return Expression.and(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.OrExpression) {
            return Expression.or(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.ConcatExpression) {
            return Expression.concat(
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).left),
                ExpressionsConverter.toExpression((expression as Sdk.BinaryExpression).right));
        }

        if (expression instanceof Sdk.NoOpExpression) {
            return Expression.noOp();
        }

        throw new UnknownExpression(expression);
    }
}
