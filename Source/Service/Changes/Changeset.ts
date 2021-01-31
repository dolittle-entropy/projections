// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IState } from '../IState';
import { Change } from './Change';

export class Changeset {
    static readonly noChanges: Changeset = new Changeset([]);

    constructor(readonly changes: Change[]) {
    }

    get hasChanges() {
        return this.changes.length > 0;
    }

    mergeWith(changeset: Changeset) {
        return new Changeset([...this.changes, ...changeset.changes]);
    }

    async apply(key: any, model: any, state: IState): Promise<void> {
        for (const change of this.changes) {
            await change.apply(model, state);
        }
        await state.set(key, model);
    }
}
