import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainformComponent } from './mainform/mainform.component';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {MatDialogModule} from '@angular/material/dialog';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TestService} from "./test.service";
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParagraphDirective } from './paragraph.directive';
@NgModule({
  declarations: [
    AppComponent,
    MainformComponent,
    DialogboxComponent,
    DashboardComponent,
    ParagraphDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [TestService],
  entryComponents: [
    DialogboxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
