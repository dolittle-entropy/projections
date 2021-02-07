// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { ReadModelTypeDefinition, ReadModelTypeDefinitionModel } from './ReadModelTypeDefinition';

@injectable()
@Resolver()
export class ReadModelTypeQueries {

    @Query(() => [ReadModelTypeDefinition])
    async allReadModels() {
        return ReadModelTypeDefinitionModel.find().exec();
    }
}

