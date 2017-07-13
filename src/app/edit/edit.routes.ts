import { Route } from '@angular/router';
import { EditComponent } from './edit.component';

export const EditRoutes: Route[] = [
    { 
        path: 'edit', 
        component: EditComponent,
        children: [
            
        ]
    }
];