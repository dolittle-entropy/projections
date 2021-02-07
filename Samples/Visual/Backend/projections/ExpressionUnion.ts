// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createUnionType } from 'type-graphql';
import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyExpression } from './PropertyExpression';

export const ExpressionUnion = createUnionType({
    name: 'Expression',
    types: () => [BinaryExpression, PropertyExpression, ConstantExpression] as const
});