// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose';
import { ObjectType, Field, InputType } from 'type-graphql';
import { Guid } from '@dolittle/rudiments';
import { guid } from '@dolittle/vanir-backend/dist/data';
import { Operation } from './Operation';
import { OperationDiscriminators } from './OperationDiscriminators';
import { KeyStrategy } from './KeyStrategy';
import { OperationUnion } from './OperationUnion';

@ObjectType()
@InputType('ProjectionDefinitionInput')
@modelOptions({ options: { allowMixed: Severity.ALLOW } })
export class ProjectionDefinition {
    @Field({ name: 'id' })
    @guid()
    _id!: Guid;

    @Field()
    @guid()
    readModelType!: Guid;

    @Field(() => [KeyStrategy])
    @prop({ _id: false, type: KeyStrategy })
    keyStrategies: KeyStrategy[] = [];

    @Field(() => [OperationUnion])
    @prop({ type: Operation, discriminators: OperationDiscriminators })
    operations: Operation[] = [];
}

export const ProjectionDefinitionModel = getModelForClass(ProjectionDefinition);