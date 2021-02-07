// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FromEvent } from './FromEvent';
import { JoinEvent } from './JoinEvent';
import { ChildFromEvent } from './ChildFromEvent';
import { Expression } from './Expression';

export const OperationDiscriminators = () => [FromEvent, JoinEvent, ChildFromEvent, Expression];