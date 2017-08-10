import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';

import { CvService } from "../shared/index";

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
    providers: [CvService]
})

export class DetailsModule { }