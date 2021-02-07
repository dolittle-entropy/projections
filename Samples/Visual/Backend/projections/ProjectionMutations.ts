// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { ProjectionDefinition, ProjectionDefinitionModel } from './ProjectionDefinition';
import { Guid } from '@dolittle/rudiments';
import { GraphQLJSON } from 'graphql-scalars';

@injectable()
@Resolver()
export class ProjectionMutations {

    @Mutation(() => Boolean)
    async saveProjectionDefinition(@Arg('id') id: Guid, @Arg('input', () => GraphQLJSON) input: any): Promise<boolean> {
        await ProjectionDefinitionModel.updateOne({ _id: id }, input, { upsert: true });
        return true;
    }

    @Mutation(() => Boolean)
    async deleteProjectionDefinition(@Arg('id') id: Guid): Promise<boolean> {
        await ProjectionDefinitionModel.deleteOne({ _id: id });
        return true;
    }
}
