// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor } from '../PropertyAccessor';
import { PropertyPath } from '../PropertyPath';

describe('when setting value for nested property without child instances there', () => {
    const instance = {
        first: {
            second: {
                third: 42
            }
        }
    };
    const valueToSet = 43;

    const accessor = new PropertyAccessor(new PropertyPath('first.second.third'));
    accessor.set(instance, valueToSet);

    it('should set the value', () => instance.first.second.third.should.equal(valueToSet));
});