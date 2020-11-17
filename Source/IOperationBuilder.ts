// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IOperation } from './IOperation';

export interface IOperationBuilder {
    build(): IOperation;
}
