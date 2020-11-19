// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import { IOperationContext } from './IOperationContext';

export interface IOperation {
    eventTypes: Constructor[];
    perform(context: IOperationContext): any;
}
