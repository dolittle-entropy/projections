// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationTypeId } from '../../OperationTypeId';

export class UnknownChildOperation extends Error {
    constructor(operationTypeId: OperationTypeId) {
        super(`Operation of type '${operationTypeId.toString()}' is unknown`);
    }
}
