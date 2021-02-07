// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IDialogProps } from '@dolittle/vanir-react';
import { ReadModelTypeDialogInput } from './ReadModelTypeDialogInput';
import { ReadModelTypeDialogOutput } from './ReadModelTypeDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { PropertyDefinition } from '../common/PropertyDefinition';
import { PropertyType } from '../common/PropertyType';

export class ReadModelTypeDialogViewModel {
    id: Guid = Guid.empty;
    name: string = '';
    properties: PropertyDefinition[] = [];

    propsChanged(props: IDialogProps<ReadModelTypeDialogInput, ReadModelTypeDialogOutput>) {
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