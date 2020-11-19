// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationTypeId } from '../OperationTypeId';

import { EventTypeId } from '@dolittle/sdk.events';

export class OperationDescriptor {
    constructor(readonly id: OperationTypeId, readonly eventTypes: EventTypeId[], readonly children: OperationDescriptor[] = []) {
    }
}
