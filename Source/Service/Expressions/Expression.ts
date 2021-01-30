// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from '../Operations';

export abstract class Expression {

    abstract invoke(context: IOperationDataContext): any;
    abstract toString(): string;
}
