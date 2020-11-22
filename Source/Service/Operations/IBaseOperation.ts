// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationContext } from './IOperationContext';

export interface IBaseOperation {
    children: IBaseOperation[];
    perform(context: IOperationContext): Promise<any>;
}
