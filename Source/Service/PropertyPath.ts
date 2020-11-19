// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Represents the path for accessing a property supporting nested trees. Access to lower levels in the tree
 * is represented as a . (dot) e.g.: topLevel.lowerLevel.lowestLevel.
 */
export class PropertyPath {
    readonly segments: string[];

    /**
     * Initializes a new instance of {@link PropertyPath}.
     * @param path Path to the property represented as string.
     */
    constructor(readonly path: string) {
        this.segments = path.split('.');
    }
}
