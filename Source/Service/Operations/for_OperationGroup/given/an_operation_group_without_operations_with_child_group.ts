// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { StreamId } from '@dolittle/sdk.events';
import { IKeyStrategy } from '../../../Keys/IKeyStrategy';
import { all_dependencies } from './all_dependencies';
import { OperationGroup } from '../../../Operations/OperationGroup';
import { IOperationGroup } from '../../../Operations/IOperationGroup';
import { IState } from '../../../IState';

export class an_operation_group_without_operations_with_child_group extends all_dependencies {
    operationGroup: OperationGroup;
    keyStrategy: IKeyStrategy;
    childGroup: IOperationGroup;

    constructor() {
        super();

        this.childGroup = {
            name: 'child',
            children: [],
            operations: [],
            state: {} as IState,

            handle: sinon.stub()
        };

        this.keyStrategy = {
            has: sinon.stub().returns(true),
            get: sinon.stub()
        };

        this.operationGroup = new OperationGroup(
            '',
            StreamId.from('0d17c309-afed-46b6-912f-69f136f0264e'),
            [this.keyStrategy],
            [],
            [this.childGroup],
            this.state,
            this.logger
        );
    }
}
