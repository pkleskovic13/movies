import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesLayoutModule } from './modules/movies-layout/movies-layout.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CamelCaseInterceptor } from './interceptors/camel-case.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    MoviesLayoutModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
