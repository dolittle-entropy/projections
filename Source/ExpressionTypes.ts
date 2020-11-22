// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ExpressionTypeId } from './ExpressionTypeId';

export default {
    Member: ExpressionTypeId.from('acaedb43-ffe0-4578-9bb3-791560608004'),
    Constant: ExpressionTypeId.from('1554d6f6-b74a-4973-8937-b1ee20f5f513'),
    Conditional: ExpressionTypeId.from('f94f1bc2-9014-49b4-8237-4be0bab24c0d'),
    IncrementExpression: ExpressionTypeId.from('31fd44b5-bf20-4671-8ebe-5df8581dcfe1'),
    DecrementExpression: ExpressionTypeId.from('62bb4b89-dd68-47e0-9f74-cb6f760fe4ec')
};