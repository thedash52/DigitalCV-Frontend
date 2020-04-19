import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyComponent } from './technology.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ImageCropperModule } from "ngx-img-cropper";
import { DropdownModule } from 'primeng/dropdown';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    TableModule,
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
