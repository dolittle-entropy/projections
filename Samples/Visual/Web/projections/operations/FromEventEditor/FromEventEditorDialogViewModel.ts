// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { DataSource } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { injectable } from 'tsyringe';
import { EventTypeDefinition } from '../../../eventTypes/EventTypeDefinition';
import { AllEventTypeDefinitionsQuery } from '../../../eventTypes/AllEventTypeDefinitionsQuery';
import ExpressionTypes from '../ExpressionTypes';
import { BinaryExpression } from '../BinaryExpression';
import { PropertyExpression } from '../PropertyExpression';
import { ReadModelTypeDefinition } from '../../../readModelTypes/ReadModelTypeDefinition';
import { FromEventEditorDialogInput } from './FromEventEditorDialogInput';
import { FromEventEditorDialogOutput } from './FromEventEditorDialogOutput';
import { ExpressionTypeKey } from './ExpressionTypeKeys';
import { ConstantExpression } from '../ConstantExpression';
import { IDialogProps } from '@dolittle/vanir-react';
import { Guid } from '@dolittle/rudiments';

@injectable()
export class FromEventEditorDialogViewModel {
    eventTypes: EventTypeDefinition[] = [];
    eventType?: EventTypeDefinition;
    expressions: BinaryExpression[] = [];
    readModelType?: ReadModelTypeDefinition;

    operationKey: string = '';
    operationType: Guid = Guid.empty;

    constructor(private readonly dataSource: DataSource) {
    }

    async attached() {
    }

    propsChanged(props: IDialogProps<FromEventEditorDialogInput, FromEventEditorDialogOutput>) {
        if (props.input.operation) {
            this.operationKey = props.input.operation.key;
            this.operationType = props.input.operation.operationType;
            this.expressions = props.input.operation.expressions as BinaryExpression[] || [];
            this.eventTypes = props.input.eventTypes;
            if (props.input.operation.eventType) {
                this.eventType = this.eventTypes.find(_ => _.id === (props.input.operation.eventType.toString() as any));
            }
        }
    }


    selectEventType(eventType: EventTypeDefinition) {
        this.eventType = eventType;
    }

    addExpression() {
        const expression = new BinaryExpression();
        expression.expressionType = ExpressionTypes.Assign;
        expression.left = new PropertyExpression();
        this.expressions = [...this.expressions, expression];
    }

    handleExpressionTypeFor(expression: BinaryExpression, expressionTypeKey: ExpressionTypeKey) {
        switch (expressionTypeKey) {
            case ExpressionTypeKey.assignProperty: {
                expression.expressionType = ExpressionTypes.Assign;
                expression.right = new PropertyExpression();
            } break;
            case ExpressionTypeKey.assignConstant: {
                expression.expressionType = ExpressionTypes.Assign;
                expression.right = new ConstantExpression();
            } break;
            case ExpressionTypeKey.addProperty: {
                expression.expressionType = ExpressionTypes.Add;
                expression.right = new PropertyExpression();
            } break;
            case ExpressionTypeKey.addConstant: {
                expression.expressionType = ExpressionTypes.Add;
                expression.right = new ConstantExpression();
            } break;
            case ExpressionTypeKey.subtractProperty: {
                expression.expressionType = ExpressionTypes.Subtract;
                expression.right = new PropertyExpression();
            } break;
            case ExpressionTypeKey.subtractConstant: {
                expression.expressionType = ExpressionTypes.Subtract;
                expression.right = new ConstantExpression();
            } break;
        }

        this.expressions = [...this.expressions, ...[]];
    }
}