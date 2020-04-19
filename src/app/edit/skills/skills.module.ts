import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from './skills.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DataTableModule, SharedModule, ButtonModule, DialogModule, ConfirmationService, ConfirmDialogModule, InputTextareaModule, DropdownModule } from 'primeng/primeng';

import { EditService } from '../edit.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextareaModule,
    DialogModule,
    DropdownModule
  ],
  providers: [EditService, ConfirmationService],
  declarations: [SkillsComponent],
  exports: [SkillsComponent]
})
export class SkillsModule { }
