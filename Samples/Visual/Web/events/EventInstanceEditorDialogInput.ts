// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { EventTypeDefinition } from '../eventTypes/EventTypeDefinition';
import { EventInstance } from './EventInstance';

export interface EventInstanceEditorDialogInput {
    definition: EventInstance;
    eventTypes: EventTypeDefinition[];
}
