// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { PropertyDefinition } from '../common/PropertyDefinition';


@ObjectType()
@InputType('EventTypeDefinitionInput', { description: 'Manipulates an Event Type definition to the system' })
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class EventTypeDefinition {
    @Field({ name: 'id' })
    @guid()
    _id!: Guid;

    @Field()
    @prop()
    name!: string;

    @Field(() => [PropertyDefinition])
    @prop({ _id: false, type: PropertyDefinition })
    properties!: PropertyDefinition[];
}

export const EventTypeDefinitionModel = getModelForClass(EventTypeDefinition);