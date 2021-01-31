// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IDialogProps } from '@dolittle/vanir-react';
import { EventInstanceEditorDialogInput } from './EventInstanceEditorDialogInput';
import { EventInstanceEditorDialogOutput } from './EventInstanceEditorDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { PropertyValue } from './PropertyValue';
import { EventTypeDefinition } from '../eventTypes/EventTypeDefinition';
import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { AllEventTypeDefinitionsQuery } from '../eventTypes/AllEventTypeDefinitionsQuery';
import { injectable } from 'tsyringe';

@injectable()
export class EventInstanceEditorDialogViewModel {
    id: Guid = Guid.empty;
    eventType: Guid = Guid.empty;
    propertyValues: PropertyValue[] = [];

    eventTypes: EventTypeDefinition[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    selectEventType(eventType: EventTypeDefinition) {
        this.eventType = eventType.id;

        this.propertyValues = eventType.properties.map(_ => {
            return {
                name: _.name,
                value: ''
            };
        });
    }

    propsChanged(props: IDialogProps<EventInstanceEditorDialogInput, EventInstanceEditorDialogOutput>) {
        this.id = props.input?.definition?.id;
        this.eventType = props.input?.definition?.eventType;
        this.propertyValues = props.input?.definition?.propertyValues || [];
        this.eventTypes = props.input?.eventTypes || [];
    }

    addProperty() {
        this.propertyValues = [...this.propertyValues, ...[{
            name: 'New Property',
            value: ''
        }]];
    }
}