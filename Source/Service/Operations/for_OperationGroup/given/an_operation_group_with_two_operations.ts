// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';

import { StreamId } from '@dolittle/sdk.events';
import { IKeyStrategy } from '../../../Keys/IKeyStrategy';
import { OperationGroup } from '../..//OperationGroup';
import { IOperation } from '../../IOperation';
import { OperationContext } from '../../OperationContext';

import { all_dependencies } from './all_dependencies';

export class an_operation_group_with_two_operations extends all_dependencies {
    operationGroup: OperationGroup;
    keyStrategy: IKeyStrategy;

    firstOperation: IOperation;
    firstOperationPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});
    secondOperation: IOperation;
    secondOperationPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});

    constructor() {
        super();

        this.keyStrategy = {
            has: sinon.stub().returns(true),
            get: sinon.stub()
        };

        this.firstOperation = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.firstOperationPerformStub
        };

        this.secondOperation = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.secondOperationPerformStub
        };

        this.operationGroup = new OperationGroup(
            '',
            StreamId.from('0d17c309-afed-46b6-912f-69f136f0264e'),
            [this.keyStrategy],
            [this.firstOperation, this.secondOperation],
            [],
            this.state,
            this.logger
        );
    }
}
