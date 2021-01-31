// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, useDialog, withViewModel } from '@dolittle/vanir-react';
import { EventsViewModel } from './EventsViewModel';
import { DetailsList, IColumn, IconButton, SelectionMode, Stack } from '@fluentui/react';
import { EventInstanceEditorDialog } from './EventInstanceEditorDialog';
import { EventInstanceEditorDialogOutput } from './EventInstanceEditorDialogOutput';
import { EventInstanceEditorDialogInput } from './EventInstanceEditorDialogInput';
import { Guid } from '@dolittle/rudiments';
import { EventInstance } from './EventInstance';

export const Events = withViewModel(EventsViewModel, ({ viewModel }) => {

    const [showEventEditor, eventEditorDialogProps] = useDialog<EventInstanceEditorDialogInput, EventInstanceEditorDialogOutput>(async (result, output?) => {
        if (result === DialogResult.Success) {
            if (output) {
                await viewModel.writeEventInstance(output.definition);
                await viewModel.populate();
            }
        }
    });

    const addEventInstance = () => {
        const input: EventInstanceEditorDialogInput = {
            definition: {
                id: Guid.create(),
                eventType: Guid.empty,
                propertyValues: []
            },
            eventTypes: viewModel.eventTypes
        };

        showEventEditor(input);
    };

    const showItem = (item: EventInstance) => {
        const input: EventInstanceEditorDialogInput = {
            definition: item,
            eventTypes: viewModel.eventTypes
        };

        showEventEditor(input);
    };

    const deleteItem = async (item: EventInstance) => {
        await viewModel.deleteEventInstance(item);
        await viewModel.populate();
    };

    const columns: IColumn[] = [{
        key: 'Name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 50,
        onRender: (item) => <div>{viewModel.eventTypes.find(_ => _.id === item.eventType)?.name || 'Unknown'}</div>
    }, {
        key: 'Actions',
        name: 'Actions',
        minWidth: 100,
        onRender: (item) => (
            <Stack horizontal>
                <IconButton iconProps={{ iconName: 'MSNVideosSolid' }} onClick={() => { }} />
                <IconButton iconProps={{ iconName: 'Delete' }} onClick={() => deleteItem(item)} />
            </Stack>
        )
    }];

    return (
        <>
            <DetailsList
                columns={columns}
                items={viewModel.eventInstances}
                selectionMode={SelectionMode.none}
                onItemInvoked={showItem}
            />
            <EventInstanceEditorDialog {...eventEditorDialogProps} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addEventInstance} />

        </>
    );
});