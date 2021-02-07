// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel, IDialogProps, DialogResult } from '@dolittle/vanir-react';
import { ProjectionsEditorDialogViewModel } from './ProjectionsEditorDialogViewModel';
import { ProjectionsEditorDialogInput } from './ProjectionsEditorDialogInput';
import { ProjectionsEditorDialogOutput } from './ProjectionsEditorDialogOutput';
import {
    DefaultButton,
    Dialog,
    DialogFooter,
    DialogType,
    IDialogContentProps,
    PrimaryButton,
    Stack,
    TextField,
    IDropdownOption,
    Dropdown
} from '@fluentui/react';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Projection',
    closeButtonAriaLabel: 'Close'
};

export const ProjectionsEditorDialog = withViewModel<ProjectionsEditorDialogViewModel, IDialogProps<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>>(ProjectionsEditorDialogViewModel, ({ viewModel, props }) => {

    const done = () => {
        props.onClose(DialogResult.Success, {
        });
    };

    function cancel() {
        props.onClose(DialogResult.Cancelled);
    }

    const eventTypeOptions = viewModel.readModelTypes.map(_ => {
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
                <Dropdown label="Read Model Type" defaultSelectedKey={viewModel.readModelType?.id.toString()} options={eventTypeOptions} onChange={(e, nv) => viewModel.selectReadModelType(nv!.data)} />
            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
});