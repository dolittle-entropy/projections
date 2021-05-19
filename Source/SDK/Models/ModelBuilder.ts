// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ModelDescriptor } from './ModelDescriptor';
import { PropertyAccessor } from '@dolittle/types';
import { PropertyUtilities } from '../../PropertyUtilities';
import { PropertyBuilderCallback, PropertyBuilder } from './PropertyBuilder';

export type ModelBuilderCallback<TDocument extends object> = (builder: ModelBuilder<TDocument>) => void;


/**
 * Represents the builder for building out models.
 */
export class ModelBuilder<TDocument extends object> {
    private _name: string = '';
    private _initialState: any = {};
    private _properties: PropertyBuilder<TDocument>[] = [];

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
     * Build a specific property.
     * @param {string} name Name of property.
     * @param {PropertyAccessor<TDocument>} targetProperty The target property.
     * @param {PropertyBuilderCallback} builderCallback Callback for building the property.
     * @returns
     */
    property(...args: [name: string, builderCallback?: PropertyBuilderCallback<TDocument>] | [targetProperty: PropertyAccessor<TDocument>, builderCallback?: PropertyBuilderCallback<TDocument>]): ModelBuilder<TDocument> {
        let propertyName = '';
        if (args[0] instanceof String) {
            propertyName = args[0] as string;
        } else {
            const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor<TDocument>(args[0] as PropertyAccessor<TDocument>);
            propertyName = propertyDescriptor.path;
        }
        const builder = new PropertyBuilder<TDocument>(propertyName);
        args[1]?.(builder);
        this._properties.push(builder);
        return this;
    }

    /**
     * Build the {@link ModelDescriptor}
     */
    build(): ModelDescriptor {
        return new ModelDescriptor(this._name, this._initialState);
    }
}
