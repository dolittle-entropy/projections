// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType, InputType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Expression } from './Expression';
import { ExpressionUnion } from './ExpressionUnion';

@ObjectType()
@InputType('BinaryExpressionInput')
export class BinaryExpression extends Expression {
    @Field(() => ExpressionUnion)
    @prop()
    left!: Expression;

    @Field(() => ExpressionUnion)
    @prop()
    right!: Expression;
}
