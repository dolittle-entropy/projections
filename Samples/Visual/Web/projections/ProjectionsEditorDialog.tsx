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

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'Projection',
    closeButtonAriaLabel: 'Close'
};

export const ProjectionsEditorDialog = withViewModel<ProjectionsEditorDialogViewModel, IDialogProps<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>>(ProjectionsEditorDialogViewModel, ({ viewModel, props }) => {
    const [operationGroups, setOperationGroups] = useState<IGroup[]>([]);
    const [showFromEventEditor, fromEventEditorProps] = useDialog<FromEventEditorDialogInput, FromEventEditorDialogOutput>((result, output?) => {
        debugger;

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
            onClick: () => showFromEventEditor({ readModelType: viewModel.readModelType!, operation: new FromEvent() })
        },
        {
            key: 'join',
            iconProps: { iconName: 'BranchMerge' },
            text: 'Join Event'
        }
    ];

    const columns: IColumn[] = [
        {
            key: 'target',
            name: 'Target',
            fieldName: 'target',
            minWidth: 150
        },
        {
            key: 'source',
            name: 'Source',
            fieldName: 'source',
            minWidth: 150
        }
    ];

    return (
        <>
            <Dialog
                minWidth={600}
                hidden={!props.visible}
                onDismiss={done}
                dialogContentProps={dialogContentProps}>

                <Stack>
                    <Dropdown label="Read Model Type" defaultSelectedKey={viewModel.readModelType?.id.toString()} options={eventTypeOptions} onChange={(e, nv) => viewModel.selectReadModelType(nv!.data)} />

                    <CommandBar items={commandBarItems} />

                    <DetailsList
                        columns={columns}
                        selectionMode={SelectionMode.none}
                        groups={operationGroups}
                        items={[]}
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