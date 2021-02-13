// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IDialogProps } from '@dolittle/vanir-react';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { FieldDefinition } from '../common/FieldDefinition';
import { FieldType } from '../common/FieldType';

export class EventEditorDialogViewModel {
    id: Guid = Guid.empty;
    name: string = '';
    fields: FieldDefinition[] = [];

    propsChanged(props: IDialogProps<EventEditorDialogInput, EventEditorDialogOutput>) {
        this.id = props.input?.definition?.id;
        this.name = props.input?.definition?.name;
        this.fields = props.input?.definition?.properties;
    }

    addField() {
        this.fields = [...this.fields, ...[{
            name: '',
            type: FieldType.string
        }]];
    }
}