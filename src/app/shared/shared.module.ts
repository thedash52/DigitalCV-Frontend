import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/primeng';
import { CvService } from './cv.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [CvService]
})
export class SharedModule { }
