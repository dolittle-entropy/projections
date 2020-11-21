// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import sinon from 'sinon';
import { IOperation } from '../../IOperation';
import { OperationContext } from '../../OperationContext';
import { a_projection_with_two_operations } from './a_projection_with_two_operations';

export class a_projection_with_two_operations_and_child_operations extends a_projection_with_two_operations {
    firstOperationFirstChild: IOperation;
    firstOperationFirstChildPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});
    firstOperationSecondChild: IOperation;
    firstOperationSecondChildPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});
    secondOperationFirstChild: IOperation;
    secondOperationFirstChildPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});
    secondOperationSecondChild: IOperation;
    secondOperationSecondChildPerformStub: (operationContext: OperationContext) => any = sinon.stub().returns({});

    constructor() {
        super();

        this.firstOperationFirstChild = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.firstOperationFirstChildPerformStub
        };

        this.firstOperationSecondChild = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.firstOperationSecondChildPerformStub
        };

        this.firstOperation.children = [this.firstOperationFirstChild, this.firstOperationSecondChild];

        this.secondOperationFirstChild = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.secondOperationFirstChildPerformStub
        };

        this.secondOperationSecondChild = {
            eventTypes: [this.eventType],
            children: [],

            perform: this.secondOperationSecondChildPerformStub
        };

        this.secondOperation.children = [this.secondOperationFirstChild, this.secondOperationSecondChild];
    }
}
