// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IDialogProps } from '@dolittle/vanir-react';
import { EventInstanceEditorDialogInput } from './EventInstanceEditorDialogInput';
import { EventInstanceEditorDialogOutput } from './EventInstanceEditorDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { FieldValue } from './FieldValue';
import { EventTypeDefinition } from '../eventTypes/EventTypeDefinition';
import { DataSource } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';

@injectable()
export class EventInstanceEditorDialogViewModel {
    id: Guid = Guid.empty;
    name: string = '';
    eventType: Guid = Guid.empty;
    fieldValues: FieldValue[] = [];

    eventTypes: EventTypeDefinition[] = [];

    constructor(private readonly dataSource: DataSource) {

    }

    selectEventType(eventType: EventTypeDefinition) {
        this.eventType = eventType.id;

        this.fieldValues = eventType.properties.map(_ => {
            return {
                name: _.name,
                value: ''
            };
        });
    }

    propsChanged(props: IDialogProps<EventInstanceEditorDialogInput, EventInstanceEditorDialogOutput>) {
        this.id = props.input?.definition?.id;
        this.name = props.input?.definition?.name;
        this.eventType = props.input?.definition?.eventType;
        this.fieldValues = props.input?.definition?.propertyValues || [];
        this.eventTypes = props.input?.eventTypes || [];
    }

    addProperty() {
        this.fieldValues = [...this.fieldValues, ...[{
            name: '',
            value: ''
        }]];
    }
}