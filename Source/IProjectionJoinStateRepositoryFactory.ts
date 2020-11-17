// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IProjectionJoinStateRepository } from './IProjectionJoinStateRepository';


export abstract class IProjectionJoinStateRepositoryFactory {
    abstract getFor(name: string, relationName: string): Promise<IProjectionJoinStateRepository>;
}
