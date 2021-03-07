// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ScopeId } from '@dolittle/sdk.events';
import { KeyStrategyDescriptor } from './KeyStrategyDescriptor';
import { ModelDescriptor } from './Models/ModelDescriptor';
import { OperationDescriptor } from './OperationDescriptor';
import { ProjectionId } from '../ProjectionId';


export class ProjectionDescriptor {
    constructor(readonly projectionId: ProjectionId,
        readonly targetModel: ModelDescriptor,
        readonly keyStrategies: KeyStrategyDescriptor[],
        readonly operations: OperationDescriptor[],
        readonly scope: ScopeId) {
    }
}
