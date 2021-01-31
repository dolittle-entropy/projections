// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg, InputType, Field } from 'type-graphql';
import { EventTypeDefinitionModel } from './EventTypeDefinition';
import { EventTypeDefinitionForWriting } from './EventTypeDefinitionForWriting';


@injectable()
@Resolver()
export class EventTypeMutations {

    @Mutation(() => Boolean)
    async writeEventTypeDefinition(@Arg('input') input: EventTypeDefinitionForWriting): Promise<boolean> {
        await EventTypeDefinitionModel.updateOne({ _id: input.id }, {
            name: input.name,
            properties: input.properties
        }, { upsert: true });

        return true;
    }
}