import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/primeng';

import { EditComponent } from './edit.component';
import { SidebarComponent } from '../shared/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ],
  declarations: [EditComponent, SidebarComponent],
  exports: [EditComponent, SidebarComponent]
})
export class EditModule { }
