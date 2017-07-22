import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { MdCardModule } from '@angular/material';
import { DataListModule } from 'primeng/primeng';

import { EditService } from '../edit.service';
import { CvService } from '../../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MdCardModule,
    DataListModule
  ],
  providers: [EditService, CvService],
  declarations: [SkillsComponent],
  exports: [SkillsComponent]
})
export class SkillsModule { }
