import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';

import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SharedModule } from "primeng/shared";
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { MessagesModule } from "primeng/messages";
import { MessageModule } from "primeng/message";
import { TableModule } from "primeng/table";

import { CvService } from "../shared/index";
import { EditService } from "../edit/index";
import { UserService } from "../shared/index";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MessagesModule,
        MessageModule,
        CarouselModule,
        ButtonModule,
        MatGridListModule,
        MatListModule,
        TableModule,
        SharedModule,
        MatTooltipModule,
        MatIconModule
    ],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
    providers: [CvService, EditService, UserService]
})

export class DetailsModule { }