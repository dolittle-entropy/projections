// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionRepository } from './IProjectionRepository';

export abstract class IProjectionRepositoryFactory {
    abstract getFor(name: string): Promise<IProjectionRepository>;
}
