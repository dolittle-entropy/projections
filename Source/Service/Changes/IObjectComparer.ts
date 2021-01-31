// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertySet } from './PropertySet';

export abstract class IObjectComparer {
    abstract compare(existingState: any, newState: any): PropertySet[];
    abstract areEqual(left: any, right: any): boolean;
}
