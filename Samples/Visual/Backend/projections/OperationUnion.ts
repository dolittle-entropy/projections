// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createUnionType } from 'type-graphql';
import { FromEvent } from './FromEvent';
import { JoinEvent } from './JoinEvent';

export const OperationUnion = createUnionType({
    name: 'Operation',
    types: () => [FromEvent, JoinEvent] as const
});

