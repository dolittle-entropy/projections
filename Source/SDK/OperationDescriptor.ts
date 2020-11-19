// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationTypeId } from '../OperationTypeId';

import { EventTypeId } from '@dolittle/sdk.events';
import { ChildOperationDescriptor } from './ChildOperationDescriptor';

export class OperationDescriptor {
    constructor(readonly id: OperationTypeId, readonly eventTypes: EventTypeId[], readonly configuration: any = {}, readonly children: ChildOperationDescriptor[] = []) {
    }
}
