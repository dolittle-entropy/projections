// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export abstract class IProjections {
    abstract get(id: any): Promise<any>;
    abstract upsert(id: any, content: any): Promise<void>;
}
