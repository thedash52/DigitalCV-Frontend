import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperianceComponent } from './experiance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdCheckboxModule } from '@angular/material';

import { DataTableModule, SharedModule, ButtonModule, ConfirmDialogModule, ConfirmationService, DialogModule, InputTextModule, CalendarModule, InputTextareaModule } from 'primeng/primeng';

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
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MdCheckboxModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [EditService, CvService, ConfirmationService],
  declarations: [ExperianceComponent],
  exports: [ExperianceComponent]
})
export class ExperianceModule { }
