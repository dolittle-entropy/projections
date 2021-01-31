// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useDialog, withViewModel } from '@dolittle/vanir-react';
import { EventsViewModel } from './EventsViewModel';
import { DetailsList, IColumn, IconButton, SelectionMode } from '@fluentui/react';
import { EventEditorDialog } from './EventEditorDialog';
import { EventEditorDialogOutput } from './EventEditorDialogOutput';
import { EventEditorDialogInput } from './EventEditorDialogInput';
import { Guid } from '@dolittle/rudiments';

export const Events = withViewModel(EventsViewModel, ({ viewModel }) => {
    const columns: IColumn[] = [{
        key: 'Name',
        name: 'name',
        fieldName: 'name',
        minWidth: 50
    }];

    const [showEventEditor, eventEditorDialogProps] = useDialog<EventEditorDialogInput, EventEditorDialogOutput>(async (result, output?) => {
        if (output) {
            await viewModel.writeEventTypeDefinition(output.definition);
            await viewModel.populate();
        }
    });

    const addEventType = () => {
        const input: EventEditorDialogInput = {
            definition: {
                id: Guid.create(),
                name: '<New Type>',
                properties: []
            }
        };

        showEventEditor(input);
    };

    return (
        <>
            <DetailsList
                columns={columns}
                items={viewModel.eventTypes}
                selectionMode={SelectionMode.none}
                onItemInvoked={showEventEditor}
            />
            <EventEditorDialog {...eventEditorDialogProps} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={addEventType} />

        </>
    );
});