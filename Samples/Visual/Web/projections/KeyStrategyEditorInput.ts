// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { ReadModelTypeDefinition } from './ReadModelTypeDefinition';
import { KeyStrategy } from './KeyStrategy';

export interface KeyStrategyEditorInput {
    readModelType: ReadModelTypeDefinition;
    strategies?: KeyStrategy[];
}
