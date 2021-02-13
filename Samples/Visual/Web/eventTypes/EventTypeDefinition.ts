// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { FieldDefinition } from '../common/FieldDefinition';

export type EventTypeDefinition = {
    id: Guid;
    name: string;
    properties: FieldDefinition[]
};
