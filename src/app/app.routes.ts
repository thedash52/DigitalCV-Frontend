import { Routes } from '@angular/router';

import { DetailsRoutes } from './details/index';

import { AppComponent } from './app.component';
import { DetailsComponent } from './details/index';
import { TestSiteComponent } from './test-site/index';

export const routes: Routes = [
    ...DetailsRoutes,
    { path: '', component: TestSiteComponent },
    { path: '**', component: TestSiteComponent }
];