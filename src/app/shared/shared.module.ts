import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule, GrowlModule } from 'primeng/primeng';
import { CvService } from './cv.service';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    GrowlModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [CvService, UserService]
})
export class SharedModule { }
