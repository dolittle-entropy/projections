// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ModelDescriptor } from './ModelDescriptor';

export type ModelBuilderCallback<TDocument extends object> = (builder: ModelBuilder<TDocument>) => void;

/**
 * Represents the builder for building out models.
 */
export class ModelBuilder<TDocument extends object> {
    private _name: string = '';
    private _initialState: any = {};

    /**
     * Use specific model name. This is typically used as the table / collection name in the persisted state.
     * @param {string} name Name of the model
     */
    withName(name: string): ModelBuilder<TDocument> {
        this._name = name;
        return this;
    }

    /**
     * Defines the initial state to use for all new instances.
     * @param {*} initialState The actual initial state for any new instances.
     */
    withInitialState(initialState: TDocument): ModelBuilder<TDocument> {
        this._initialState = initialState;
        return this;
    }

    /**
     * Build the {@link ModelDescriptor}
     */
    build(): ModelDescriptor {
        return new ModelDescriptor(this._name, this._initialState);
    }
}
