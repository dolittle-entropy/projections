// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder } from '@dolittle/projections';
import { RuleDefined } from './events';
import { RuleStatistics } from './RuleStatistics';

export class RuleStatisticsProjection implements IProjectionFor<RuleStatistics> {
    define(projectionBuilder: ProjectionBuilder<RuleStatistics>) {
        projectionBuilder
            .groupBy(_ => _.groupId, g => g
                .from(RuleDefined, f => f.count(r => r.count))
            );
    }
}
