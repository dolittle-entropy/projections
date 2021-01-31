// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';

export abstract class Change {
    abstract apply(model: any, state: IState): Promise<void>;
    abstract toString();
}
