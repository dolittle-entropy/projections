// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { EventEditorDialogViewModel } from './EventEditorDialogViewModel';
import { DetailsList, Dialog, DialogFooter, DialogType, Dropdown, IColumn, IconButton, IDropdownOption, PrimaryButton, SelectionMode, Stack, TextField } from '@fluentui/react';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { PropertyType } from './PropertyType';

const dialogContentProps = {
    type: DialogType.normal,
    title: 'Event',
    closeButtonAriaLabel: 'Close'
};

const propertyTypeOptions: IDropdownOption[] = [
    { key: PropertyType.number, text: 'Number' },
    { key: PropertyType.boolean, text: 'Boolean' },
    { key: PropertyType.string, text: 'String' },
    { key: PropertyType.date, text: 'Date' }
];


export const EventEditorDialog = withViewModel<EventEditorDialogViewModel, IDialogProps<EventEditorDialogInput, EventEditorDialogOutput>>(EventEditorDialogViewModel, ({ viewModel, props }) => {
    const columns: IColumn[] = [
        {
            key: 'Name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 50,
            onRender: (item, index, column) => <TextField defaultValue={item.name} onChange={(e, nv) => item.name = nv} />
        },
        {
            key: 'Type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 50,
            onRender: (item, index, column) => <Dropdown defaultValue={item.type} options={propertyTypeOptions} onChange={(e, nv) => item.type = nv?.key} />
        }
    ];

    const close = () => {
        props.onClose(DialogResult.Success, {
            definition: {
                id: viewModel.id,
                name: viewModel.name,
                properties: viewModel.properties
            }
        });
    };

    return (
        <Dialog
            hidden={!props.visible}
            onDismiss={close}
            dialogContentProps={dialogContentProps}>

            <Stack>
                <TextField label="Name" defaultValue={viewModel.name} onChange={(e, nv) => viewModel.name = nv!} />
                <DetailsList columns={columns} items={viewModel.properties} selectionMode={SelectionMode.none} />
                <IconButton iconProps={{
                    iconName: 'CirclePlus'
                }} onClick={viewModel.addProperty} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={close} text="Close" />
            </DialogFooter>
        </Dialog>
    );
});