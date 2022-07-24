import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthService} from './core/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {ErrorInterceptor} from './core/interceptor/error.interceptor';
import {JwtInterceptor} from './core/interceptor/jwt.interceptor';
import { DailogboxComponent } from './shared/dailogbox/dailogbox.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AppService } from './core/services/app.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgwWowModule } from 'ngx-wow';
@NgModule({
  declarations: [
    AppComponent,
    DailogboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    NgxSpinnerModule,
    NgwWowModule
  ],
  entryComponents: [
    DailogboxComponent
  ],
  providers: [AuthService,
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
