// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, useDialog, withViewModel } from '@dolittle/vanir-react';
import { EventTypesViewModel } from './EventTypesViewModel';
import { DetailsList, IColumn, IconButton, SelectionMode } from '@fluentui/react';
import { EventEditorDialog } from './EventEditorDialog';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { Guid } from '@dolittle/rudiments';
import { EventTypeDefinition } from './EventTypeDefinition';

export const EventTypes = withViewModel(EventTypesViewModel, ({ viewModel }) => {

    const [showEventEditor, eventEditorDialogProps] = useDialog<EventEditorDialogInput, EventEditorDialogOutput>(async (result, output?) => {
        if (result === DialogResult.Success) {
            if (output) {
                await viewModel.saveEventTypeDefinition(output.definition);
                await viewModel.populate();
            }
        }
    });

    const addEventType = () => {
        const input: EventEditorDialogInput = {
            definition: {
                id: Guid.create(),
                name: '',
                properties: []
            }
        };

        showEventEditor(input);
    };

    const showItem = (item: EventTypeDefinition) => {
        const input: EventEditorDialogInput = {
            definition: item
        };

        showEventEditor(input);
    };

    const deleteItem = async (item: EventTypeDefinition) => {
        await viewModel.deleteEventTypeDefinition(item);
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
                items={viewModel.eventTypes}
                selectionMode={SelectionMode.none}
                onItemInvoked={showItem}
            />
            <EventEditorDialog {...eventEditorDialogProps} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addEventType} />

        </>
    );
});