// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { EventContext } from '@dolittle/sdk.events';
import { Guid } from '@dolittle/rudiments';
import { IKeyStrategy } from './IKeyStrategy';


export class PropertyKeyStrategy implements IKeyStrategy {

    constructor(private readonly _propertyPath: string) {
    }

    get(event: any, eventContext: EventContext): Guid {
        throw new Error('Method not implemented.');
    }

}
