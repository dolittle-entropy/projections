// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from './ExpressionTypeId';

export default {
    Property: ExpressionTypeId.from('acaedb43-ffe0-4578-9bb3-791560608004'),
    Constant: ExpressionTypeId.from('1554d6f6-b74a-4973-8937-b1ee20f5f513'),
    Assign: ExpressionTypeId.from('37a4dc59-50de-458c-bc64-09c5e084e8e3'),
    Add: ExpressionTypeId.from('2bbe70af-5859-40ed-9837-d56cb1c4b006'),
    Subtract: ExpressionTypeId.from('5ef07764-bfef-4026-bd24-88c9bf590348'),
    Multiply: ExpressionTypeId.from('d8f7bd43-27a8-437d-876a-5270af590e6f'),
    Divide: ExpressionTypeId.from('4f98db9c-7757-4072-af82-0b80ee7cb320'),
    Equal: ExpressionTypeId.from('99f16e8d-bddb-4b61-ba06-17bc2b9df15f'),
    NotEqual: ExpressionTypeId.from('860e483e-f9b8-47db-b65e-ec3aa329a9d3'),
    GreaterThan: ExpressionTypeId.from('3f0ccb8f-2930-4e2d-a523-ad0f06861c5f'),
    LessThan: ExpressionTypeId.from('95a7bf0f-9f40-49bd-8acb-d45f90ec2e83'),
    GreaterThanOrEqual: ExpressionTypeId.from('10e262ed-3430-4acc-ba12-5bf093be26df'),
    LessThanOrEqual: ExpressionTypeId.from('9f578fe3-a6e3-4165-991e-9c4c1c3067bd'),
    And: ExpressionTypeId.from('7125599e-dc57-402a-8fd2-61679082070e'),
    Or: ExpressionTypeId.from('dc5e5a49-dc5d-4b4d-aa41-fae416b29818'),
    Concat: ExpressionTypeId.from('4e49d0cf-1c62-48b2-bade-89789f5f7f79'),
    NoOp: ExpressionTypeId.from('93d6866d-dd07-4443-9816-aa7baebec0e0')
};