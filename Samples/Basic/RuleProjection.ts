// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ComponentAdded, FeatureAdded, RuleDefined } from './events';
import { ChildAdded } from './events/ChildAdded';
import { projectionFor, IProjectionFor, ProjectionBuilder } from '@dolittle/projections';
import { Rule } from './Rule';
import { SomeChild } from './SomeChild';

@projectionFor(Rule, '0f5ee25a-bcd6-4f14-9c53-7cb3540ab842')
export class RuleProjection implements IProjectionFor<Rule> {
    define(projectionBuilder: ProjectionBuilder<Rule>) {
        projectionBuilder
            .configureModel(_ => _.withName('TheRules'))
            //.withKeys(_ => _.usingProperty('ruleId').usingEventSourceId()) 
            .from(RuleDefined, e => e
                //.usingKeyFrom(r => r.ruleId)
                .set(r => r.type).to(ev => ev.type)
                .set(r => r.priority).to(ev => ev.priority)
                .set(r => r.featureId).to(ev => ev.featureId)
                .set(r => r.componentId).to(ev => ev.componentId)
                .set(r => r.lastUpdated).toContext(ec => ec.occurred)
                .set(r => r.magicNumber).toValue(42)
                .set(r => r.theId).toContext(ec => ec.eventSourceId)
            )
                
            /*.join(FeatureAdded, e => e
                .on(r => r.featureId)
                .usingKeyFrom(ev => ev.id)
                .set(r => r.featureName).to(ev => ev.name))
            .join(ComponentAdded, e => e
                .on(r => r.componentId)
                .set(r => r.componentName).to(ev => ev.name))
            .children(SomeChild, c => c
                .identifiedBy(cc => cc.id)
                .storedIn(cc => cc.children)
                .from(ChildAdded, cb => cb
                    .usingKeyFrom(cc => cc.ruleId)
                    .set(cc => cc.name).to(ev => ev.name)))*/;
    }
}
