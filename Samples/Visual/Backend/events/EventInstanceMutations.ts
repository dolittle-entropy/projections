// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { EventInstance, EventInstanceModel } from './EventInstance';
import { IEventStore } from '@dolittle/vanir-backend/dist/dolittle';

@injectable()
@Resolver()
export class EventInstanceMutations {

    constructor(private readonly _eventStore: IEventStore) {
    }

    @Mutation(() => Boolean)
    async writeEventInstance(@Arg('input') input: EventInstance): Promise<boolean> {
        console.log(input.name);

        await EventInstanceModel.updateOne({ _id: input._id }, {
            name: input.name,
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

    @Mutation(() => Boolean)
    async commitEventInstance(@Arg('input') input: EventInstance): Promise<boolean> {
        const event: any = {};

        for (const value of input.propertyValues) {
            event[value.name] = value.value;
        }

        await this._eventStore.commit(event, Guid.parse('68efff5d-8443-4181-adc2-d41ad75b94ef'), input.eventType);
        return true;
    }
}
