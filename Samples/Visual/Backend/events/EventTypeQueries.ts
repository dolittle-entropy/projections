// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { EventTypeDefinition, EventTypeDefinitionModel } from './EventTypeDefinition';

@injectable()
@Resolver()
export class EventTypeQueries {

    @Query(() => [EventTypeDefinition])
    async allEventTypes() {
        return EventTypeDefinitionModel.find().exec();
    }
}

