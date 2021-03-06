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
import { IOperation, JoinEvent, OperationGroup, OperationsConverter, PostJoinEvent, PostRelationalPropertySet } from '../Operations';
import { ChildFromEvent } from '../Operations/ChildFromEvent';
import { ExpressionKeyStrategy } from '../Keys/ExpressionKeyStrategy';
import { Expression, ExpressionsConverter } from '../Expressions';
import { ExpressionOperation } from '../Operations/ExpressionOperation';
import { IObjectComparer } from '../Changes/IObjectComparer';
import { IState } from '../IState';


export class ProjectionsPlanner implements IProjectionsPlanner {

    constructor(
        private readonly _projectionsManager: IStateManager,
        private readonly _intermediatesManager: IStateManager,
        private readonly _objectComparer: IObjectComparer,
        private readonly _logger: Logger) {
    }

    async planFrom(descriptor: ProjectionDescriptor): Promise<Projection> {
        const stream = StreamId.from(descriptor.stream);
        const intermediateStateName = `intermediates-${stream.toString()}`;
        const intermediateState = await this._intermediatesManager.getFor(intermediateStateName);
        const projectionState = await this._projectionsManager.getFor(descriptor.targetModel.name);

        const fromOperations = this.getFromOperationsFrom(descriptor);
        const joinOperations = this.getJoinOperationsFrom(descriptor);
        const childFromEventOperations = this.getChildFromEventOperationsFrom(descriptor);

        this.setupJoinOperations(joinOperations, fromOperations, intermediateState);

        const joinsOperationGroup = this.createOperationGroupForJoins(stream, joinOperations, intermediateState);
        const fromsOperationGroup = this.createOperationGroupForFroms(stream, descriptor, fromOperations, joinsOperationGroup, projectionState);

        // Children group
        /*const childrenOperationGroup = new OperationGroup(
            'Children',
            stream,
            [new EventSourceKeyStrategy()],
            childFromEventOperations,
            [],
            intermediateState,
            this._objectComparer,
            this._logger
        );*/

        const projection = new Projection(stream, ScopeId.from(descriptor.scope), [fromsOperationGroup]);
        return projection;
    }

    private createOperationGroupForFroms(stream: StreamId, descriptor: ProjectionDescriptor, fromOperations: IOperation[], joinsOperationGroup: OperationGroup, projectionState: IState) {
        return new OperationGroup(
            'From',
            stream,
            KeyStrategiesConverter.toKeyStrategies(descriptor.keyStrategies),
            fromOperations,
            [joinsOperationGroup],
            projectionState,
            this._objectComparer,
            this._logger
        );
    }

    private createOperationGroupForJoins(stream: StreamId, joinOperations: JoinEvent[], intermediateState: IState) {
        // Hook up properties that match the on() relationship and add child operation to the setting of this property on any From() operations
        return new OperationGroup(
            'Join',
            stream,
            [new ExpressionKeyStrategy(Expression.property('eventContext.eventSourceId'))],
            joinOperations,
            [],
            intermediateState,
            this._objectComparer,
            this._logger
        );
    }

    private setupJoinOperations(joinOperations: JoinEvent[], fromOperations: IOperation[], intermediateState: IState) {
        joinOperations.forEach(_ => {
            _.children.push(new PostJoinEvent(_.filter, _.keyStrategy, _.onProperty, []));
            const filtered = fromOperations
                .flatMap(o => o.children)
                .filter(o => (o instanceof ExpressionOperation) &&
                    (o as ExpressionOperation).hasAssignmentToProperty() &&
                    (o as ExpressionOperation).getAssignmentProperty().propertyAccessor.path.path === _.onProperty.path.path) as ExpressionOperation[];

            filtered.forEach(_ => {
                _.children.push(new PostRelationalPropertySet(_.keyStrategy, _.getAssignmentProperty().propertyAccessor, intermediateState, []));
            });
        });
    }

    private getChildFromEventOperationsFrom(descriptor: ProjectionDescriptor) {
        return descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.Child.toString())
            .map(_ => OperationsConverter.toOperation(_) as ChildFromEvent);
    }

    private getJoinOperationsFrom(descriptor: ProjectionDescriptor) {
        return descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.JoinEvent.toString())
            .map(_ => OperationsConverter.toOperation(_) as JoinEvent);
    }

    private getFromOperationsFrom(descriptor: ProjectionDescriptor) {
        return descriptor.operations
            .filter(_ => _.id.toString() === OperationTypes.FromEvent.toString())
            .map(_ => OperationsConverter.toOperation(_));
    }
}
