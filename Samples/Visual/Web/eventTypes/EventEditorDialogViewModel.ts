// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IDialogProps } from '@dolittle/vanir-react';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { PropertyDefinition } from '../common/PropertyDefinition';
import { PropertyType } from '../common/PropertyType';

export class EventEditorDialogViewModel {
    id: Guid = Guid.empty;
    name: string = '';
    properties: PropertyDefinition[] = [];

    propsChanged(props: IDialogProps<EventEditorDialogInput, EventEditorDialogOutput>) {
        this.id = props.input?.definition?.id;
        this.name = props.input?.definition?.name;
        this.properties = props.input?.definition?.properties;
    }

    addProperty() {
        this.properties = [...this.properties, ...[{
            name: '',
            type: PropertyType.string
        }]];
    }
}