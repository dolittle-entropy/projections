// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { PropertyValue } from './PropertyValue';

@ObjectType()
@InputType('EventInstanceInput', { description: 'Manipulates an event instance'})
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class EventInstance {
    @Field({ name: 'id' })
    @guid()
    _id!: Guid;

    @Field()
    @prop()
    name!: string;

    @Field()
    @guid()
    eventType!: Guid;

    @Field(() => [PropertyValue])
    @prop({ _id: false, type: PropertyValue })
    propertyValues!: PropertyValue[];
}

export const EventInstanceModel = getModelForClass(EventInstance);
