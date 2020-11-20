// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { IProjections } from 'Source/Service/IProjections';
import { Logger } from 'winston';
import { LoggerInstance } from '../../SpecMocks/Logger';

export class all_dependencies {
    projections: IProjections;
    logger: Logger = LoggerInstance;

    constructor() {
        this.projections = {
            get: sinon.stub(),
            set: sinon.stub()
        };
    }
}
