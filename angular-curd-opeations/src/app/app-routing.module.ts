import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TableComponent } from './table/table.component';
import { UserUpateComponent } from './user-upate/user-upate.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'dashboard',component:TableComponent},
  {path:'userupdate',component:UserUpateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
