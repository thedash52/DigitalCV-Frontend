import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProgressBarModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { DetailsModule } from './details/index';

import { routes } from './app.routes';
import { SanitizeHtml } from './safehtml.pipe';
import { TestSiteComponent } from './test-site/test-site.component';

@NgModule({
  imports: [
    BrowserModule,
    DetailsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    ProgressBarModule
  ],
  declarations: [
    AppComponent,
    SanitizeHtml,
    TestSiteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
