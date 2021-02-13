// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { IDropdownOption, IDropdownProps, Dropdown } from '@fluentui/react';
import { FieldType } from '../common/FieldType';

const fieldTypeOptions: IDropdownOption[] = [
    { key: FieldType.number, text: 'Number' },
    { key: FieldType.boolean, text: 'Boolean' },
    { key: FieldType.string, text: 'String' },
    { key: FieldType.date, text: 'Date' }
];

export type FieldTypeChanged = (type: FieldType) => void;


export interface FieldTypeDropDownProps {
    label?: string;
    type?: FieldType;
    onChange?: FieldTypeChanged
}


export const FieldTypeDropdown = (props: FieldTypeDropDownProps) => {
    const [type, setType] = useState(props.type || FieldType.string);

    return <Dropdown {...props} defaultSelectedKey={type} options={fieldTypeOptions} onChange={(e, nv) => {
        const fieldType = nv!.key as FieldType;
        setType(fieldType);
        props.onChange?.(fieldType);
    }} />;
};
