// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class MissingPersistenceConfigurationForIntermediates extends Error {
    constructor() {
        super('Configuration for storing intermediates has not been set');
    }
}
