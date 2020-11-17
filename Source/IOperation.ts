// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

export interface IOperation {
    eventTypes: Constructor[];
    subOperations: IOperation[];
    composite: boolean;
    perform(initial: any, events: any[]): any;
}
