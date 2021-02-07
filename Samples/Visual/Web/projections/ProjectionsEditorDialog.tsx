// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { withViewModel, IDialogProps, DialogResult, useDialog } from '@dolittle/vanir-react';
import { ProjectionsEditorDialogViewModel } from './ProjectionsEditorDialogViewModel';
import { ProjectionsEditorDialogInput } from './ProjectionsEditorDialogInput';
import { ProjectionsEditorDialogOutput } from './ProjectionsEditorDialogOutput';
import { FromEventEditorDialogInput } from './operations/FromEventEditor/FromEventEditorDialogInput';
import { FromEventEditorDialogOutput } from './operations/FromEventEditor/FromEventEditorDialogOutput';
import {
    IColumn,
    SelectionMode,
    DefaultButton,
    DetailsList,
    Dialog,
    DialogFooter,
    DialogType,
    IDialogContentProps,
    PrimaryButton,
    Stack,
    IDropdownOption,
    Dropdown,
    CommandBar,
    ICommandBarItemProps,
    IGroup
} from '@fluentui/react';
import { FromEventEditorDialog } from './operations/FromEventEditor/FromEventEditorDialog';
import { FromEvent } from './operations/FromEvent';
import { KeyStrategyEditor } from './KeyStrategyEditor';
import OperationTypes from './operations/OperationTypes';
import { Guid } from '@dolittle/rudiments';
import { Operation } from './operations/Operation';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Projection',
    closeButtonAriaLabel: 'Close'
};


const operationTypeNames: { [key: string]: string } = {};

operationTypeNames[OperationTypes.FromEvent.toString()] = 'From Event';
operationTypeNames[OperationTypes.JoinEvent.toString()] = 'Join Event';
operationTypeNames[OperationTypes.Child.toString()] = 'Child';

type OperationForListing = {
    type: string;
    information: string;
    actual: Operation;
};


export const ProjectionsEditorDialog = withViewModel<ProjectionsEditorDialogViewModel, IDialogProps<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>>(ProjectionsEditorDialogViewModel, ({ viewModel, props }) => {
    const [showFromEventEditor, fromEventEditorProps] = useDialog<FromEventEditorDialogInput, FromEventEditorDialogOutput>((result, output?) => {
        if (result === DialogResult.Success && output && fromEventEditorProps.input.isAdd) {
            viewModel.addOperation(output.operation);
        }
    });

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

    const commandBarItems: ICommandBarItemProps[] = [
        {
            key: 'from',
            iconProps: { iconName: 'RawSource' },
            text: 'From Event',
            onClick: () => showFromEventEditor({ readModelType: viewModel.readModelType!, operation: new FromEvent(), eventTypes: viewModel.eventTypes, isAdd: true })
        },
        {
            key: 'join',
            iconProps: { iconName: 'BranchMerge' },
            text: 'Join Event'
        }
    ];

    const columns: IColumn[] = [
        {
            key: 'type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 150
        },
        {
            key: 'information',
            name: 'Information',
            fieldName: 'information',
            minWidth: 250
        }
    ];

    const operations = viewModel.operations.map(_ => {
        const item: OperationForListing = {
            type: operationTypeNames[_.operationType.toString()],
            information: '',
            actual: _
        };

        if (_.operationType.toString() === OperationTypes.FromEvent.toString()) {
            const eventType = viewModel.eventTypes.find(et => et.id.toString() === (_ as FromEvent).eventType.toString());
            if (eventType) {
                item.information = `Event type : ${eventType.name}`;
            }
        }

        return item;
    });

    const showOperationsEditor = (operation: OperationForListing) => {
        if (operation.actual.operationType.toString() === OperationTypes.FromEvent.toString()) {
            showFromEventEditor({ readModelType: viewModel.readModelType!, operation: operation.actual as FromEvent, eventTypes: viewModel.eventTypes, isAdd: false });
        }
    };

    return (
        <>
            <Dialog
                minWidth={600}
                hidden={!props.visible}
                onDismiss={done}
                dialogContentProps={dialogContentProps}>

                <Stack>
                    <Dropdown label="Read Model Type" defaultSelectedKey={viewModel.readModelType?.id.toString()} options={eventTypeOptions} onChange={(e, nv) => viewModel.selectReadModelType(nv!.data)} />
                    <KeyStrategyEditor readModelType={viewModel.readModelType} />

                    <CommandBar items={commandBarItems} />

                    <DetailsList
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        items={operations}
                        onItemInvoked={showOperationsEditor}
                    />
                </Stack>

                <DialogFooter>
                    <PrimaryButton onClick={done} text="Done" />
                    <DefaultButton onClick={cancel} text="Cancel" />
                </DialogFooter>
            </Dialog>
            <FromEventEditorDialog {...fromEventEditorProps} />
        </>
    );
});