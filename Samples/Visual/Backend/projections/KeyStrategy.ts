// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { prop, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { KeyStrategyType } from './KeyStrategyType';


@ObjectType()
@InputType('KeyStrategyInput')
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class KeyStrategy {
    @Field()
    @prop()
    type!: KeyStrategyType;

    @Field()
    @prop()
    property!: string;
}
