// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventTypeId } from '@dolittle/sdk.events';
import { IBaseOperation } from './IBaseOperation';

export interface IOperation extends IBaseOperation {
    eventTypes: EventTypeId[];
}
