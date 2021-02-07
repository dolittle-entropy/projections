// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Expression } from './Expression';
import { Operation } from './Operation';
import OperationTypes from './OperationTypes';

export class FromEvent extends Operation {
    key!: string;
    eventType!: Guid;

    constructor() {
        super();
        this.operationType = OperationTypes.FromEvent;
    }

    expressions: Expression[] = [];
}
