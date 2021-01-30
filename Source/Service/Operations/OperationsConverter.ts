// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ChildOperationDescriptor } from '../../SDK/ChildOperationDescriptor';
import { OperationDescriptor } from '../../SDK/OperationDescriptor';
import { PropertyAccessor } from '../Properties/PropertyAccessor';
import { PropertyPath } from '../Properties';
import { FromEvent } from './FromEvent';
import { IOperationContext } from './IOperationContext';
import { JoinEvent } from './JoinEvent';
import { PropertyMapper } from './PropertyMapper';
import { PropertyUtilities } from '../../PropertyUtilities';
import { IChildOperation } from './IChildOperation';
import { UnknownOperation } from './UnknownOperation';
import { UnknownChildOperation } from './UnknownChildOperation';
import OperationTypes from '../../OperationTypes';
import ChildOperationTypes from '../../ChildOperationTypes';
import { KeyStrategyDescriptor } from '../../SDK/KeyStrategyDescriptor';
import { KeyStrategiesConverter } from '../Keys';
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

    static toOperation(descriptor: OperationDescriptor) {
        switch (descriptor.id) {
            case OperationTypes.FromEvent: {
                const configuration: FromEventConfiguration = descriptor.configuration;
                return new FromEvent(descriptor.eventTypes, KeyStrategiesConverter.toKeyStrategy(configuration.keyStrategy), this.toOperations(descriptor.children));
            };
            case OperationTypes.JoinEvent: {
                const configuration: JoinEventConfiguration = descriptor.configuration;
                const onProperty = new PropertyAccessor(new PropertyPath(configuration.onProperty));
                return new JoinEvent(descriptor.eventTypes, KeyStrategiesConverter.toKeyStrategy(configuration.keyStrategy), onProperty, this.toOperations(descriptor.children));
            };
            case OperationTypes.Child: {
                const configuration: ChildConfiguration = descriptor.configuration;
                const identifierProperty = new PropertyAccessor(new PropertyPath(configuration.identifierProperty));
                throw new Error('Not implemented');
                //return new ChildFromEvent(descriptor.eventTypes, nullKeyStrategy, this.toOperations(descriptor.children));
            }
        }

        throw new UnknownOperation(descriptor.id);
    }


    static toOperations(children: ChildOperationDescriptor[]): IChildOperation[] {
        return children.map(_ => {
            switch (_.id) {
                case ChildOperationTypes.PropertyMap: {
                    const config = _.configuration as PropertyMapConfiguration;
                    const eventProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.event);
                    const sourceProperty = new PropertyAccessor(new PropertyPath(`${eventProperty.path}.${config.sourceProperty}`));
                    const targetProperty = new PropertyAccessor(new PropertyPath(`${config.targetProperty}`));
                    throw new Error('Not implemented');
                    //return new PropertyMapper(sourceProperty, targetProperty, new NullKeyStrategy(), this.toOperations(_.children));
                };
                case ChildOperationTypes.PropertyMapFromContext: {
                    const config = _.configuration as PropertyMapConfiguration;
                    const eventContextProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.eventContext);
                    const sourceProperty = new PropertyAccessor(new PropertyPath(`${eventContextProperty.path}.${config.sourceProperty}`));
                    const targetProperty = new PropertyAccessor(new PropertyPath(`${config.targetProperty}`));
                    throw new Error('Not implemented');
                    //return new PropertyMapper(sourceProperty, targetProperty, new NullKeyStrategy(), this.toOperations(_.children));
                };
            }

            throw new UnknownChildOperation(_.id);
        });
    }
}