// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { PropertyDefinition } from '../common/PropertyDefinition';

export type ReadModelTypeDefinition = {
    id: Guid;
    name: string;
    properties: PropertyDefinition[]
};
