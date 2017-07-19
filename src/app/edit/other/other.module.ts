import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdCheckboxModule } from '@angular/material';

import { InputTextModule, InputTextareaModule, ButtonModule, DataListModule, DataGridModule, PanelModule } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DataListModule,
    MdCheckboxModule,
    DataGridModule,
    PanelModule
  ],
  providers: [EditService, CvService],
  declarations: [OtherComponent],
  exports: [OtherComponent]
})
export class OtherModule { }
