// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import sinon from 'sinon';

describe('when handling with no operations', async () => {
    const context = new given.an_operation_group_without_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);

    (async beforeEach => {
        await context.operationGroup.handle(context.eventType, context.event, context.eventContext);
    })();

    it('should not get state', () => context.state.get.should.not.be.calledWith(key));
    it('should not set state', () => context.state.set.should.not.be.called);
});