// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field } from 'type-graphql';
import { prop } from '@typegoose/typegoose';
import { Expression } from './Expression';

export class PropertyExpression extends Expression {
    @Field()
    @prop()
    path!: string;
}
