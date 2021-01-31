// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel, IDialogProps } from '@dolittle/vanir-react';
import { ProjectionsEditorDialogViewModel } from './ProjectionsEditorDialogViewModel';
import { ProjectionsEditorDialogInput } from './ProjectionsEditorDialogInput';
import { ProjectionsEditorDialogOutput } from './ProjectionsEditorDialogOutput';

export const ProjectionsEditorDialog = withViewModel<ProjectionsEditorDialogViewModel, IDialogProps<ProjectionsEditorDialogInput, ProjectionsEditorDialogOutput>>(ProjectionsEditorDialogViewModel, ({ viewModel }) => {
    return (
        <></>
    );
});