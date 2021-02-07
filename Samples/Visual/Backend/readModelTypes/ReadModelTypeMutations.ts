// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ReadModelTypeDefinition, ReadModelTypeDefinitionModel } from './ReadModelTypeDefinition';
import { Guid } from '@dolittle/rudiments';

@injectable()
@Resolver()
export class ReadModelTypeMutations {

    @Mutation(() => Boolean)
    async saveReadModelTypeDefinition(@Arg('input') input: ReadModelTypeDefinition): Promise<boolean> {
        await ReadModelTypeDefinitionModel.updateOne({ _id: input._id }, {
            name: input.name,
            properties: input.properties
        }, { upsert: true });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteReadModelTypeDefinition(@Arg('id') id: string): Promise<boolean> {
        await ReadModelTypeDefinitionModel.deleteOne({ _id: Guid.parse(id) });
        return true;
    }
}
