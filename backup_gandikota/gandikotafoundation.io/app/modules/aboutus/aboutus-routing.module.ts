import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutdataComponent} from './aboutdata/aboutdata.component'
const routes: Routes = [
  {path:'', component: AboutdataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
