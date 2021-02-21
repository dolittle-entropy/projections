// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { IStateManager } from '../IStateManager';
import { State } from './State';
import { StateConfiguration } from '../../StateConfiguration';
import { Logger } from 'winston';

export class StateManager implements IStateManager {
    constructor(private readonly _configuration: StateConfiguration, private readonly _logger: Logger) {
    }

    async getFor(name: string): Promise<IState> {
        return new State(this._configuration.provider, name, this._logger);
    }
}
