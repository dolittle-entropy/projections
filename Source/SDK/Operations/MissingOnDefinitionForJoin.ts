// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class MissingOnDefinitionForJoin extends Error {
    constructor() {
        super('Missing a definition of which property to do a join on. Use the .on() method on the join builder to set this.');
    }
}
