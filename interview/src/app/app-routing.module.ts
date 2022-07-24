import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainformComponent } from './mainform/mainform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {path:'',component:MainformComponent,
  children:[
    {path:'dashboard',component:DashboardComponent}
  ]

}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
