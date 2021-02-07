// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { DialogResult, IDialogProps, withViewModel } from '@dolittle/vanir-react';
import { FromEventEditorDialogViewModel } from './FromEventEditorDialogViewModel';
import { FromEventEditorDialogInput } from './FromEventEditorDialogInput';
import { FromEventEditorDialogOutput } from './FromEventEditorDialogOutput';
import {
    DefaultButton,
    DetailsList,
    Dialog,
    DialogFooter,
    DialogType,
    Dropdown,
    IColumn,
    IconButton,
    IDialogContentProps,
    IDropdown,
    IDropdownOption,
    PrimaryButton,
    SelectionMode,
    Stack,
    TextField
} from '@fluentui/react';
import ExpressionTypes from '../ExpressionTypes';
import { Guid } from '@dolittle/rudiments';
import { BinaryExpression } from '../BinaryExpression';
import { PropertyExpression } from '../PropertyExpression';
import { ExpressionTypeKey } from './ExpressionTypeKeys';
import { ConstantExpression } from '../ConstantExpression';

const dialogContentProps: IDialogContentProps = {
    type: DialogType.normal,
    title: 'From Event',
    closeButtonAriaLabel: 'Close'
};

const expressionTypes: IDropdownOption[] = [
    { key: ExpressionTypeKey.assignProperty, text: 'Assign property', data: ExpressionTypes.Assign },
    { key: ExpressionTypeKey.assignConstant, text: 'Assign constant', data: ExpressionTypes.Assign },
    { key: ExpressionTypeKey.addProperty, text: 'Add property', data: ExpressionTypes.Add },
    { key: ExpressionTypeKey.addConstant, text: 'Add constant', data: ExpressionTypes.Add },
    { key: ExpressionTypeKey.subtractProperty, text: 'Subtract property', data: ExpressionTypes.Subtract },
    { key: ExpressionTypeKey.subtractConstant, text: 'Subtract constant', data: ExpressionTypes.Subtract },
];

export const FromEventEditorDialog = withViewModel<FromEventEditorDialogViewModel, IDialogProps<FromEventEditorDialogInput, FromEventEditorDialogOutput>>(FromEventEditorDialogViewModel, ({ viewModel, props }) => {
    const done = () => {
        props.onClose(DialogResult.Success, {
            operation: {
                key: viewModel.operationKey,
                operationType: viewModel.operationType,
                eventType: viewModel.eventType?.id || Guid.empty,
                expressions: viewModel.expressions
            }
        });
    };

    function cancel() {
        props.onClose(DialogResult.Cancelled);
    }

    const eventTypeOptions = viewModel.eventTypes.map(_ => {
        const option: IDropdownOption = {
            key: _.id.toString(),
            text: _.name,
            data: _
        };
        return option;
    });

    const readModelProperties = props.input.readModelType?.properties.map(_ => {
        const option: IDropdownOption = {
            key: _.name,
            text: _.name,
            data: _
        };
        return option;
    }) || [];

    const eventTypeProperties = viewModel.eventType?.properties.map(_ => {
        const option: IDropdownOption = {
            key: _.name,
            text: _.name,
            data: _
        };
        return option;
    }) || [];


    const renderTargetColumn = (item: BinaryExpression) => {
        return <Dropdown
            defaultSelectedKey={(item.left as PropertyExpression).path}
            options={readModelProperties}
            onChange={(e, nv) => (item.left as PropertyExpression).path = nv?.key.toString() || ''} />;
    };

    const renderExpressionColumn = (item: BinaryExpression) => {
        return <Dropdown
            defaultSelectedKey={item.expressionType.toString()}
            options={expressionTypes}
            onChange={(e, nv) => viewModel.handleExpressionTypeFor(item, nv?.key as number || ExpressionTypeKey.assignProperty)}
        />;
    };

    const renderPropertySourceColumn = (item: BinaryExpression) => {
        return <Dropdown
            defaultSelectedKey={(item.right as PropertyExpression).path}
            options={eventTypeProperties}
            onChange={(e, nv) => (item.right as PropertyExpression).path = nv?.key.toString() || ''} />;
    };

    const renderConstantSourceColumn = (item: BinaryExpression) => {
        return <TextField
            defaultValue={(item.right as ConstantExpression).value}
            onChange={(e, nv) => (item.right as ConstantExpression).value = nv!} />;
    };

    const columns: IColumn[] = [
        {
            key: 'target',
            name: 'Target',
            minWidth: 150,
            onRender: renderTargetColumn
        },
        {
            key: 'expression',
            name: 'Expression',
            minWidth: 150,
            onRender: renderExpressionColumn
        },
        {
            key: 'source',
            name: 'Source',
            minWidth: 150,
            onRender: (item: BinaryExpression) => {
                if (item.right instanceof PropertyExpression) {
                    return renderPropertySourceColumn(item);
                }
                if (item.right instanceof ConstantExpression) {
                    return renderConstantSourceColumn(item);
                }

                return <></>;
            }
        }
    ];

    return (
        <Dialog
            minWidth={600}
            hidden={!props.visible}
            onDismiss={done}
            dialogContentProps={dialogContentProps}>

            <Stack>
                <Dropdown
                    label="Type"
                    defaultSelectedKey={viewModel.eventType?.toString()}
                    options={eventTypeOptions}
                    onChange={(e, nv) => viewModel.selectEventType(nv!.data)} />

                <DetailsList
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    items={viewModel.expressions} />

                <IconButton iconProps={{
                    iconName: 'CirclePlus'
                }} onClick={viewModel.addExpression} />

            </Stack>

            <DialogFooter>
                <PrimaryButton onClick={done} text="Done" />
                <DefaultButton onClick={cancel} text="Cancel" />
            </DialogFooter>
        </Dialog>
    );
});