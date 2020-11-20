// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as given from './given';
import { UnableToResolveKeyForEvent } from '../UnableToResolveKeyForEvent';
import sinon from 'sinon';

describe('when handling with no key strategies', async () => {
    const context = new given.a_projection_without_operations();
    context.keyStrategy.has = sinon.stub().returns(false);
    let exception: Error;

    try {
        await context.projection.handle(context.eventType, context.event, context.eventContext);
    } catch (ex) {
        exception = ex;
    }

    it('should throw unable to resolve key for event', () => exception.should.be.instanceOf(UnableToResolveKeyForEvent));
});