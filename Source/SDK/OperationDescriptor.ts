// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationTypeId } from '../OperationTypeId';
import { Expression } from './Expressions';

export class OperationDescriptor {
    constructor(readonly id: OperationTypeId, readonly filter: Expression, readonly configuration: any = {}, readonly children: OperationDescriptor[] = []) {
    }
}
