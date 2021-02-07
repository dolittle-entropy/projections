// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import gql from 'graphql-tag';
import { Projection } from './Projection';

export type AllProjectionsQuery = {
    allProjections: Projection[];
};

@injectable()
export class ProjectionsViewModel {
    projections: Projection[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    async populate() {
        const query = gql`
            query {
                allProjections {
                    id
                    readModelType
                    keyStrategies {
                        type
                        property
                    }
                }
            }        
        `;

        const result = await this.dataSource.query<AllProjectionsQuery>({ query, fetchPolicy: 'no-cache' });
        this.projections = result.data.allProjections;
    }


}