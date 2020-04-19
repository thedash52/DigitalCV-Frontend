import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperianceComponent } from './experiance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DataTableModule, SharedModule, ButtonModule, ConfirmDialogModule, ConfirmationService, DialogModule, InputTextModule, CalendarModule, InputTextareaModule } from 'primeng/primeng';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    MatCheckboxModule,
    CalendarModule,
    InputTextareaModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [ExperianceComponent],
  exports: [ExperianceComponent]
})
export class ExperianceModule { }
