// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { AllReadModelTypeDefinitionsQuery } from './AllReadModelTypeDefinitionsQuery';
import { ReadModelTypeDefinition } from './ReadModelTypeDefinition';
import { injectable } from 'tsyringe';

@injectable()
export class ReadModelTypesViewModel {
    readModels: ReadModelTypeDefinition[] = [];

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
        this.readModels = result.data.allReadModels;
    }

    async saveReadModelTypeDefinition(definition: ReadModelTypeDefinition) {
        const mutation = gql`
            mutation SaveReadModelTypeDefinition($input: ReadModelTypeDefinitionInput!) {
                saveReadModelTypeDefinition(input: $input) 
            }`;

        const data = {
            input: {
                id: definition.id.toString(),
                name: definition.name,
                properties: definition.properties.map(_ => {
                    return {
                        name: _.name,
                        type: _.type
                    };
                })
            }
        };
        await this.dataSource.mutate({mutation, variables: data});
    }

    async deleteReadModelTypeDefinition(definition: ReadModelTypeDefinition) {
        const mutation = gql`
            mutation DeleteReadModelTypeDefinition($id: String!) {
                deleteReadModelDefinition(id: $id) 
            }`;

        const data = {
            id: definition.id.toString()
        };
        await this.dataSource.mutate({mutation, variables: data});
    }
}
