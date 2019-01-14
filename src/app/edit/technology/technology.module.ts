import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyComponent } from './technology.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatCheckboxModule } from '@angular/material';

import { DataTableModule, SharedModule, DialogModule, ButtonModule, ConfirmDialogModule, ConfirmationService, InputTextModule, InputTextareaModule, DropdownModule } from 'primeng/primeng';
import { ImageCropperModule } from "ngx-img-cropper";

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    DataTableModule,
    SharedModule,
    DialogModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    MatCheckboxModule,
    InputTextareaModule,
    DropdownModule,
    ImageCropperModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [TechnologyComponent],
  exports: [TechnologyComponent]
})
export class TechnologyModule { }
