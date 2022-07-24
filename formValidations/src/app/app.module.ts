import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { MatStepperComponent } from './mat-stepper/mat-stepper.component';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormCalComponent } from './form-cal/form-cal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { GstComponent } from './gst/gst.component';
import { TableComponent } from './table/table.component'
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    MatStepperComponent,
    FormArrayComponent,
    FormCalComponent,
    GstComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
