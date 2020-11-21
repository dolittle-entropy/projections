// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import sinon from 'sinon';

describe('when handling with two operations with children and changes without initial state', async () => {
    const context = new given.a_projection_with_two_operations_and_child_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);
    const firstChange = { first: '1st' };
    const firstFirstChildChange = { firstFirst: '1st 1st' };
    const firstSecondChildChange = { firstSecond: '1st 2nd' };

    const secondChange = { second: '2nd' };
    const secondFirstChildChange = { secondFirst: '2nd 1st' };
    const secondSecondChildChange = { secondSecond: '2nd 2nd' };
    const combinedChanges = {
        ...firstChange,
        ...firstFirstChildChange,
        ...firstSecondChildChange,
        ...secondChange,
        ...secondFirstChildChange,
        ...secondSecondChildChange,
    };

    context.firstOperation.perform = sinon.stub().returns(firstChange);
    context.firstOperationFirstChild.perform = sinon.stub().returns(firstFirstChildChange);
    context.firstOperationSecondChild.perform = sinon.stub().returns(firstSecondChildChange);
    context.secondOperation.perform = sinon.stub().returns(secondChange);
    context.secondOperationFirstChild.perform = sinon.stub().returns(secondFirstChildChange);
    context.secondOperationSecondChild.perform = sinon.stub().returns(secondSecondChildChange);

    (async beforeEach => {
        await context.projection.handle(context.eventType, context.event, context.eventContext);
    })();

    it('should get projection', () => context.projections.get.should.be.calledWith(key));
    it('should set projection with all the changes', () => context.projections.set.should.be.calledWith(key, combinedChanges));
});