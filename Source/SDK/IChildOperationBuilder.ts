// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ChildOperationDescriptor } from './ChildOperationDescriptor';
import { OperationBuilderContext } from './OperationBuilderContext';

export interface IChildOperationBuilder {
    build(buildContext: OperationBuilderContext): ChildOperationDescriptor;
}
