import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationComponent } from './organization/organization.component';
import {FormsModule} from '@angular/forms'
import { EmployeesComponent} from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
import { OrgemployesComponent } from './orgemployes/orgemployes.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NormalusersComponent } from './normalusers/normalusers.component';
import { AvatarModule } from 'ngx-avatar';
import { OrganzationsettingsComponent } from './organzationsettings/organzationsettings.component';

import { BologControlComponent, SafeHtmlPipe } from './bolog-control/bolog-control.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SearchPipe } from '../pipes/search.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
;
@NgModule({
  declarations: [OrganizationComponent,SearchPipe, SafeHtmlPipe, EmployeesComponent,HomeComponent, OrganizationDashboardComponent, OrgemployesComponent, NormalusersComponent, OrganzationsettingsComponent, BologControlComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    OrganizationsRoutingModule,
    FormsModule,
    MatButtonModule,
    AvatarModule,
    MatDialogModule,
    MatDatepickerModule,MatInputModule
  ],
 

})
export class OrganizationsModule { }
