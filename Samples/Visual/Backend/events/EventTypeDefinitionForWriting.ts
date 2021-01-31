// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Field, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { PropertyDefinitionInput } from './PropertyDefinitionInput';

@InputType({ description: 'Adds an Event Type definition to the system' })
export class EventTypeDefinitionForWriting {
    @Field()
    @guid()
    id!: Guid;

    @Field()
    name!: string;

    @Field(type => [PropertyDefinitionInput])
    properties!: PropertyDefinitionInput[];
}
