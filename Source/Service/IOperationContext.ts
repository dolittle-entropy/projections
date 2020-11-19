// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

export interface IOperationContext {
    identifier: Guid;
    model: any;
    events: any[];

    getState(key: string): any;
    setState(key: string, state: any);
}

