// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { ProjectionDefinition, ProjectionDefinitionModel } from './ProjectionDefinition';

import { GraphQLJSON } from 'graphql-scalars';

@injectable()
@Resolver()
export class ProjectionQueries {

    @Query(() => [ProjectionDefinition])
    async allProjections() {
        return ProjectionDefinitionModel.find().exec();
    }

    @Query(() => GraphQLJSON)
    async stuff() {
        return ProjectionDefinitionModel.find().exec();
    }
}

