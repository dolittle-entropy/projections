// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Constructor } from '@dolittle/types';

export class MissingPropertyToStoreChildrenIn extends Error {
    constructor(childType: Constructor) {
        super(`Property for storing children in is missing for child of type '${childType.name}'`);
    }
}
