import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MdProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProgressBarModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { DetailsModule } from './details/index';
import { EditModule } from './edit/index';
import { SharedModule } from './shared/index';

import { routes } from './app.routes';
import { SanitizeHtml } from './safehtml.pipe';
import { TestSiteComponent } from './test-site/test-site.component';

import { UserService } from "./shared/index";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    DetailsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    EditModule
  ],
  declarations: [
    AppComponent,
    SanitizeHtml,
    TestSiteComponent
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
