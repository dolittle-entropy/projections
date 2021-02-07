// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { ReadModelTypeDefinition } from '../readModelTypes/ReadModelTypeDefinition';
import { KeyStrategy } from './KeyStrategy';

export type KeyStrategiesChanged = (strategies: KeyStrategy[]) => void;

export interface KeyStrategyEditorProps {
    readModelType: ReadModelTypeDefinition;
    strategies?: KeyStrategy[];
    onChange?: KeyStrategiesChanged;
}
