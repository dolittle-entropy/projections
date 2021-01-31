// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { AllEventTypeDefinitionsQuery } from './AllEventTypeDefinitionsQuery';
import { EventTypeDefinition } from './EventTypeDefinition';
import { injectable } from 'tsyringe';

@injectable()
export class EventsViewModel {
    eventTypes: EventTypeDefinition[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    async attached() {
        await this.populate();
    }

    async populate() {
        const query = gql`
            query {
                allEventTypes {
                    id
                    name
                    properties {
                        name
                        type
                    }
                }
            }        
        `;

        const result = await this.dataSource.query<AllEventTypeDefinitionsQuery>({ query, fetchPolicy: 'no-cache' });
        this.eventTypes = result.data.allEventTypes;
        console.log(this.eventTypes);
    }

    async writeEventTypeDefinition(definition: EventTypeDefinition) {
        const mutation = gql`
            mutation WriteEventTypeDefinition($input: EventTypeDefinitionForWriting!) {
                writeEventTypeDefinition(input: $input) 
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
}