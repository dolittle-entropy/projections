// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { NullKeyStrategy } from '@dolittle/projections/Service/Keys/NullKeyStrategy';
import { IOperation } from '@dolittle/projections/Service/Operations/IOperation';
import { IOperationContext } from '@dolittle/projections/Service/Operations/IOperationContext';
import { an_operation_group_with_two_operations } from './an_operation_group_with_two_operations';
import { Expression } from '@dolittle/projections/Service/Expressions/Expression';

export class an_operation_group_with_two_operations_and_child_operations extends an_operation_group_with_two_operations {
    firstOperationFirstChild: IOperation;
    firstOperationFirstChildPerformStub: (operationContext: IOperationContext) => any = sinon.stub().returns({});
    firstOperationSecondChild: IOperation;
    firstOperationSecondChildPerformStub: (operationContext: IOperationContext) => any = sinon.stub().returns({});
    secondOperationFirstChild: IOperation;
    secondOperationFirstChildPerformStub: (operationContext: IOperationContext) => any = sinon.stub().returns({});
    secondOperationSecondChild: IOperation;
    secondOperationSecondChildPerformStub: (operationContext: IOperationContext) => any = sinon.stub().returns({});

    constructor() {
        super();

        const filter = Expression.equal(Expression.property('eventType'), Expression.constant(this.eventType));

        this.firstOperationFirstChild = {
            keyStrategy: new NullKeyStrategy(),
            filter,
            children: [],

            perform: this.firstOperationFirstChildPerformStub
        };

        this.firstOperationSecondChild = {
            keyStrategy: new NullKeyStrategy(),
            filter,
            children: [],

            perform: this.firstOperationSecondChildPerformStub
        };

        this.firstOperation.children = [this.firstOperationFirstChild, this.firstOperationSecondChild];

        this.secondOperationFirstChild = {
            keyStrategy: new NullKeyStrategy(),
            filter,
            children: [],

            perform: this.secondOperationFirstChildPerformStub
        };

        this.secondOperationSecondChild = {
            keyStrategy: new NullKeyStrategy(),
            filter,
            children: [],

            perform: this.secondOperationSecondChildPerformStub
        };

        this.secondOperation.children = [this.secondOperationFirstChild, this.secondOperationSecondChild];
    }
}
