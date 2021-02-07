// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { Query, Resolver } from 'type-graphql';
import { ProjectionDefinition, ProjectionDefinitionModel } from './ProjectionDefinition';

@injectable()
@Resolver()
export class ProjectionQueries {

    @Query(() => [ProjectionDefinition])
    async allProjections() {
        return ProjectionDefinitionModel.find().exec();
    }
}

