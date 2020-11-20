// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { EventContext } from '@dolittle/sdk.events';
import { IKeyStrategy } from './IKeyStrategy';


export class PropertyKeyStrategy implements IKeyStrategy {

    constructor(private readonly _propertyPath: string) {
    }

    has(event: any, eventContext: EventContext): boolean {
        throw new Error('Method not implemented.');
    }

    get(event: any, eventContext: EventContext): any {
        throw new Error('Method not implemented.');
    }

}
