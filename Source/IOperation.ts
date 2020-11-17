// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

export interface IOperation<TDocument> {
    eventTypes: Constructor[];
    subOperations: IOperation<TDocument>[];
    composite: boolean;
    perform(initial: any, events: any[]): any;
}
