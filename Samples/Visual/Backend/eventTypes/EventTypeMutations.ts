// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { EventTypeDefinition, EventTypeDefinitionModel } from './EventTypeDefinition';
import { Guid } from '@dolittle/rudiments';
import { GuidScalar } from '@dolittle/vanir-backend/dist/data';

@injectable()
@Resolver()
export class EventTypeMutations {

    @Mutation(() => Boolean)
    async saveEventTypeDefinition(@Arg('id') id: Guid, @Arg('input') input: EventTypeDefinition): Promise<boolean> {
        await EventTypeDefinitionModel.updateOne({ _id: id }, input, { upsert: true });
        return true;
    }

    @Mutation(() => Boolean)
    async deleteEventTypeDefinition(@Arg('id') id: Guid): Promise<boolean> {
        await EventTypeDefinitionModel.deleteOne({ _id: id });
        return true;
    }
}
