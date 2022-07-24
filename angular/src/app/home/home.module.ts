import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, TestComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
  
})
export class HomeModule { }
