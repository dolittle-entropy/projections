// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { StreamId } from '@dolittle/sdk.events';
import { IProjectionIntermediates } from './IProjectionIntermediates';

export abstract class IProjectionIntermediatesManager {
    abstract getFor(stream: StreamId, identifier: string): Promise<IProjectionIntermediates>;
}
