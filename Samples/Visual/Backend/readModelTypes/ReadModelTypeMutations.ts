// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ReadModelTypeDefinitionModel } from './ReadModelTypeDefinition';
import { ReadModelTypeDefinitionForWriting } from './ReadModelTypeDefinitionForWriting';
import { Guid } from '@dolittle/rudiments';

@injectable()
@Resolver()
export class ReadModelTypeMutations {

    @Mutation(() => Boolean)
    async writeReadModelDefinition(@Arg('input') input: ReadModelTypeDefinitionForWriting): Promise<boolean> {
        await ReadModelTypeDefinitionModel.updateOne({ _id: input.id }, {
            name: input.name,
            properties: input.properties
        }, { upsert: true });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteReadModelDefinition(@Arg('id') id: string): Promise<boolean> {
        await ReadModelTypeDefinitionModel.deleteOne({ _id: Guid.parse(id) });
        return true;
    }
}
