// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { PropertyType } from './PropertyType';

@ObjectType()
@InputType('PropertyDefinitionInput')
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class PropertyDefinition {
    @Field()
    @prop()
    name!: string;

    @Field(() => PropertyType)
    @prop()
    type!: PropertyType;
}
