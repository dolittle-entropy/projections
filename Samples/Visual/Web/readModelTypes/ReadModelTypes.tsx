// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, useDialog, withViewModel } from '@dolittle/vanir-react';
import { ReadModelTypesViewModel } from './ReadModelTypesViewModel';
import { DetailsList, IColumn, IconButton, SelectionMode } from '@fluentui/react';
import { ReadModelTypeDialog } from './ReadModelTypeEditorDialog';
import { ReadModelTypeDialogOutput } from './ReadModelTypeDialogOutput';
import { ReadModelTypeDialogInput } from './ReadModelTypeDialogInput';
import { Guid } from '@dolittle/rudiments';
import { ReadModelTypeDefinition } from './ReadModelTypeDefinition';

export const ReadModelTypes = withViewModel(ReadModelTypesViewModel, ({ viewModel }) => {

    const [showReadModelEditor, readModelEditorDialogProps] = useDialog<ReadModelTypeDialogInput, ReadModelTypeDialogOutput>(async (result, output?) => {
        if (result === DialogResult.Success) {
            if (output) {
                await viewModel.saveReadModelTypeDefinition(output.definition);
                await viewModel.populate();
            }
        }
    });

    const addReadModel = () => {
        const input: ReadModelTypeDialogInput = {
            definition: {
                id: Guid.create(),
                name: '',
                properties: []
            }
        };

        showReadModelEditor(input);
    };

    const showItem = (item: ReadModelTypeDefinition) => {
        const input: ReadModelTypeDialogInput = {
            definition: item
        };

        showReadModelEditor(input);
    };

    const deleteItem = async (item: ReadModelTypeDefinition) => {
        await viewModel.deleteReadModelTypeDefinition(item);
        await viewModel.populate();
    };

    const columns: IColumn[] = [{
        key: 'Name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 50
    }, {
        key: 'Actions',
        name: 'Actions',
        minWidth: 50,
        onRender: (item) => <IconButton iconProps={{iconName:'Delete'}} onClick={() => deleteItem(item)}/>
    }];

    return (
        <>
            <DetailsList
                columns={columns}
                items={viewModel.readModels}
                selectionMode={SelectionMode.none}
                onItemInvoked={showItem}
            />
            <ReadModelTypeDialog {...readModelEditorDialogProps} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addReadModel} />

        </>
    );
});