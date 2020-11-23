// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor, PropertyAccessor } from '@dolittle/types';
import { FromEventBuilder, FromEventBuilderCallback } from './FromEventBuilder';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import { OperationBuilderContext } from '../OperationBuilderContext';
import { PropertyUtilities } from '../../PropertyUtilities';
import { MissingIdentifierPropertyForChildDocument } from './MissingIdentifierPropertyForChildDocument';
import { MissingPropertyToStoreChildrenIn } from './MissingPropertyToStoreChildrenIn';
import OperationTypes from '../../OperationTypes';

export type ChildBuilderCallback<TDocument extends object, TChild extends object> = (builder: ChildBuilder<TDocument, TChild>) => void;

export type ChildConfiguration = {
    storedInProperty: string;
    identifierProperty: string;
};

export class ChildBuilder<TDocument extends object, TChild extends object> implements IOperationBuilder {
    protected _builders: IOperationBuilder[] = [];
    private _identifierProperty?: string;
    private _storedInProperty?: string;

    constructor(readonly childType: Constructor<TChild>) {
    }

    identifiedBy(property: PropertyAccessor<TChild>): ChildBuilder<TDocument, TChild> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._identifierProperty = propertyDescriptor.path;
        return this;
    }

    storedIn(property: PropertyAccessor<TDocument>): ChildBuilder<TDocument, TChild> {
        const propertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(property);
        this._storedInProperty = propertyDescriptor.path;
        return this;
    }

    from<TEvent extends object>(eventType: Constructor<TEvent>, callback: FromEventBuilderCallback<TChild, TEvent>): ChildBuilder<TDocument, TChild> {
        const builder = new FromEventBuilder<TChild, TEvent>(eventType);
        callback(builder);
        this._builders.push(builder);
        return this;
    }

    build(buildContext: OperationBuilderContext): OperationDescriptor {
        if (!this._identifierProperty) {
            throw new MissingIdentifierPropertyForChildDocument(this.childType);
        }
        if (!this._storedInProperty) {
            throw new MissingPropertyToStoreChildrenIn(this.childType);
        }

        const configuration: ChildConfiguration = {
            identifierProperty: this._identifierProperty,
            storedInProperty: this._storedInProperty
        };
        const children = this._builders.map(_ => _.build(buildContext));
        return new OperationDescriptor(OperationTypes.Child, [], configuration, children);
    }
}
