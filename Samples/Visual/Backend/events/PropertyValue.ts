// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { prop, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';


@ObjectType()
@InputType('PropertyValueInput')
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class PropertyValue {
    @Field()
    @prop()
    name!: string;

    @Field()
    @prop()
    value!: string;
}
