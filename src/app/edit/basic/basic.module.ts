import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule } from '@angular/material';

import { ButtonModule, InputTextModule, InputTextareaModule, DropdownModule, DataTableModule, SharedModule, ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng/primeng';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    MdButtonModule,
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [BasicComponent],
  exports: [BasicComponent]
})
export class BasicModule { }
