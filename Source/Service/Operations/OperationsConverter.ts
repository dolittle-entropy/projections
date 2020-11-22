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

export type PropertyMapConfiguration = {
    sourceProperty: string;
    targetProperty: string;
};

export type JoinEventConfiguration = {
    onProperty: string;
    keyStrategy: KeyStrategyDescriptor;
};

export class OperationsConverter {

    static toOperation(descriptor: OperationDescriptor) {
        switch (descriptor.id) {
            case OperationTypes.FromEvent: {
                return new FromEvent(descriptor.eventTypes, this.toOperations(descriptor.children));
            };
            case OperationTypes.JoinEvent: {
                const configuration: JoinEventConfiguration = descriptor.configuration;
                const eventProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.event);
                const onProperty = new PropertyAccessor(new PropertyPath(`${eventProperty.path}.${configuration.onProperty}`));
                return new JoinEvent(descriptor.eventTypes, onProperty, this.toOperations(descriptor.children));
            };
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
                    return new PropertyMapper(sourceProperty, targetProperty, this.toOperations(_.children));
                };
                case ChildOperationTypes.PropertyMapFromContext: {
                    const config = _.configuration as PropertyMapConfiguration;
                    const eventContextProperty = PropertyUtilities.getPropertyDescriptorFor<IOperationContext>(_ => _.eventContext);
                    const sourceProperty = new PropertyAccessor(new PropertyPath(`${eventContextProperty.path}.${config.sourceProperty}`));
                    const targetProperty = new PropertyAccessor(new PropertyPath(`${config.targetProperty}`));
                    return new PropertyMapper(sourceProperty, targetProperty, this.toOperations(_.children));
                };
            }

            throw new UnknownChildOperation(_.id);
        });
    }
}