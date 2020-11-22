// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IKeyStrategy } from '../Keys';
import { IOperationContext } from './IOperationContext';

export interface IBaseOperation {
    keyStrategy: IKeyStrategy;
    children: IBaseOperation[];
    perform(context: IOperationContext): Promise<any>;
}
