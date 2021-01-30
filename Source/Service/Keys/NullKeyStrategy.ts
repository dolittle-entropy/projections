// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IOperationDataContext } from '../Operations';
import { IKeyStrategy } from './IKeyStrategy';

export class NullKeyStrategy implements IKeyStrategy {
    has(context: IOperationDataContext): boolean {
        return false;
    }
    get(context: IOperationDataContext) {
        return undefined;
    }
}
