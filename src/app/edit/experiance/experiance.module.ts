import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperianceComponent } from './experiance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    TableModule,
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
