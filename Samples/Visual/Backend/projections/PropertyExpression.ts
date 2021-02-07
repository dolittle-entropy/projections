// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, InputType, ObjectType } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Expression } from './Expression';

@ObjectType()
@InputType('PropertyExpressionInput')
export class PropertyExpression extends Expression {
    @Field()
    @prop()
    path!: string;
}
