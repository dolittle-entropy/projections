// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IProjectionFor, ProjectionBuilder, projectionFor } from '@dolittle/projections';
import { RuleDefined } from './events';
import { RuleStatistics } from './RuleStatistics';

@projectionFor(RuleStatistics, '1d675f6c-38c2-4c05-b3f3-f1e510994418')
export class RuleStatisticsProjection implements IProjectionFor<RuleStatistics> {
    define(projectionBuilder: ProjectionBuilder<RuleStatistics>) {
        projectionBuilder
            .configureModel(_ => _.withInitialState({
                groupId: 'e7c11f9f-65ed-4034-932b-c07da60b4db7',
                count: 0,
                typeSummed: 0
            }))
            .from(RuleDefined, f => f
                .usingCompositeKeyFromContext(
                    _ => _.occurred.year,
                    _ => _.occurred.month,
                    _ => _.occurred.day,
                    _ => _.occurred.hour
                )
                .add(r => r.typeSummed).with(r => r.type)
                .count(r => r.count));



        //.usingKeyFrom(r => r.priority)
        //.usingConstantKey('e7c11f9f-65ed-4034-932b-c07da60b4db7')
        /*.groupBy(_ => _.groupId, g => g
            .from(RuleDefined, f => f.count(r => r.count))
        );*/
    }
}
