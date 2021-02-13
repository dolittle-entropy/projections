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
import { FieldTypeDropdown } from '../components';
import { FieldType } from '../common/FieldType';
import { Projection } from './Projection';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Field',
    closeButtonAriaLabel: 'Close'
};

export interface FieldEditorInput {
    projection: Projection;
    name: string;
    type: FieldType;
}

export interface FieldEditorOutput {
    projection: Projection;
    name: string;
    type: FieldType;
}


export const FieldEditor = (props: IDialogProps<FieldEditorInput, FieldEditorOutput>) => {
    const [name, setName] = useState(props.input.name);
    const [type, setType] = useState(props.input.type);

    const done = () => {
        props.onClose(DialogResult.Success, {
            projection: props.input.projection, name, type
        });
    };

    const cancel = () => {
        props.onClose(DialogResult.Cancelled);
    };

    return (
        <>
            <Dialog
                minWidth={600}
                hidden={!props.visible}
                onDismiss={done}
                dialogContentProps={dialogContentProps}>

                <form>
                    <Stack>
                        <TextField label="Name" defaultValue={name} onChange={(e, nv) => setName(nv!)} />
                        <FieldTypeDropdown label="Type" type={type} onChange={(type) => setType(type)} />
                    </Stack>
                </form>

                <DialogFooter>
                    <PrimaryButton onClick={done} text="Done" type="submit" />
                    <DefaultButton onClick={cancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
        </>
    );
};