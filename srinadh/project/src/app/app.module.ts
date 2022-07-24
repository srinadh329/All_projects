import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MainnavComponent } from './mainnav/mainnav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycardComponent } from './mycard/mycard.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import {TestserviceService} from './testservice.service';
import { HighlightDirective } from './highlight.directive'
import {AuthgaurdGuard} from '../app/authgaurd.guard'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainnavComponent,
    DashboardComponent,
    MycardComponent,
    HighlightDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    AvatarModule
  ],
  providers: [TestserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
