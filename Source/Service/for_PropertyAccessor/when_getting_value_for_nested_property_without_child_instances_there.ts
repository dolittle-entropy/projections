// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '../PropertyAccessor';
import { PropertyPath } from '../PropertyPath';

describe('when getting value for nested property without child instances there', () => {
    const instance: any = {};

    const accessor = new PropertyAccessor(new PropertyPath('first.second.third'));
    const value = accessor.get(instance);

    it('should return the value', () => (value === undefined).should.be.true);
});