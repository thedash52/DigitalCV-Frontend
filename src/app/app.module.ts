import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DetailsModule } from './details/index';
import { EditModule } from './edit/index';
import { LoginModule } from './login/index';

import { routes } from './app.routes';
import { SanitizeHtml } from './safehtml.pipe';
import { TestSiteComponent } from './test-site/test-site.component';

import { UserService } from './shared/index';
import { CvService } from './shared/cv.service';
import { Page404Component } from './page404/page404.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    DetailsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    EditModule,
    LoginModule
  ],
  declarations: [
    AppComponent,
    SanitizeHtml,
    TestSiteComponent,
    Page404Component
  ],
  providers: [UserService, CvService, EditModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
