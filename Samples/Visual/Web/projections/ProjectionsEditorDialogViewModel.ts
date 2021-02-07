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
import { ProjectionsEditorDialogInput } from './ProjectionsEditorDialogInput';
import { ProjectionsEditorDialogOutput } from './ProjectionsEditorDialogOutput';
import { IDialogProps } from '@dolittle/vanir-react';
import { KeyStrategy } from './KeyStrategy';

@injectable()
export class ProjectionsEditorDialogViewModel {

    id: Guid = Guid.empty;

    keyStrategies: KeyStrategy[] = [];

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

    propsChanged(props: IDialogProps<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>) {
        if (props.input?.projection) {
            this.id = props.input.projection.id;
            this.keyStrategies = props.input.projection.keyStrategies;
            this.operations = props.input.projection.operations;
            this.readModelType = props.input.projection.readModelType;
        }
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

    setKeyStrategies(strategies: KeyStrategy[]) {
        this.keyStrategies = strategies;
    }
}