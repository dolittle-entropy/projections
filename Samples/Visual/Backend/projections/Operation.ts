// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop, modelOptions } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';

@ObjectType('OperationOutput')
@InputType('OperationInput')
@modelOptions({
    schemaOptions: {
        discriminatorKey: 'type'
    }
})
export class Operation {
    @Field()
    @prop({ required: true })
    type!: string;

    @Field()
    @guid()
    operationType!: Guid;
}

