// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

export class MissingIdentifierPropertyForChildDocument extends Error {
    constructor(childType: Constructor) {
        super(`Missing identifier property child of type '${childType.name}', When building a child relationship, one needs to specify the property within the child document type that will holds the identifier.`);
    }
}
