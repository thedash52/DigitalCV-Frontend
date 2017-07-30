import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdCheckboxModule } from '@angular/material';

import { InputTextModule, InputTextareaModule, ButtonModule, DataTableModule, DataGridModule, PanelModule, ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng/primeng';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DataTableModule,
    MdCheckboxModule,
    DataGridModule,
    PanelModule,
    ConfirmDialogModule,
    DialogModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [OtherComponent],
  exports: [OtherComponent]
})
export class OtherModule { }
