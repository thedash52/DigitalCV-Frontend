import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtherComponent } from './other.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule } from '@angular/material';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule
  ],
  providers: [EditService, CvService],
  declarations: [OtherComponent],
  exports: [OtherComponent]
})
export class OtherModule { }
