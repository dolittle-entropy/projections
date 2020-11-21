// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from './IState';

export abstract class IStateManager {
    abstract getFor(name: string): Promise<IState>;
}
