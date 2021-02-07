// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InputType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { PropertyValueInput } from './PropertyValueInput';

@InputType({ description: 'Manipulates an event instance'})
export class EventInstanceForWriting {
    @Field({ name: 'id' })
    id!: Guid;

    @Field()
    name!: string;

    @Field()
    eventType!: Guid;

    @Field(() => [PropertyValueInput])
    propertyValues!: PropertyValueInput[];
}