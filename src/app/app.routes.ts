import { Routes } from '@angular/router';

import { DetailsRoutes } from './details/index';
import { EditRoutes } from './edit/index';
import { LoginRoutes } from './login/index';

import { AppComponent } from './app.component';
import { TestSiteComponent } from './test-site/index';
import { Page404Component } from "./page404/index";

export const routes: Routes = [
    ...DetailsRoutes,
    ...EditRoutes,
    ...LoginRoutes,
    { path: '', component: TestSiteComponent },
    { path: '**', component: Page404Component }
];