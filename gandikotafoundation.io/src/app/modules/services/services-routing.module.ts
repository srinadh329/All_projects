import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesCreateComponent } from './services-create/services-create.component';
import { ServicesListComponent } from './services-list/services-list.component';

const routes: Routes = [
  {path:'',component:ServicesListComponent},
  {path:'create',component:ServicesCreateComponent},
  {path:'create/:id',component:ServicesCreateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
