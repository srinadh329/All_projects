import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminHomeBannerComponent} from './admin-home-banner/admin-home-banner.component'
import { AdmincreatehomebannerComponent } from './admincreatehomebanner/admincreatehomebanner.component';
const routes: Routes = [
  {path:'',component:AdminHomeBannerComponent},
  {path:'create',component:AdmincreatehomebannerComponent},
  {path:'create/:id',component:AdmincreatehomebannerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
