import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';

import { UserService } from "../shared/index";

import { InputTextModule, ButtonModule } from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [LoginComponent],
  providers: [UserService]
})
export class LoginModule { }
