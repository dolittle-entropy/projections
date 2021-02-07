// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop } from '@typegoose/typegoose';
import { Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { Operation } from './Operation';


export class JoinEvent extends Operation {
    @Field()
    @prop()
    onKey!: string;

    @Field()
    @prop()
    key!: string;

    @Field()
    @guid()
    eventType!: Guid;
}
