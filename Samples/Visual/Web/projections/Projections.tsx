// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DialogResult, useDialog } from '@dolittle/vanir-react';
import { DetailsList, IColumn, IconButton, SelectionMode, Stack } from '@fluentui/react';
import React from 'react';
import { Projection } from './Projection';
import { ProjectionsEditorDialog } from './ProjectionsEditorDialog';
import { ProjectionsEditorDialogInput } from './ProjectionsEditorDialogInput';
import { ProjectionsEditorDialogOutput } from './ProjectionsEditorDialogOutput';
import { Guid } from '@dolittle/rudiments';
import { KeyStrategy } from './KeyStrategy';

export const Projections = () => {
    const [showProjectionEditor, projectionEditorDialogProps] = useDialog<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>(async (result, output?) => {
        if (result === DialogResult.Success) {
            debugger;
            if (output) {
                //await viewModel.writeEventInstance(output.definition);
                //await viewModel.populate();
            }
        }
    });

    const addProjection = () => {
        const input: ProjectionsEditorDialogInput = {
            projection: new Projection()
        };
        input.projection.id = Guid.create();
        input.projection.keyStrategies = [new KeyStrategy()];
        showProjectionEditor(input);
    };

    const showItem = (item: any) => {
        /*const input: ProjectionsEditorDialogInput = {
        };

        showProjectionEditor(input);*/
    };

    const deleteItem = async (item: any) => {
        //await viewModel.deleteEventInstance(item);
        //await viewModel.populate();
    };

    const columns: IColumn[] = [{
        key: 'Name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 50
    }, {
        key: 'Actions',
        name: 'Actions',
        minWidth: 100,
        onRender: (item) => (
            <Stack horizontal>
                <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => deleteItem(item)} />
            </Stack>
        )
    }];

    return (
        <>
            <DetailsList
                columns={columns}
                items={[]}
                selectionMode={SelectionMode.none}
                onItemInvoked={showItem}
            />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addProjection} />

            <ProjectionsEditorDialog {...projectionEditorDialogProps}/>
        </>
    );
};