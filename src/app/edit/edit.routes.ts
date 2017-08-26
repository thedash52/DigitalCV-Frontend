import { Route } from '@angular/router';
import { EditComponent } from './edit.component';
import { SetupEditComponent } from './setup-edit/setup-edit.component';

import { BasicRoutes } from './basic/index';
import { SkillsRoutes } from './skills/index';
import { TechnologyRoutes } from './technology/index';
import { ExperianceRoutes } from './experiance/index';
import { EducationRoutes } from './education/index';
import { OtherRoutes } from './other/index';

export const EditRoutes: Route[] = [
    { 
        path: 'edit', 
        component: EditComponent,
        children: [
            ...BasicRoutes,
            ...SkillsRoutes,
            ...TechnologyRoutes,
            ...ExperianceRoutes,
            ...EducationRoutes,
            ...OtherRoutes
        ]
    },
    {
        path: 'setup-edit',
        component: SetupEditComponent
    }
];