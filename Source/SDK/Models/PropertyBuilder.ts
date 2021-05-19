// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyType } from './PropertyType';
import { PropertyDescriptor } from './PropertyDescriptor';

export type PropertyBuilderCallback<TDocument extends object> = (builder: PropertyBuilder<TDocument>) => void;

export class PropertyBuilder<TDocument extends object> {
    private _propertyType: PropertyType = PropertyType.unknown;

    constructor(readonly name: string) {
    }

    withType(propertyType: PropertyType): PropertyBuilder<TDocument> {
        this._propertyType = propertyType;
        return this;
    }

    build(): PropertyDescriptor {
        return new PropertyDescriptor(this.name, this._propertyType);
    }
}
