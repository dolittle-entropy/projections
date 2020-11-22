// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Logger } from 'winston';

import { Projection } from './Projection';
import { ProjectionDescriptor } from '../../SDK/ProjectionDescriptor';
import { ScopeId, StreamId } from '@dolittle/sdk.events';
import { EventSourceKeyStrategy } from '../Keys/EventSourceKeyStrategy';

import { IStateManager } from '../IStateManager';
import { IProjectionsPlanner } from './IProjectionsPlanner';

import OperationTypes from '../../OperationTypes';
import { KeyStrategiesConverter } from '../Keys';
import { OperationGroup, OperationsConverter } from '../Operations';


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
            .map(_ => OperationsConverter.toOperation(_));

        const joinOperations = descriptor.operations
            .filter(_ => _.id === OperationTypes.JoinEvent)
            .map(_ => OperationsConverter.toOperation(_));

        const intermediateStateName = `intermediates-${stream.toString()}`;
        const intermediateState = await this._intermediatesManager.getFor(intermediateStateName);

        const joinsOperationGroup = new OperationGroup(
            'Join',
            stream,
            [new EventSourceKeyStrategy()],
            joinOperations,
            [],
            intermediateState,
            this._logger
        );

        // Children group

        // Post Joins group

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

        const projection = new Projection(stream, ScopeId.from(descriptor.scope), [fromsOperationGroup]);

        return projection;
    }
}

