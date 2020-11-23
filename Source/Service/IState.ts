// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from './Properties';

export abstract class IState {
    abstract get(id: any): Promise<any>;
    abstract set(id: any, content: any): Promise<void>;
    abstract setMany(property: PropertyAccessor, id: any, content: any): Promise<void>;
}
