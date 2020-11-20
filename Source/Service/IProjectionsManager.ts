// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjections } from './IProjections';

export abstract class IProjectionsManager {
    abstract getFor(name: string): Promise<IProjections>;
}
