// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import { EventContext } from '@dolittle/sdk.events';
import sinon from 'sinon';

describe('when handling with no operations', async () => {
    const context = new given.a_projection_without_operations();
    const key = '8ff8defe-e307-454d-bc48-6dde046d906e';
    context.keyStrategy.get = sinon.stub().returns(key);

    await context.projection.handle({}, {} as EventContext);

    it('should not get projection', () => context.projections.get.should.not.be.calledWith(key));
    it('should not set projection', () => context.projections.set.should.not.be.called);

});