// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import sinon from 'sinon';

describe('when handling with two operations with changes with initial state', async () => {
    const context = new given.a_projection_with_two_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);
    const initialState = {initial:'state'};
    const firstChange = {something:'new'};
    const secondChange = {aSecond:'change'};
    const combinedChanges = {...initialState, ...firstChange, ...secondChange};

    context.projections.get = sinon.stub().returns(initialState);
    context.firstOperation.perform = sinon.stub().returns(firstChange);
    context.secondOperation.perform = sinon.stub().returns(secondChange);

    (async beforeEach => {
        await context.projection.handle(context.eventType, context.event, context.eventContext);
    })();

    it('should set projection with the changes', () => context.projections.set.should.be.calledWith(key, combinedChanges));
});