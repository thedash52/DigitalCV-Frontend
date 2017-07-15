import { Route } from '@angular/router';
import { EditComponent } from './edit.component';

import { BasicRoutes } from './basic/index';
import { SkillsRoutes } from './skills/index';
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
            ...ExperianceRoutes,
            ...EducationRoutes,
            ...OtherRoutes
        ]
    }
];