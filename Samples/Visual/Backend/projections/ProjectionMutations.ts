// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ProjectionDefinition, ProjectionDefinitionModel } from './ProjectionDefinition';
import { Guid } from '@dolittle/rudiments';

@injectable()
@Resolver()
export class ProjectionMutations {

    @Mutation(() => Boolean)
    async saveProjectionDefinition(@Arg('input') input: ProjectionDefinition): Promise<boolean> {
        await ProjectionDefinitionModel.updateOne({ _id: input._id }, {
            name: input.name,
        }, { upsert: true });

        return true;
    }

    @Mutation(() => Boolean)
    async deleteProjectionDefinition(@Arg('id') id: string): Promise<boolean> {
        await ProjectionDefinitionModel.deleteOne({ _id: Guid.parse(id) });
        return true;
    }
}
