// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationTypeId } from '../OperationTypeId';

export class ChildOperationDescriptor {
    constructor(readonly id: OperationTypeId, readonly children: ChildOperationDescriptor[] = []) {
    }

}
