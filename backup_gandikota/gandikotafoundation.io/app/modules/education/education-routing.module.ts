import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EducationdataComponent} from './educationdata/educationdata.component'
const routes: Routes = [
  {path:'',component:EducationdataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
