import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/primeng';

import { EditComponent } from './edit.component';
import { SidebarComponent } from '../shared/index';
import { BasicModule } from './basic/index';
import { SkillsModule } from './skills/index';
import { ExperianceModule } from './experiance/index';
import { EducationModule } from './education/index';
import { OtherModule } from './other/index';
import { EditService } from './edit.service';
import { CvService } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    BasicModule,
    SkillsModule,
    ExperianceModule,
    EducationModule,
    OtherModule
  ],
  declarations: [EditComponent, SidebarComponent],
  exports: [EditComponent, SidebarComponent],
  providers: [EditService, CvService]
})
export class EditModule { }
