// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OperationDescriptor } from '../../SDK/OperationDescriptor';
import { PropertyAccessor } from '../Properties/PropertyAccessor';
import { PropertyPath } from '../Properties';
import { FromEvent } from './FromEvent';
import { JoinEvent } from './JoinEvent';
import { UnknownOperation } from './UnknownOperation';
import OperationTypes from '../../OperationTypes';
import { KeyStrategyDescriptor } from '../../SDK/KeyStrategyDescriptor';
import { KeyStrategiesConverter } from '../Keys';
import { NullKeyStrategy } from '../Keys/NullKeyStrategy';
import * as SdkExpressions from '../../SDK/Expressions';
import { ExpressionsConverter } from '../Expressions/ExpressionsConverter';
import { ExpressionOperation } from './ExpressionOperation';
import { IOperation } from './IOperation';
import { ChildFromEvent } from './ChildFromEvent';

export type PropertyMapConfiguration = {
    sourceProperty: string;
    targetProperty: string;
};

export type FromEventConfiguration = {
    keyStrategy: KeyStrategyDescriptor;
};

export type JoinEventConfiguration = {
    onProperty: string;
    keyStrategy: KeyStrategyDescriptor;
};

export type ChildConfiguration = {
    storedInProperty: string;
    identifierProperty: string;
};

export class OperationsConverter {

    static toOperation(descriptor: OperationDescriptor): IOperation {
        switch (descriptor.id) {
            case OperationTypes.FromEvent: {
                const configuration: FromEventConfiguration = descriptor.configuration;
                return new FromEvent(
                    ExpressionsConverter.toExpression(descriptor.filter),
                    KeyStrategiesConverter.toKeyStrategy(configuration.keyStrategy),
                    this.toOperations(descriptor.children));
            };
            case OperationTypes.JoinEvent: {
                const configuration: JoinEventConfiguration = descriptor.configuration;
                const onProperty = new PropertyAccessor(new PropertyPath(configuration.onProperty));
                return new JoinEvent(
                    ExpressionsConverter.toExpression(descriptor.filter),
                    KeyStrategiesConverter.toKeyStrategy(configuration.keyStrategy),
                    onProperty,
                    this.toOperations(descriptor.children));
            };
            case OperationTypes.Child: {
                const configuration: ChildConfiguration = descriptor.configuration;
                const identifiedByProperty = new PropertyAccessor(new PropertyPath(configuration.identifierProperty));
                const storedInProperty = new PropertyAccessor(new PropertyPath(configuration.storedInProperty));
                return new ChildFromEvent(
                    ExpressionsConverter.toExpression(descriptor.filter),
                    new NullKeyStrategy(),
                    identifiedByProperty,
                    storedInProperty,
                    this.toOperations(descriptor.children));
            }
            case OperationTypes.Expression: {
                const sdkExpression = descriptor.configuration as SdkExpressions.Expression;
                const expression = ExpressionsConverter.toExpression(sdkExpression);
                return new ExpressionOperation(expression, new NullKeyStrategy(), this.toOperations(descriptor.children));
            };
        }

        throw new UnknownOperation(descriptor.id);
    }


    static toOperations(children: OperationDescriptor[]): IOperation[] {
        return children.map(_ => this.toOperation(_));
    }
}