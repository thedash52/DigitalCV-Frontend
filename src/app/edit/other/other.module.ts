import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
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
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    TableModule,
    MatCheckboxModule,
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
