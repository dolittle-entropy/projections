// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ScopeId } from '@dolittle/sdk.events';
import { KeyStrategyDescriptor } from './KeyStrategyDescriptor';
import { ModelDescriptor } from './ModelDescriptor';
import { OperationDescriptor } from './OperationDescriptor';



export class ProjectionDescriptor {
    constructor(readonly stream: Guid,
        readonly targetModel: ModelDescriptor,
        readonly keyStrategy: KeyStrategyDescriptor,
        readonly operations: OperationDescriptor[],
        readonly scope: ScopeId) {
    }
}
