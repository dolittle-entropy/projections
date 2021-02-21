// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { EventEditorDialogViewModel } from './EventEditorDialogViewModel';
import { DefaultButton, DetailsList, Dialog, DialogFooter, DialogType, Dropdown, IColumn, IconButton, IDialogContentProps, IDropdownOption, PrimaryButton, SelectionMode, Stack, TextField } from '@fluentui/react';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { FieldTypeDropdown } from '../components';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Business Moment Type',
    closeButtonAriaLabel: 'Close'
};

export const EventEditorDialog = withViewModel<EventEditorDialogViewModel, IDialogProps<EventEditorDialogInput, EventEditorDialogOutput>>(EventEditorDialogViewModel, ({ viewModel, props }) => {
    const columns: IColumn[] = [
        {
            key: 'Name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            onRender: (item, index, column) => <TextField placeholder="Field name" defaultValue={item.name} onChange={(e, nv) => item.name = nv} />
        },
        {
            key: 'Type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 100,
            onRender: (item, index, column) => <FieldTypeDropdown type={item.type} onChange={(type) => item.type = type}/>
        }
    ];

    const done = () => {
        props.onClose(DialogResult.Success, {
            definition: {
                id: viewModel.id,
                name: viewModel.name,
                properties: viewModel.fields
            }
        });
    };

    function cancel() {
        props.onClose(DialogResult.Cancelled);
    }

    return (
        <Dialog
            minWidth={600}
            hidden={!props.visible}
            onDismiss={done}
            dialogContentProps={dialogContentProps}>

            <Stack>
                <TextField label="Name" placeholder="Name of the event" defaultValue={viewModel.name} onChange={(e, nv) => viewModel.name = nv!} />
                <DetailsList columns={columns} items={viewModel.fields} selectionMode={SelectionMode.none} />
                <IconButton iconProps={{
                    iconName: 'CirclePlus'
                }} onClick={viewModel.addField} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
});