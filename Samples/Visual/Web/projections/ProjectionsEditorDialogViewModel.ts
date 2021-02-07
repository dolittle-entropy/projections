// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { PropertyValue } from '../events/PropertyValue';
import { AllReadModelTypeDefinitionsQuery } from '../readModelTypes/AllReadModelTypeDefinitionsQuery';
import { ReadModelTypeDefinition } from '../readModelTypes/ReadModelTypeDefinition';

@injectable()
export class ProjectionsEditorDialogViewModel {

    readModelTypes: ReadModelTypeDefinition[] = [];
    readModelType?: ReadModelTypeDefinition;
    readModelPropertyValues: PropertyValue[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    async attached() {
        await this.populate();
    }

    async populate() {
        const query = gql`
            query {
                allReadModels {
                    id
                    name
                    properties {
                        name
                        type
                    }
                }
            }        
        `;

        const result = await this.dataSource.query<AllReadModelTypeDefinitionsQuery>({ query, fetchPolicy: 'no-cache' });
        this.readModelTypes = result.data.allReadModels;
    }

    selectReadModelType(readModelType: ReadModelTypeDefinition) {
        this.readModelType = readModelType;
        this.readModelPropertyValues = readModelType.properties.map(_ => {
            return {
                name: _.name,
                value: ''
            };
        });
    }
}