import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {ImageService} from './image.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDirective } from './form.directive';
import { TestService } from './test.service';
@NgModule({
  declarations: [
    AppComponent,
    FormDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [ImageService,TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
