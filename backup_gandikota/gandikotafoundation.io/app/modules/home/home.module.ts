import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomedataComponent } from './homedata/homedata.component';
import {SharedModule } from '../../shared/shared.module';
import { HomeDbdataComponent } from './home-dbdata/home-dbdata.component';
import { HomebannereventComponent } from './homebannerevent/homebannerevent.component';
import { HomebannereventdataComponent } from './homebannereventdata/homebannereventdata.component'
@NgModule({
  declarations: [HomedataComponent, HomeDbdataComponent, HomebannereventComponent, HomebannereventdataComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeModule { }
