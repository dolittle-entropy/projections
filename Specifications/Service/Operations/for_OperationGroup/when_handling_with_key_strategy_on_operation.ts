// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import sinon from 'sinon';
import { OperationContext } from '@dolittle/projections/Service/Operations/OperationContext';

describe('when handling with key strategy on operation', async () => {
    const context = new given.an_operation_group_with_two_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);

    const operationKey = '10cdac2d-33ed-484b-ba19-3b0ca68c0b9a';

    context.firstOperation.keyStrategy = {
        has: (operationContext: OperationContext) => true,
        get: (operationContext: OperationContext) => operationKey
    };

    (async beforeEach => {
        await context.operationGroup.handle(context.eventType, context.event, context.eventContext);
    })();

    it('should get state using key from operation', () => context.state.get.should.be.calledWith(operationKey));
});