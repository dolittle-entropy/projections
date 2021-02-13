// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReadModelTypeDefinition } from './ReadModelTypeDefinition';
import { KeyStrategy } from './KeyStrategy';
import { Operation } from './operations/Operation';
import { Guid } from '@dolittle/rudiments';

export class Projection {
    id!: Guid;
    name!: string;
    modelName!: string;
    readModelType!: ReadModelTypeDefinition;
    keyStrategies: KeyStrategy[] = [];
    operations: Operation[] = [];
}

