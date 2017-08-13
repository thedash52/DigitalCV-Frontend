import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule, GrowlModule } from 'primeng/primeng';

import { EditComponent } from './edit.component';
import { SidebarComponent } from '../shared/index';
import { BasicModule } from './basic/index';
import { SkillsModule } from './skills/index';
import { TechnologyModule } from './technology/index';
import { ExperianceModule } from './experiance/index';
import { EducationModule } from './education/index';
import { OtherModule } from './other/index';
import { EditService } from './edit.service';
import { UserService } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    BasicModule,
    SkillsModule,
    TechnologyModule,
    ExperianceModule,
    EducationModule,
    OtherModule,
    GrowlModule
  ],
  declarations: [EditComponent, SidebarComponent],
  exports: [EditComponent, SidebarComponent],
  providers: [EditService, UserService]
})
export class EditModule { }
