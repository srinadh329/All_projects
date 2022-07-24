import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ServicedataComponent} from './servicedata/servicedata.component'
const routes: Routes = [
  {path:'', component: ServicedataComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
