// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { FieldValue } from './FieldValue';

export type EventInstance = {
    id: Guid;
    name: string;
    eventType: Guid;
    propertyValues: FieldValue[]
};
