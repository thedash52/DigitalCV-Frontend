import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicComponent } from './basic.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule, MdButtonModule } from '@angular/material';

import { ButtonModule, InputTextModule, InputTextareaModule, DropdownModule, DataListModule } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

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
    DataListModule
  ],
  providers: [EditService, CvService],
  declarations: [BasicComponent],
  exports: [BasicComponent]
})
export class BasicModule { }
