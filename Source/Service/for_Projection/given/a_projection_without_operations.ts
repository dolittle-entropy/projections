// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { StreamId } from '@dolittle/sdk.events';
import { IKeyStrategy } from 'Source/Service/Keys/IKeyStrategy';
import { Projection } from '../..//Projection';
import { all_dependencies } from './all_dependencies';

export class a_projection_without_operations extends all_dependencies {
    projection: Projection;
    keyStrategy: IKeyStrategy;

    constructor() {
        super();

        this.keyStrategy = {
            has: sinon.stub().returns(true),
            get: sinon.stub()
        };

        this.projection = new Projection(
            StreamId.from('0d17c309-afed-46b6-912f-69f136f0264e'),
            [this.keyStrategy],
            [],
            this.projections,
            this.logger
        );
    }
}
