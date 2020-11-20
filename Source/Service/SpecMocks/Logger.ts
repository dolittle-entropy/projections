// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import winston, { LeveledLogMethod } from 'winston';

export class Logger {
    error: LeveledLogMethod = sinon.fake();
    warn: LeveledLogMethod = sinon.fake();
    info: LeveledLogMethod = sinon.fake();
    http: LeveledLogMethod = sinon.fake();
    verbose: LeveledLogMethod = sinon.fake();
    debug: LeveledLogMethod = sinon.fake();
    silly: LeveledLogMethod = sinon.fake();
}

export const LoggerInstance: winston.Logger = new Logger() as winston.Logger;