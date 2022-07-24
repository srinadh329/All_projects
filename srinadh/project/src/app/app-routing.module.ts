import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainnavComponent } from './mainnav/mainnav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MycardComponent } from './mycard/mycard.component';
import {AuthgaurdGuard} from '../app/authgaurd.guard'
const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'menu', component:MainnavComponent,canDeactivate : [AuthgaurdGuard] ,
  children: 
  [ 
    { path: 'dashboard', component: DashboardComponent},
    { path: 'mycardComponent', component: MycardComponent},
  ]
},
{path:'**',component: DashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
