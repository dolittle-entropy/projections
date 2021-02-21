// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { Change } from './Change';
import { EventContext } from '@dolittle/sdk.events';



export class Changeset {
    static noChanges(context: EventContext): Changeset {
        return new Changeset([], context);
    }

    constructor(readonly changes: Change[], readonly context: EventContext) {
    }

    get hasChanges() {
        return this.changes.length > 0;
    }

    mergeWith(changeset: Changeset) {
        return new Changeset([...this.changes, ...changeset.changes], this.context);
    }

    async apply(key: any, model: any, state: IState): Promise<void> {
        for (const change of this.changes) {
            await change.apply(model, state, this.context);
        }
        await state.set(key, model, this.context);
    }
}
