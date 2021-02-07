// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { KeyStrategy } from './KeyStrategy';
import { KeyStrategyType } from './KeyStrategyType';
import { KeyStrategyEditorProps, KeyStrategiesChanged } from './KeyStrategyEditorProps';

export class KeyStrategyEditorViewModel {
    private _onChange?: KeyStrategiesChanged;
    strategies: KeyStrategy[] = [];

    propsChanged(props: KeyStrategyEditorProps) {
        this._onChange = props.onChange;
        if (props.strategies) {
            this.strategies = props.strategies;
        }
    }

    handleOnChange() {
        if (this._onChange) {
            this._onChange(this.strategies);
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