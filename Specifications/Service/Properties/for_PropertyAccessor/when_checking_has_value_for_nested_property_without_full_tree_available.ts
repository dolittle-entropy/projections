// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { PropertyAccessor, PropertyPath } from '@dolittle/projections/Service/Properties';

describe('when checking has value for nested property without full tree available', () => {
    const instance = {
        first: {
        }
    };

    const accessor = new PropertyAccessor(new PropertyPath('first.second.third'));
    const hasValue = accessor.isValueSet(instance);

    it('should not have the value', () => hasValue.should.be.false);
});