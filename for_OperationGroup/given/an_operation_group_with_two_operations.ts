// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';

import { StreamId } from '@dolittle/sdk.events';
import { IKeyStrategy } from '@dolittle/projections/Service/Keys/IKeyStrategy';
import { OperationGroup } from '@dolittle/projections/Service/Operations/OperationGroup';
import { IOperation } from '@dolittle/projections/Service/Operations/IOperation';
import { OperationContext } from '@dolittle/projections/Service/Operations/OperationContext';

import { all_dependencies } from './all_dependencies';
import { NullKeyStrategy } from '@dolittle/projections/Service/Keys/NullKeyStrategy';
import { Expression } from '@dolittle/projections/Service/Expressions/Expression';

export class an_operation_group_with_two_operations extends all_dependencies {
    operationGroup: OperationGroup;
    keyStrategy: IKeyStrategy;

    firstOperation: IOperation;
    firstOperationPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});
    secondOperation: IOperation;
    secondOperationPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});

    constructor() {
        super();

        const filter = Expression.equal(Expression.property('eventType'), Expression.constant(this.eventType));

        this.keyStrategy = {
            has: sinon.stub().returns(true),
            get: sinon.stub()
        };

        this.firstOperation = {
            keyStrategy: new NullKeyStrategy(),
            filter,
            children: [],

            perform: this.firstOperationPerformStub
        };

        this.secondOperation = {
            keyStrategy: new NullKeyStrategy(),
            filter,
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
            this.objectComparer,
            this.logger
        );
    }
}
