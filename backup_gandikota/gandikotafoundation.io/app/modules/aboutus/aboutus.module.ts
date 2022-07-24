import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutdataComponent } from './aboutdata/aboutdata.component';


@NgModule({
  declarations: [AboutdataComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule
  ]
})
export class AboutusModule { }
