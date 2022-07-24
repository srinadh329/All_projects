import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AdminHomeBannerComponent } from './admin-home-banner/admin-home-banner.component';
import {SharedModule} from '../../shared/shared.module';
import { AdmincreatehomebannerComponent } from './admincreatehomebanner/admincreatehomebanner.component';
@NgModule({
  declarations: [
    AdminHomeBannerComponent,
    AdmincreatehomebannerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
