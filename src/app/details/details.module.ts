import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatGridListModule, MatListModule, MatTooltipModule, MatIconModule } from "@angular/material";
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