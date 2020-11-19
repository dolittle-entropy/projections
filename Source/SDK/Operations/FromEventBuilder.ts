// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { IOperationBuilder } from '../IOperationBuilder';
import { OperationDescriptor } from '../OperationDescriptor';
import OperationTypes from '../OperationTypes';

export type FromEventBuilderCallback<TDocument, TEvent> = (builder: FromEventBuilder<TDocument, TEvent>) => void;

export class SetBuilder<TDocument, TEvent> implements IOperationBuilder {
    constructor(private readonly _parent: FromEventBuilder<TDocument, TEvent>) {
    }

    to(property: PropertyAccessor<TEvent>): FromEventBuilder<TDocument, TEvent> {

        return this._parent;
    }

    build(): OperationDescriptor {
        throw new Error('Method not implemented.');
    }
}


export class FromEventBuilder<TDocument, TEvent> implements IOperationBuilder{
    private readonly _builders: IOperationBuilder[] = [];

    set(property: PropertyAccessor<TDocument>): SetBuilder<TDocument, TEvent> {
        const builder = new SetBuilder<TDocument, TEvent>(this);
        this._builders.push(builder);
        return builder;
    }

    build(): OperationDescriptor {

        const children = this._builders.map(_ => _.build());
        //const operation = new OperationDescriptor(OperationTypes.FromEvent,);

        throw new Error('Method not implemented.');
        //return ;
    }
}

