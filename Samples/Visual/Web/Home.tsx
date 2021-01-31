// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@dolittle/vanir-react';
import { Pivot, PivotItem, Stack, StackItem } from '@fluentui/react';
import React from 'react';
import { Events } from './events/Events';
import { EventTypes } from './eventTypes/EventTypes';
import { HomeViewModel } from './HomeViewModel';

export const Home = withViewModel(HomeViewModel, ({ viewModel }) => {

    return (
        <>
            <Pivot style={{ backgroundColor: 'black' }}>
                <PivotItem headerText="Event Types" itemIcon="Storyboard">
                    <EventTypes />
                </PivotItem>
                <PivotItem headerText="Events" itemIcon="Picture">
                    <Events />
                </PivotItem>
                <PivotItem headerText="Projections" itemIcon="OpenSource">
                </PivotItem>
                <PivotItem headerText="Changes" itemIcon="ChangeEntitlements">
                </PivotItem>
            </Pivot>
        </>
    );
});
