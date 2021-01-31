// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, InputType } from 'type-graphql';
import { PropertyType } from './PropertyType';

@InputType()
export class PropertyDefinitionInput {
    @Field()
    name!: string;

    @Field()
    type!: PropertyType;
}
