// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { EventContext } from '@dolittle/sdk.events';

export abstract class Change {
    abstract apply(model: any, state: IState, context: EventContext): Promise<void>;
    abstract toString();
}
