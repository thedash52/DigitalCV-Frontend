import { Routes } from '@angular/router';

import { DetailsRoutes } from './details/index';
import { EditRoutes } from './edit/index';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/index';
import { TestSiteComponent } from './test-site/index';

export const routes: Routes = [
    ...DetailsRoutes,
    ...EditRoutes,
    { path: '', component: TestSiteComponent },
    { path: '**', component: TestSiteComponent }
];