// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { PropertyValue } from './PropertyValue';

export type EventInstance = {
    id: Guid;
    eventType: Guid;
    propertyValues: PropertyValue[]
};
