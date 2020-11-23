// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor, PropertyPath } from '@dolittle/projections/Service/Properties';

describe('when getting value for nested property', () => {
    const instance = {
        first: {
            second: {
                third: 42
            }
        }
    };

    const accessor = new PropertyAccessor(new PropertyPath('first.second.third'));
    const value = accessor.get(instance);

    it('should return the value', () => value.should.equal(instance.first.second.third));
});