// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { KeyStrategyEditorViewModel } from './KeyStrategyEditorViewModel';
import { KeyStrategyType } from './KeyStrategyType';
import { KeyStrategy } from './KeyStrategy';
import { KeyStrategyEditorInput } from './KeyStrategyEditorInput';
import { KeyStrategyEditorOutput } from './KeyStrategyEditorOutput';
import {
    DetailsList,
    IColumn,
    IconButton,
    SelectionMode,
    IDropdownOption,
    Dropdown,
    TextField,
    IDialogContentProps,
    DialogType,
    Dialog,
    DialogFooter,
    PrimaryButton,
    DefaultButton
} from '@fluentui/react';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Projection',
    closeButtonAriaLabel: 'Close'
};


const keyStrategyTypes: IDropdownOption[] = [
    {
        key: KeyStrategyType.eventContext,
        text: 'Event Context'
    },
    {
        key: KeyStrategyType.event,
        text: 'Event'
    }
];

const eventContextProperties: IDropdownOption[] = [
    {
        key: 'sequenceNumber',
        text: 'Sequence Number'
    },
    {
        key: 'eventSourceId',
        text: 'Event source identifier'
    },
    {
        key: 'occurred',
        text: 'Occurred date and time'
    }
];

export const KeyStrategyEditor = withViewModel<KeyStrategyEditorViewModel, IDialogProps<KeyStrategyEditorInput, KeyStrategyEditorOutput>>(KeyStrategyEditorViewModel, ({ viewModel, props }) => {

    const renderStrategyTypeSelector = (item: KeyStrategy) => {
        return (
            <Dropdown defaultSelectedKey={item.type} options={keyStrategyTypes} onChange={(e, nv) => viewModel.handleKeyStrategyTypeFor(item, nv!.key as KeyStrategyType)} />
        );
    };

    const renderEventContextPropertySelector = (item: KeyStrategy) => {
        return (
            <Dropdown defaultSelectedKey={item.property} options={eventContextProperties} onChange={(e, nv) => item.property = nv!.key as string} />
        );
    };

    const renderEventPropertyInput = (item: KeyStrategy) => {
        return (
            <TextField defaultValue={item.property} onChange={(e, nv) => item.property = nv!} />
        );
    };

    const columns: IColumn[] = [
        {
            key: 'type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 150,
            onRender: renderStrategyTypeSelector
        },
        {
            key: 'property',
            name: 'Property',
            fieldName: 'property',
            minWidth: 200,
            onRender: (item: KeyStrategy) => {
                if (item.type === KeyStrategyType.eventContext) {
                    return renderEventContextPropertySelector(item);
                }
                return renderEventPropertyInput(item);
            }
        }
    ];


    const done = () => {
        props.onClose(DialogResult.Success);
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
            Key strategies
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={columns}
                items={viewModel.strategies} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={viewModel.addStrategy} />

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" type="submit" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>

    );
});