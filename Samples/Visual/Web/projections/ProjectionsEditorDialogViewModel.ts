// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { PropertyValue } from '../events/PropertyValue';
import { AllReadModelTypeDefinitionsQuery } from '../readModelTypes/AllReadModelTypeDefinitionsQuery';
import { ReadModelTypeDefinition } from '../readModelTypes/ReadModelTypeDefinition';
import { Operation } from './operations/Operation';
import { Guid } from '@dolittle/rudiments';
import { EventTypeDefinition } from '../eventTypes/EventTypeDefinition';
import { AllEventTypeDefinitionsQuery } from '../eventTypes/AllEventTypeDefinitionsQuery';

@injectable()
export class ProjectionsEditorDialogViewModel {

    readModelTypes: ReadModelTypeDefinition[] = [];
    readModelType: ReadModelTypeDefinition = { id: Guid.empty, name: '', properties: [] };
    readModelPropertyValues: PropertyValue[] = [];
    eventTypes: EventTypeDefinition[] = [];

    operations: Operation[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    async attached() {
        await this.populateReadModelTypes();
        await this.populateEventTypes();
    }

    async populateReadModelTypes() {
        const query = gql`
            query {
                allReadModelTypes {
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
        this.readModelTypes = result.data.allReadModelTypes;
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


    selectReadModelType(readModelType: ReadModelTypeDefinition) {
        this.readModelType = readModelType;
        this.readModelPropertyValues = readModelType.properties.map(_ => {
            return {
                name: _.name,
                value: ''
            };
        });
    }

    addOperation(operation: Operation) {
        this.operations = [...this.operations, operation];
    }
}