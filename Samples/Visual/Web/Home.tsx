// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@dolittle/vanir-react';
import { Pivot, PivotItem, Stack, StackItem } from '@fluentui/react';
import React from 'react';
import { Events } from './events/Events';
import { EventTypes } from './eventTypes/EventTypes';
import { HomeViewModel } from './HomeViewModel';
import { Projections } from './projections/Projections';

export const Home = withViewModel(HomeViewModel, ({ viewModel }) => {

    return (
        <>
            <Pivot style={{ backgroundColor: 'black' }}>
                <PivotItem headerText="Business Moments" itemIcon="Storyboard">
                    <EventTypes />
                </PivotItem>
                <PivotItem headerText="Projections" itemIcon="MergeDuplicate">
                    <Projections/>
                </PivotItem>
                <PivotItem headerText="Business Moment Workbench" itemIcon="Picture">
                    <Events />
                </PivotItem>
                <PivotItem headerText="Query Editor" itemIcon="StackIndicator">
                </PivotItem>
                <PivotItem headerText="Changes" itemIcon="ChangeEntitlements">
                </PivotItem>
            </Pivot>
        </>
    );
});
