import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MatCardModule, MatButtonModule } from '@angular/material';

import { ButtonModule, InputTextModule, InputTextareaModule, DropdownModule, DataTableModule, SharedModule, ConfirmDialogModule, ConfirmationService, DialogModule } from 'primeng/primeng';
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
    DataTableModule,
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
    ImageCropperModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [BasicComponent],
  exports: [BasicComponent]
})
export class BasicModule { }
