import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationComponent } from './organization/organization.component';

import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { OrganizationDashboardComponent } from './organization-dashboard/organization-dashboard.component';
// import { OrgemployesComponent } from './orgemployes/orgemployes.component';
import { NormalusersComponent } from './normalusers/normalusers.component';
import { OrganzationsettingsComponent } from './organzationsettings/organzationsettings.component';
import { BologControlComponent } from './bolog-control/bolog-control.component';





const routes: Routes = [
  {path:'organization', component:OrganizationComponent},
  {path:'home',component:HomeComponent,
  children: [
    {path:'orgdashboard',component:OrganizationDashboardComponent},
  {path:'employee',component:EmployeesComponent},
  {path:'NormalUsers',component:NormalusersComponent},
  {path:'BlogControl',component:BologControlComponent},
  {path:'orgsettings',component:OrganzationsettingsComponent}


]},

// {path:'orgemp',component:OrgemployesComponent}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
