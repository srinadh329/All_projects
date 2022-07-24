import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { FormsComponent } from './forms/forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';
import { FormArrayConceptComponent } from './form-array-concept/form-array-concept.component';
import { FormcalculationComponent } from './formcalculation/formcalculation.component';


@NgModule({
  declarations: [
    AppComponent,
    FormsComponent,
    HeaderComponent,
    StepperComponent,
    FormArrayConceptComponent,
    FormcalculationComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
