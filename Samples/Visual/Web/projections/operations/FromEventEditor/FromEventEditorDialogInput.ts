// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReadModelTypeDefinition } from '../../../readModelTypes/ReadModelTypeDefinition';
import { FromEvent } from '../FromEvent';

export interface FromEventEditorDialogInput {
    readModelType: ReadModelTypeDefinition;
    operation: FromEvent;
}
