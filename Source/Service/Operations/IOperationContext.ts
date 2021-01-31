// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from './IOperationDataContext';
import { IOperationGroup } from './IOperationGroup';
import { IObjectComparer } from '../Changes/IObjectComparer';

export interface IOperationContext {
    readonly key: any;
    readonly dataContext: IOperationDataContext;

    readonly group: IOperationGroup;
    readonly parentGroup?: IOperationGroup;

    readonly hasParentGroup: boolean;

    readonly comparer: IObjectComparer;
}

