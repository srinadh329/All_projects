import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogboxComponent } from './dialogbox/dialogbox.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderFooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    DialogboxComponent,
    MainMenuComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxChartsModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatToolbarModule
  ],
  providers: [],
  entryComponents: [
    DialogboxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
