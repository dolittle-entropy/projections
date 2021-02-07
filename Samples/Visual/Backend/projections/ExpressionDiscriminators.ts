// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BinaryExpression } from './BinaryExpression';
import { ConstantExpression } from './ConstantExpression';
import { PropertyExpression } from './PropertyExpression';

export const ExpressionDiscriminators = () => [BinaryExpression, ConstantExpression, PropertyExpression];