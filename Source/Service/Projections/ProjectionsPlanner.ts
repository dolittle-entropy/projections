// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Projection } from './Projection';
import { ProjectionDescriptor } from '../../SDK/ProjectionDescriptor';
import { ScopeId, StreamId } from '@dolittle/sdk.events';
import { EventSourceKeyStrategy } from '../Keys/EventSourceKeyStrategy';
import { PropertyKeyStrategy } from '../Keys/PropertyKeyStrategy';
import { UnknownKeyStrategy } from '../UnknownKeyStrategy';
import { FromEvent } from '../Operations/FromEvent';

import { OperationDescriptor } from '../../SDK/OperationDescriptor';
import { ChildOperationDescriptor } from '../../SDK/ChildOperationDescriptor';
import { JoinEvent } from '../Operations/JoinEvent';
import { UnknownOperation } from '../UnknownOperation';
import { UnknownChildOperation } from '../UnknownChildOperation';
import { PropertyMapper } from '../Operations/PropertyMapper';
import { IChildOperation } from '../IChildOperation';

import KeyStrategyTypes from '../../KeyStrategyTypes';
import OperationTypes from '../../OperationTypes';
import ChildOperationTypes from '../../ChildOperationTypes';
import { PropertyPath } from '../PropertyPath';
import { PropertyUtilities } from '../../PropertyUtilities';
import { IOperationContext } from '../IOperationContext';
import { PropertyAccessor } from '../PropertyAccessor';
import { OperationGroup } from '../OperationGroup';
import { IStateManager } from '../IStateManager';
import { IProjectionsPlanner } from './IProjectionsPlanner';

import { Logger } from 'winston';


export type PropertyMapConfiguration = {
    sourceProperty: string;
    targetProperty: string;
};

export class ProjectionsPlanner implements IProjectionsPlanner {

    constructor(
        private readonly _projectionsManager: IStateManager,
        private readonly _intermediatesManager: IStateManager,
        private readonly _logger: Logger) {
    }

    async planFrom(descriptor: ProjectionDescriptor): Promise<Projection> {
        const stream = StreamId.from(descriptor.stream);

        const fromOperations = descriptor.operations
            .filter(_ => _.id === OperationTypes.FromEvent)
            .map(_ => this.buildOperationFrom(_));

        const joinOperations = descriptor.operations
            .filter(_ => _.id === OperationTypes.JoinEvent)
            .map(_ => this.buildOperationFrom(_));

        const intermediateStateName = `intermediates-${stream.toString()}`;
        const intermediateState = await this._intermediatesManager.getFor(intermediateStateName);

        const joinsOperationGroup = new OperationGroup(
            stream,
            [new EventSourceKeyStrategy()],
            joinOperations,
            [],
            intermediateState,
            this._logger
        );


        const projectionState = await this._projectionsManager.getFor(descriptor.targetModel.name);
        const topLevelOperationGroup = new OperationGroup(
            stream,
            this.getKeyStrategiesFor(descriptor),
            fromOperations,
            [joinsOperationGroup],
            projectionState,
            this._logger
        );

        const projection = new Projection(stream, ScopeId.from(descriptor.scope), [topLevelOperationGroup]);

        return projection;
    }

    private getKeyStrategiesFor(descriptor: ProjectionDescriptor) {
        return descriptor.keyStrategies.map(_ => {

            switch (_.id) {
                case KeyStrategyTypes.EventSourceIdentifier: {
                    return new EventSourceKeyStrategy();
                };
                case KeyStrategyTypes.Property: {
                    return new PropertyKeyStrategy(_.configuration);
                }
            }

            throw new UnknownKeyStrategy(_.id);
        });
    }

    private buildOperationFrom(descriptor: OperationDescriptor) {
        switch (descriptor.id) {
            case OperationTypes.FromEvent: {
                return new FromEvent(descriptor.eventTypes, this.buildChildOperations(descriptor.children));
            };
            case OperationTypes.JoinEvent: {
                return new JoinEvent(descriptor.eventTypes, this.buildChildOperations(descriptor.children));
            };
        }

        throw new UnknownOperation(descriptor.id);
    }


    private buildChildOperations(children: ChildOperationDescriptor[]): IChildOperation[] {
        return children.map(_ => {
            switch (_.id) {
                case ChildOperationTypes.PropertyMap: {
                    const config = _.configuration as PropertyMapConfiguration;
                    const eventProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.event);
                    const sourceProperty = new PropertyAccessor(new PropertyPath(`${eventProperty.path}.${config.sourceProperty}`));
                    const targetProperty = new PropertyAccessor(new PropertyPath(`${config.targetProperty}`));
                    return new PropertyMapper(sourceProperty, targetProperty, this.buildChildOperations(_.children));
                };
                case ChildOperationTypes.PropertyMapFromContext: {
                    const config = _.configuration as PropertyMapConfiguration;
                    const eventContextProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.eventContext);
                    const sourceProperty = new PropertyAccessor(new PropertyPath(`${eventContextProperty.path}.${config.sourceProperty}`));
                    const targetProperty = new PropertyAccessor(new PropertyPath(`${config.targetProperty}`));
                    return new PropertyMapper(sourceProperty, targetProperty, this.buildChildOperations(_.children));
                };
            }

            throw new UnknownChildOperation(_.id);
        });
    }
}

