import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { UserService, CvService } from '../shared/index';
import { SetupEditComponent } from './setup-edit/setup-edit.component';

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
    GrowlModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  declarations: [EditComponent, SidebarComponent, SetupEditComponent],
  exports: [EditComponent, SidebarComponent],
  providers: [EditService, UserService, CvService]
})
export class EditModule { }
