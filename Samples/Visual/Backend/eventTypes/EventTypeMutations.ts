// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { EventTypeDefinition, EventTypeDefinitionModel } from './EventTypeDefinition';
import { Guid } from '@dolittle/rudiments';

@injectable()
@Resolver()
export class EventTypeMutations {

    @Mutation(() => Boolean)
    async saveEventTypeDefinition(@Arg('input') input: EventTypeDefinition): Promise<boolean> {
        await EventTypeDefinitionModel.updateOne({ _id: input._id }, {
            name: input.name,
            properties: input.properties
        }, { upsert: true });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteEventTypeDefinition(@Arg('id') id: string): Promise<boolean> {
        await EventTypeDefinitionModel.deleteOne({ _id: Guid.parse(id) });
        return true;
    }
}
