// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { default as styles } from './Layout.module.scss';

import { Home } from '../Home';

export const Layout = () => {
    return (
        <>

            <div className={styles.application}>
                <div className={styles.main}>
                    <div className={styles.contentScrollable}>
                        <div className={styles.content}>
                            <Home />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
