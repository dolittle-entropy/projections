// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { ReadModelTypeDialogViewModel } from './ReadModelTypeDialogViewModel';
import { DefaultButton, DetailsList, Dialog, DialogFooter, DialogType, Dropdown, IColumn, IconButton, IDialogContentProps, IDropdownOption, PrimaryButton, SelectionMode, Stack, TextField } from '@fluentui/react';
import { ReadModelTypeDialogInput } from './ReadModelTypeDialogInput';
import { ReadModelTypeDialogOutput } from './ReadModelTypeDialogOutput';
import { PropertyType } from '../common/PropertyType';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Read Model',
    closeButtonAriaLabel: 'Close'
};

const propertyTypeOptions: IDropdownOption[] = [
    { key: PropertyType.number, text: 'Number' },
    { key: PropertyType.boolean, text: 'Boolean' },
    { key: PropertyType.string, text: 'String' },
    { key: PropertyType.date, text: 'Date' }
];


export const ReadModelTypeDialog = withViewModel<ReadModelTypeDialogViewModel, IDialogProps<ReadModelTypeDialogInput, ReadModelTypeDialogOutput>>(ReadModelTypeDialogViewModel, ({ viewModel, props }) => {
    const columns: IColumn[] = [
        {
            key: 'Name',
            name: 'Name',
            fieldName: 'name',
            minWidth: 100,
            onRender: (item, index, column) => <TextField placeholder="Property name" defaultValue={item.name} onChange={(e, nv) => item.name = nv} />
        },
        {
            key: 'Type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 100,
            onRender: (item, index, column) => <Dropdown defaultSelectedKey={item.type} options={propertyTypeOptions} onChange={(e, nv) => item.type = nv?.key} />
        }
    ];

    const done = () => {
        props.onClose(DialogResult.Success, {
            definition: {
                id: viewModel.id,
                name: viewModel.name,
                properties: viewModel.properties
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
                <TextField label="Name" placeholder="Name of the read model" defaultValue={viewModel.name} onChange={(e, nv) => viewModel.name = nv!} />
                <DetailsList columns={columns} items={viewModel.properties} selectionMode={SelectionMode.none} />
                <IconButton iconProps={{
                    iconName: 'CirclePlus'
                }} onClick={viewModel.addProperty} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
});