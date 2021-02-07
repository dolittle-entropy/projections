// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Expression } from './Expression';

export class BinaryExpression extends Expression {
    @Field()
    @prop()
    left!: Expression;

    @Field()
    @prop()
    right!: Expression;
}
