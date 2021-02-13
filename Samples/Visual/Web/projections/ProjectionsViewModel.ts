// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import gql from 'graphql-tag';
import { Projection } from './Projection';
import { Guid } from '@dolittle/rudiments';
import { KeyStrategy } from './KeyStrategy';
import { FieldType } from '../common/FieldType';
import { FieldDefinition } from '../common/FieldDefinition';

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

    async addProjection(name: string, modelName: string) {
        const projection = new Projection();
        projection.id = Guid.create();
        projection.keyStrategies = [new KeyStrategy()];
        projection.name = name;
        projection.modelName = modelName;
        projection.readModelType = {
            id: Guid.create(),
            name: '',
            fields: []
        };

        this.projections = [...this.projections, projection];
    }

    async addField(projection: Projection, name: string, type: FieldType) {
        const field: FieldDefinition = { name, type };
        projection.readModelType.fields = [...projection.readModelType.fields, field];
        this.projections = [...this.projections];
    }
}