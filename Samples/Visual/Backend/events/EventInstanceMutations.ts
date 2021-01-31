// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { EventInstanceForWriting } from './EventInstanceForWriting';
import { EventInstanceModel } from './EventInstance';

@injectable()
@Resolver()
export class EventInstanceMutations {

    @Mutation(() => Boolean)
    async writeEventInstance(@Arg('input') input: EventInstanceForWriting): Promise<boolean> {
        await EventInstanceModel.updateOne({ _id: input.id }, {
            eventType: input.eventType,
            propertyValues: input.propertyValues
        }, { upsert: true });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteEventInstance(@Arg('id') id: string): Promise<boolean> {
        await EventInstanceModel.deleteOne({ _id: Guid.parse(id) });
        return true;
    }
}
