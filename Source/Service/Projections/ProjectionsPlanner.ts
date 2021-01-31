// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Logger } from 'winston';

import { Projection } from './Projection';
import { ProjectionDescriptor } from '../../SDK/ProjectionDescriptor';
import { ScopeId, StreamId } from '@dolittle/sdk.events';

import { IStateManager } from '../IStateManager';
import { IProjectionsPlanner } from './IProjectionsPlanner';

import OperationTypes from '../../OperationTypes';
import { KeyStrategiesConverter } from '../Keys';
import { JoinEvent, OperationGroup, OperationsConverter, PostJoinEvent, PostRelationalPropertySet } from '../Operations';
import { ChildFromEvent } from '../Operations/ChildFromEvent';
import { ExpressionKeyStrategy } from '../Keys/ExpressionKeyStrategy';
import { Expression, ExpressionsConverter } from '../Expressions';
import { ExpressionOperation } from '../Operations/ExpressionOperation';


export class ProjectionsPlanner implements IProjectionsPlanner {

    constructor(
        private readonly _projectionsManager: IStateManager,
        private readonly _intermediatesManager: IStateManager,
        private readonly _logger: Logger) {
    }

    async planFrom(descriptor: ProjectionDescriptor): Promise<Projection> {
        const stream = StreamId.from(descriptor.stream);

        const fromOperations = descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.FromEvent.toString())
            .map(_ => OperationsConverter.toOperation(_));

        const joinOperations = descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.JoinEvent.toString())
            .map(_ => OperationsConverter.toOperation(_) as JoinEvent);

            /*
        const childFromEventOperations = descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.Child.toString())
            .map(_ => OperationsConverter.toOperation(_) as ChildFromEvent);*/

        const intermediateStateName = `intermediates-${stream.toString()}`;
        const intermediateState = await this._intermediatesManager.getFor(intermediateStateName);

        joinOperations.forEach(_ => {
            _.children.push(new PostJoinEvent(_.filter, _.keyStrategy, _.onProperty, []));

            // Find properties that matches the ON property - we want to

            const filtered = fromOperations
                .flatMap(o => o.children)
                .filter(o =>
                    (o instanceof ExpressionOperation) &&
                    (o as ExpressionOperation).hasAssignmentToProperty() &&
                    (o as ExpressionOperation).getAssignmentProperty().propertyAccessor.path.path === _.onProperty.path.path) as ExpressionOperation[];

            filtered.forEach(_ => {
                _.children.push(new PostRelationalPropertySet(_.keyStrategy, _.getAssignmentProperty().propertyAccessor, intermediateState, []));
            });
        });

        const joinsOperationGroup = new OperationGroup(
            'Join',
            stream,
            [new ExpressionKeyStrategy(Expression.property('eventContext.eventSourceId'))],
            joinOperations,
            [],
            intermediateState,
            this._logger
        );


        // Hook up properties that match the on() relationship and add child operation to the setting of this property on any From() operations

        const projectionState = await this._projectionsManager.getFor(descriptor.targetModel.name);
        const fromsOperationGroup = new OperationGroup(
            'From',
            stream,
            KeyStrategiesConverter.toKeyStrategies(descriptor.keyStrategies),
            fromOperations,
            [joinsOperationGroup],
            projectionState,
            this._logger
        );

        // Children group
        /*
        const childrenOperationGroup = new OperationGroup(
            'Children',
            stream,
            [new EventSourceKeyStrategy()],
            childFromEventOperations,
            [],
            intermediateState,
            this._logger
        );*/

        const projection = new Projection(stream, ScopeId.from(descriptor.scope), [fromsOperationGroup]);
        return projection;
    }
}

