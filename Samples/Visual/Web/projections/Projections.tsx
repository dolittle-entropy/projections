// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DialogResult, useDialog, withViewModel } from '@dolittle/vanir-react';
import { DetailsList, IColumn, IconButton, SelectionMode, Stack, TextField } from '@fluentui/react';
import React from 'react';
import { FieldEditor, FieldEditorInput, FieldEditorOutput } from './FieldEditor';
import { Projection } from './Projection';
import { ProjectionsEditor, ProjectionsEditorInput, ProjectionsEditorOutput } from './ProjectionsEditor';
import { ProjectionsViewModel } from './ProjectionsViewModel';
import { FieldType } from '../common/FieldType';
import { FieldDefinition } from '../common/FieldDefinition';
import { KeyStrategyEditorInput } from './KeyStrategyEditorInput';
import { KeyStrategyEditorOutput } from './KeyStrategyEditorOutput';
import { KeyStrategyEditor } from './KeyStrategyEditor';

export const Projections = withViewModel(ProjectionsViewModel, ({ viewModel }) => {
    const [showProjectionEditor, projectionEditorProps] = useDialog<ProjectionsEditorInput, ProjectionsEditorOutput>(async (result, output?) => {
        if (result === DialogResult.Success && output) {
            viewModel.addProjection(output.name, output.modelName);
        }
    });

    const addProjection = () => {
        const input: ProjectionsEditorInput = { name: '', modelName: '' };
        showProjectionEditor(input);
    };

    const editProjection = (projection: Projection) => {
        const input: ProjectionsEditorInput = { name: projection.name, modelName: projection.modelName };
        showProjectionEditor(input);
    };

    const [showFieldEditor, fieldEditorProps] = useDialog<FieldEditorInput, FieldEditorOutput>(async (result, output?) => {
        if (result === DialogResult.Success && output) {
            viewModel.addField(output.projection, output.name, output.type);
        }
    });


    const addField = (projection: Projection) => {
        const input: FieldEditorInput = { projection, name: '', type: FieldType.string };
        showFieldEditor(input);
    };

    const editField = (projection: Projection, field: FieldDefinition) => {
        showFieldEditor({ projection, name: field.name, type: field.type });
    };

    const deleteItem = async (item: any) => {
        //await viewModel.deleteEventInstance(item);
        //await viewModel.populate();
    };

    const renderFields = (projection: Projection): JSX.Element[] => {
        return projection.readModelType.fields.map(field => {
            return (
                <TextField key={field.name} readOnly value={field.name} iconProps={{ iconName: 'Delete' }} />
            );
        });
    };

    const [showKeyStrategyEditor, keyStrategyEditorProps] = useDialog<KeyStrategyEditorInput, KeyStrategyEditorOutput>(async (result, output?) => {
        if (result === DialogResult.Success && output) {
        }
    });

    const editKeyStrategyFor = (projection: Projection) => {
        showKeyStrategyEditor({
            readModelType: projection.readModelType,
            strategies: projection.keyStrategies
        });
    };

    const columns: IColumn[] = [{
        key: 'Actions',
        name: 'Actions',
        minWidth: 100,
        maxWidth: 100,
        onRender: (projection: Projection) => (
            <Stack horizontal>
                <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => deleteItem(projection)} />
                <IconButton iconProps={{ iconName: 'Permissions' }} onClick={() => editKeyStrategyFor(projection)} />
            </Stack>
        )
    }, {
        key: 'Name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 50,
        maxWidth: 150
    }, {
        key: 'Columns',
        name: '',
        minWidth: 50,
        onRender: (projection: Projection) => <>
            <Stack horizontal>
                <IconButton iconProps={{
                    iconName: 'CirclePlus'
                }} onClick={() => addField(projection)} />
                {renderFields(projection)}
            </Stack>
        </>
    }];

    return (
        <>
            <DetailsList
                columns={columns}
                items={viewModel.projections}
                selectionMode={SelectionMode.none}
                onItemInvoked={editProjection}
            />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addProjection} />

            <ProjectionsEditor {...projectionEditorProps} />
            <FieldEditor {...fieldEditorProps} />
            <KeyStrategyEditor {...keyStrategyEditorProps} />
        </>
    );
});