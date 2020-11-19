// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';

export abstract class IProjectionRepository {
    abstract getCurrentState(id: Guid): Promise<any>;
    abstract upsert(id: Guid, content: any): Promise<void>;
}
