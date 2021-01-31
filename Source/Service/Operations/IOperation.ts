// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Expression } from '../Expressions';
import { IKeyStrategy } from '../Keys';
import { IOperationContext } from './IOperationContext';

export interface IOperation {
    filter: Expression;
    keyStrategy: IKeyStrategy;
    children: IOperation[];
    perform(context: IOperationContext): Promise<any>;
}
