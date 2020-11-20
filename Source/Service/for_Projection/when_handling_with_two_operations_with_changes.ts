// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import sinon from 'sinon';

describe('when handling with two operations with changes', async () => {
    const context = new given.a_projection_with_two_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);

    context.firstOperation.perform = sinon.stub().returns({something:'new'});
    context.secondOperation.perform = sinon.stub().returns({aSecond:'change'});

    (async beforeEach => {
        await context.projection.handle(context.eventType, context.event, context.eventContext);
    })();

    it('should get projection', () => context.projections.get.should.be.calledWith(key));
    it('should set projection', () => context.projections.set.should.be.called);
});