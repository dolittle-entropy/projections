// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Field, ObjectType, InputType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Expression } from './Expression';

@ObjectType()
@InputType('ConstantExpressionInput')
export class ConstantExpression extends Expression {
    @Field()
    @prop()
    value!: string;
}
