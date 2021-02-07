// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { AllEventInstancesQuery } from './AllEventInstancesQuery';
import { EventInstance } from './EventInstance';
import { injectable } from 'tsyringe';
import { EventTypeDefinition } from '../eventTypes/EventTypeDefinition';
import { AllEventTypeDefinitionsQuery } from '../eventTypes/AllEventTypeDefinitionsQuery';

@injectable()
export class EventsViewModel {
    eventInstances: EventInstance[] = [];
    eventTypes: EventTypeDefinition[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    async attached() {
        await this.populate();
        await this.populateEventTypes();
    }

    async populate() {
        const query = gql`
            query {
                allEventInstances {
                    id
                    name
                    eventType
                    propertyValues {
                        name
                        value
                    }
                }
            }        
        `;

        const result = await this.dataSource.query<AllEventInstancesQuery>({ query, fetchPolicy: 'no-cache' });
        this.eventInstances = result.data.allEventInstances;
    }

    async populateEventTypes() {
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
    }

    async commitEventInstance(instance: EventInstance) {
        const mutation = gql`
            mutation ($input: EventInstanceInput!) {
                commitEventInstance(input: $input) 
            }`;

        const data = {
            input: {
                id: instance.id.toString(),
                name: instance.name,
                eventType: instance.eventType,
                propertyValues: instance.propertyValues.map(_ => {
                    return {
                        name: _.name,
                        value: _.value
                    };
                })
            }
        };
        await this.dataSource.mutate({mutation, variables: data});

    }


    async writeEventInstance(instance: EventInstance) {
        const mutation = gql`
            mutation ($id: GuidScalar!, $input: EventInstanceInput!) {
                writeEventInstance(id: $id, input: $input) 
            }`;

        const data = {
            id: instance.id.toString(),
            input: {
                id: instance.id.toString(),
                name: instance.name,
                eventType: instance.eventType,
                propertyValues: instance.propertyValues.map(_ => {
                    return {
                        name: _.name,
                        value: _.value
                    };
                })
            }
        };
        await this.dataSource.mutate({mutation, variables: data});
    }

    async deleteEventInstance(instance: EventInstance) {
        const mutation = gql`
            mutation DeleteEventInstance($id: GuidScalar!) {
                deleteEventInstance(id: $id) 
            }`;

        const data = {
            id: instance.id.toString()
        };
        await this.dataSource.mutate({mutation, variables: data});
    }
}
