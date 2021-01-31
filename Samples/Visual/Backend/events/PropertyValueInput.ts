// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InputType, Field } from 'type-graphql';


@InputType()
export class PropertyValueInput {
    @Field()
    name!: string;

    @Field()
    value!: string;
}
