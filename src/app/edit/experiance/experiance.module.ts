import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperianceComponent } from './experiance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule } from '@angular/material';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule
  ],
  providers: [EditService, CvService],
  declarations: [ExperianceComponent],
  exports: [ExperianceComponent]
})
export class ExperianceModule { }
