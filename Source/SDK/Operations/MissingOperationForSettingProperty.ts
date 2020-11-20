// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class MissingOperationForSettingProperty extends Error {
    constructor(targetProperty: string) {
        super(`The property '${targetProperty}' has not been configured with an operation for populating it`);
    }
}
