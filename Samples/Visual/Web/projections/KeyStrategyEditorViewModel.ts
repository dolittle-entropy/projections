// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategy } from './KeyStrategy';
import { KeyStrategyType } from './KeyStrategyType';
import { KeyStrategyEditorInput } from './KeyStrategyEditorInput';
import { IDialogProps } from '@dolittle/vanir-react';
import { KeyStrategyEditorOutput } from './KeyStrategyEditorOutput';

export class KeyStrategyEditorViewModel {
    strategies: KeyStrategy[] = [];

    propsChanged(props: IDialogProps<KeyStrategyEditorInput, KeyStrategyEditorOutput>) {
        if (props.input.strategies) {
            this.strategies = props.input.strategies;
        }
    }

    addStrategy() {
        this.strategies = [...this.strategies, new KeyStrategy()];
    }

    handleKeyStrategyTypeFor(strategy: KeyStrategy, type: KeyStrategyType) {
        strategy.type = type;
        this.strategies = [...this.strategies, ...[]];
    }
}