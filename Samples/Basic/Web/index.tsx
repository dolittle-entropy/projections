// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';

import { Bindings as MVVMBindings } from '@shared/mvvm';

import './theme';
import './index.scss';
import styles from './index.module.scss';

import { Sample } from './Sample';

export default function App() {
    MVVMBindings.initialize();

    return (
        <>
            <div className={styles.application}>
                <Sample />
            </div>
        </>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);