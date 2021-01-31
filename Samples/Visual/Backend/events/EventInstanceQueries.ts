// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { EventInstance, EventInstanceModel } from './EventInstance';

@injectable()
@Resolver()
export class EventInstanceQueries {

    @Query(() => [EventInstance])
    async allEventInstances() {
        return EventInstanceModel.find().exec();
    }
}
