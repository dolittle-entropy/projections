// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { PropertyDefinitionInput } from './PropertyDefinitionInput';

@InputType({ description: 'Manipulates an Event Type definition to the system' })
export class EventTypeDefinitionForWriting {
    @Field()
    id!: Guid;

    @Field()
    name!: string;

    @Field(type => [PropertyDefinitionInput])
    properties!: PropertyDefinitionInput[];
}
