import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateuserComponent } from './createuser/createuser.component';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:TableComponent},
  {path:'createuser',component:CreateuserComponent},
  {path:'createuser/:id',component:CreateuserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
