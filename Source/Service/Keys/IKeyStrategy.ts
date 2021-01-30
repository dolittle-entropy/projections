// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from '../Operations';

export interface IKeyStrategy {
    has(context: IOperationDataContext): boolean;
    get(context: IOperationDataContext): any;
}
