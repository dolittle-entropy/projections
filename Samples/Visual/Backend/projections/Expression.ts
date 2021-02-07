// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, ObjectType, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { modelOptions, prop } from '@typegoose/typegoose';

@ObjectType()
@InputType('ExpressionInput')
@modelOptions({
    schemaOptions: {
        discriminatorKey: 'type'
    }
})
export class Expression {
    @Field()
    @prop({ required: true })
    type!: string;

    @Field()
    @guid()
    expressionType!: Guid;
}
