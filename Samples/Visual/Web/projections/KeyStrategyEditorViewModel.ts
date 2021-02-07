// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export enum KeyStrategyType {
    eventContext = 1,
    event
}

export class KeyStrategy {
    type: KeyStrategyType = KeyStrategyType.eventContext;

    property: string = 'eventSourceId';
}

export class KeyStrategyEditorViewModel {
    strategies: KeyStrategy[] = [];

    addStrategy() {
        this.strategies = [...this.strategies, new KeyStrategy()];

    }

}