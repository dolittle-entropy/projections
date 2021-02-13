// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { IDialogProps, DialogResult } from '@dolittle/vanir-react';
import {
    DefaultButton,
    Dialog,
    DialogFooter,
    DialogType,
    IDialogContentProps,
    PrimaryButton,
    Stack,
    TextField,
} from '@fluentui/react';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Projection',
    closeButtonAriaLabel: 'Close'
};

export interface ProjectionsEditorInput {
    name: string;
    modelName: string;
}

export interface ProjectionsEditorOutput {
    name: string;
    modelName: string;
}


export const ProjectionsEditor = (props: IDialogProps<ProjectionsEditorInput, ProjectionsEditorOutput>) => {
    const [name, setName] = useState(props.input.name);
    const [modelName, setModelName] = useState(props.input.modelName);

    const done = () => {
        props.onClose(DialogResult.Success, {
            name, modelName
        });
    };

    const cancel = () => {
        props.onClose(DialogResult.Cancelled);
    };

    return (
        <Dialog
            minWidth={600}
            hidden={!props.visible}
            onDismiss={done}
            dialogContentProps={dialogContentProps}>

            <form>
                <Stack>
                    <TextField label="Name" defaultValue={name} onChange={(e, nv) => setName(nv!)} />
                    <TextField label="Model name" defaultValue={modelName} onChange={(e, nv) => setModelName(nv!)} />
                </Stack>
            </form>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" type="submit" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
};