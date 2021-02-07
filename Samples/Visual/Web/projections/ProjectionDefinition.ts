// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategy } from './KeyStrategy';
import { Operation } from './operations/Operation';

export class ProjectionDefinition {
    id!: string;
    readModelType!: string;
    keyStrategies: KeyStrategy[] = [];
    operations: Operation[] = [];
}
