import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomenavbarComponent } from './homenavbar/homenavbar.component';
import { LoginComponent } from './login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { MyInvitationsComponent } from './my-invitations/my-invitations.component';

import { ErrorpageComponent } from './errorpage/errorpage.component';
import { CallComponent } from './call/call.component';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrgemployesComponent } from './organizations/orgemployes/orgemployes.component';
import { SettingsComponent } from './settings/settings.component';
// import { OrganizationComponent } from './organizations/organization/organization.component';
import { BlogComponent } from './blog/blog.component';



const routes: Routes = [
  { path: '', component: HomenavbarComponent},
  { path: 'login', component: LoginComponent},
  {path:'navbar',component:NavbarComponent ,    
     
  children: [
    {
    path:  'main',
    component:  MainComponent,
    data: { title: 'chatactive'}
  },
 
   
    {
      path:'dashboard',
      component:DashboardComponent,
      data: { title: 'dashboardactive'}
    },
    { path:"MyInvitations", component:MyInvitationsComponent},
{path:'orgemp',component:OrgemployesComponent},
{path:'settings',component:SettingsComponent},
{path:'blog',component:BlogComponent}

]},

  {path:'call',component:CallComponent},
  { path: 'errorpage', component: ErrorpageComponent},

  // {path:'organization',component:OrganizationComponent}
  
];

@NgModule({
  imports: [BrowserModule,FormsModule, RouterModule.forRoot(routes,{
    onSameUrlNavigation: 'reload',
    enableTracing: false,
    //useHash: true,
    
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
