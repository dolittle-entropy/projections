// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { KeyStrategy, KeyStrategyEditorViewModel, KeyStrategyType } from './KeyStrategyEditorViewModel';
import { KeyStrategyEditorProps } from './KeyStrategyEditorProps';
import { DetailsList, IColumn, IconButton, SelectionMode, IDropdownOption, Dropdown } from '@fluentui/react';

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

export const KeyStrategyEditor = withViewModel<KeyStrategyEditorViewModel, KeyStrategyEditorProps>(KeyStrategyEditorViewModel, ({ viewModel, props }) => {

    const renderEventContextPropertySelector = (item: KeyStrategy) => {
        return (
            <Dropdown defaultValue={item.property} options={eventContextProperties} onChange={(e, nv) => item.property = nv!.key as string} />
        );
    };

    const columns: IColumn[] = [
        {
            key: 'type',
            name: 'Type',
            fieldName: 'type',
            minWidth: 150,
            onRender: (item: KeyStrategy) => <Dropdown defaultValue={item.type} options={keyStrategyTypes} onChange={(e, nv) => item.type = nv!.key as KeyStrategyType} />
        },
        {
            key: 'property',
            name: 'Property',
            fieldName: 'property',
            minWidth: 200,
            onRender: renderEventContextPropertySelector
        }
    ];

    return (
        <>
            Key strategies
            <DetailsList
                selectionMode={SelectionMode.none}
                columns={columns}
                items={viewModel.strategies} />

            <IconButton iconProps={{
                iconName: 'CirclePlus'
            }} onClick={viewModel.addStrategy} />

        </>
    );
});