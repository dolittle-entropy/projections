// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '@dolittle/types';
import { IOperation } from '../IOperation';
import { IOperationBuilder } from '../IOperationBuilder';

export type JoinEventBuilderCallback<TDocument, TEvent> = (builder: JoinEventBuilder<TDocument, TEvent>) => void;

export class SetBuilder<TDocument, TEvent> implements IOperationBuilder {
    constructor(private readonly _parent: JoinEventBuilder<TDocument, TEvent>) {
    }

    to(property: PropertyAccessor<TEvent>): JoinEventBuilder<TDocument, TEvent> {

        return this._parent;
    }

    build(): IOperation {
        throw new Error('Method not implemented.');
    }
}

export class JoinEventBuilder<TDocument, TEvent> {
    private readonly _builders: IOperationBuilder[] = [];

    on(property: PropertyAccessor<TDocument>): JoinEventBuilder<TDocument, TEvent> {
        return this;
    }

    set(property: PropertyAccessor<TDocument>): SetBuilder<TDocument, TEvent> {
        const builder = new SetBuilder<TDocument, TEvent>(this);
        this._builders.push(builder);
        return builder;
    }

    build(): IOperation[] {
        return this._builders.map(_ => _.build());
    }
}

