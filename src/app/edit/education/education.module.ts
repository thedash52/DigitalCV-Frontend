import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdCardModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, ButtonModule, ConfirmDialogModule, ConfirmationService, InputTextModule } from 'primeng/primeng';

import { EditService } from '../edit.service';

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
    ConfirmDialogModule,
    InputTextModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [EducationComponent],
  exports: [EducationComponent]
})
export class EducationModule { }
