import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutsEditComponent } from './abouts-edit/abouts-edit.component';
import { AboutsInfoComponent } from './abouts-info/abouts-info.component';

const routes: Routes = [
  {
    path:'',component:AboutsInfoComponent
  },
  {
    path:'edit',component:AboutsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
