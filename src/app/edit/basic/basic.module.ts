import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ImageCropperModule } from "ngx-img-cropper";

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    MatButtonModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    ImageCropperModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [BasicComponent],
  exports: [BasicComponent]
})
export class BasicModule { }
