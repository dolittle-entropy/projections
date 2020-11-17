// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { IOperation } from '../IOperation';
import { IOperationBuilder } from '../IOperationBuilder';

export type FromEventBuilderCallback<TDocument, TEvent> = (builder: FromEventBuilder<TDocument, TEvent>) => void;

export class SetBuilder<TDocument, TEvent> implements IOperationBuilder {
    constructor(private readonly _parent: FromEventBuilder<TDocument, TEvent>) {
    }

    to(property: PropertyAccessor<TEvent>): FromEventBuilder<TDocument, TEvent> {

        return this._parent;
    }

    build(): IOperation {
        throw new Error('Method not implemented.');
    }
}

export class FromEventBuilder<TDocument, TEvent> {
    private readonly _builders: IOperationBuilder[] = [];

    set(property: PropertyAccessor<TDocument>): SetBuilder<TDocument, TEvent> {
        const builder = new SetBuilder<TDocument, TEvent>(this);
        this._builders.push(builder);
        return builder;
    }

    build(): IOperation[] {
        return this._builders.map(_ => _.build());
    }
}

