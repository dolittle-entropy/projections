// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { SomeChild } from './SomeChild';

export class Rule {
    type!: number;
    priority!: number;
    featureId!: string;
    featureName!: string;
    componentId!: string;
    componentName!: string;
    lastUpdated!: Date;
    children!: SomeChild[];
    magicNumber!: number;
}
