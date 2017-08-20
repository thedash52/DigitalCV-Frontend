import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';

import { BusyModule } from "angular2-busy";
import { MdCardModule } from "@angular/material";
import { MessagesModule } from "primeng/primeng";

import { CvService } from "../shared/index";
import { EditService } from "../edit/index";
import { UserService } from "../shared/index";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        BusyModule,
        MdCardModule,
        MessagesModule
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
    providers: [CvService, EditService, UserService]
})

export class DetailsModule { }