import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, ButtonModule, ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule
  ],
  providers: [EditService, CvService, ConfirmationService],
  declarations: [EducationComponent],
  exports: [EducationComponent]
})
export class EducationModule { }
