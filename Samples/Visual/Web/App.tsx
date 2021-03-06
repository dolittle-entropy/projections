// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Layout } from './layouts/Layout';
import { AppHeader } from './layouts/AppHeader';


export const App = () => {
    return (
        <>
            <AppHeader/>
            <Layout/>
        </>
    );
};

