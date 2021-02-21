// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { StreamId } from '@dolittle/sdk.events';
import { all_dependencies } from './all_dependencies';
import { IKeyStrategy } from '@dolittle/projections/Service/Keys/IKeyStrategy';
import { OperationGroup } from '@dolittle/projections/Service/Operations/OperationGroup';

export class an_operation_group_without_operations extends all_dependencies {
    operationGroup: OperationGroup;
    keyStrategy: IKeyStrategy;

    constructor() {
        super();

        this.keyStrategy = {
            has: sinon.stub().returns(true),
            get: sinon.stub()
        };

        this.operationGroup = new OperationGroup(
            '',
            StreamId.from('0d17c309-afed-46b6-912f-69f136f0264e'),
            [this.keyStrategy],
            [],
            [],
            this.state,
            this.objectComparer,
            this.logger
        );
    }
}
