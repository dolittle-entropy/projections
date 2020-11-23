// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';
import { FromEventBuilder, FromEventBuilderCallback } from './Operations/FromEventBuilder';
import { JoinEventBuilder, JoinEventBuilderCallback } from './Operations/JoinEventBuilder';
import { IOperationBuilder } from './IOperationBuilder';
import { ChildBuilder, ChildBuilderCallback } from './Operations/ChildBuilder';

export class ProjectionOperationBuilder<TDocument extends object, TBuilder extends ProjectionOperationBuilder<TDocument, TBuilder>> {
    protected _operationBuilders: IOperationBuilder[] = [];

    constructor(private readonly _targetType: Constructor<TDocument>) {
    }

    children<TChild extends object>(childType: Constructor<TChild>, callback: ChildBuilderCallback<TDocument, TChild>): TBuilder {
        const builder = new ChildBuilder<TDocument, TChild>(childType);
        callback(builder);
        this._operationBuilders.push(builder);
        return this as unknown as TBuilder;
    }

    from<TEvent extends object>(eventType: Constructor<TEvent>, callback: FromEventBuilderCallback<TDocument, TEvent>): TBuilder {
        const builder = new FromEventBuilder<TDocument, TEvent>(eventType);
        callback(builder);
        this._operationBuilders.push(builder);
        return this as unknown as TBuilder;
    }

    join<TEvent extends object>(eventType: Constructor<TEvent>, callback: JoinEventBuilderCallback<TDocument, TEvent>): TBuilder {
        const builder = new JoinEventBuilder<TDocument, TEvent>(eventType);
        callback(builder);
        this._operationBuilders.push(builder);
        return this as unknown as TBuilder;
    }
}
