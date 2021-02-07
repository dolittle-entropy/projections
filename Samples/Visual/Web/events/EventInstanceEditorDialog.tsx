// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { EventInstanceEditorDialogViewModel } from './EventInstanceEditorDialogViewModel';
import { DefaultButton, DetailsList, Dialog, DialogFooter, DialogType, Dropdown, IColumn, IconButton, IDialogContentProps, IDropdownOption, PrimaryButton, SelectionMode, Stack, TextField } from '@fluentui/react';
import { EventInstanceEditorDialogInput } from './EventInstanceEditorDialogInput';
import { EventInstanceEditorDialogOutput } from './EventInstanceEditorDialogOutput';
import { PropertyType } from '../common/PropertyType';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Event Instance',
    closeButtonAriaLabel: 'Close'
};

const propertyTypeOptions: IDropdownOption[] = [
    { key: PropertyType.number, text: 'Number' },
    { key: PropertyType.boolean, text: 'Boolean' },
    { key: PropertyType.string, text: 'String' },
    { key: PropertyType.date, text: 'Date' }
];


export const EventInstanceEditorDialog = withViewModel<EventInstanceEditorDialogViewModel, IDialogProps<EventInstanceEditorDialogInput, EventInstanceEditorDialogOutput>>(EventInstanceEditorDialogViewModel, ({ viewModel, props }) => {
    const columns: IColumn[] = [
        {
            key: 'Name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 150,
            maxWidth: 150
        },
        {
            key: 'Value',
            name: 'Value',
            fieldName: 'value',
            minWidth: 200,
            onRender: (item, index, column) => <TextField placeholder="Property value" defaultValue={item.value} onChange={(e, nv) => item.value = nv} />
        }
    ];

    const done = () => {
        props.onClose(DialogResult.Success, {
            definition: {
                id: viewModel.id,
                name: viewModel.name,
                eventType: viewModel.eventType,
                propertyValues: viewModel.propertyValues
            }
        });
    };

    function cancel() {
        props.onClose(DialogResult.Cancelled);
    }

    const eventTypeOptions = viewModel.eventTypes.map(_ => {
        const option: IDropdownOption = {
            key: _.id.toString(),
            text: _.name,
            data: _
        };
        return option;
    });

    return (
        <Dialog
            minWidth={600}
            hidden={!props.visible}
            onDismiss={done}
            dialogContentProps={dialogContentProps}>

            <Stack>
                <TextField label="Name" placeholder="Event instance name" defaultValue={viewModel.name} onChange={(e, nv) => viewModel.name = nv!}/>
                <Dropdown label="Type" defaultSelectedKey={viewModel.eventType?.toString()} options={eventTypeOptions} onChange={(e, nv) => viewModel.selectEventType(nv!.data)}/>
                <DetailsList columns={columns} items={viewModel.propertyValues} selectionMode={SelectionMode.none} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
});