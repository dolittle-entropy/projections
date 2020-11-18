// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { IOperationContext } from './IOperationContext';

export class OperationContext implements IOperationContext {
    constructor(readonly identifier: Guid, readonly model: any, readonly events: any[]) {
    }

    getState(key: string) {
        throw new Error('Method not implemented.');
    }
    setState(key: string, state: any) {
        throw new Error('Method not implemented.');
    }
}
