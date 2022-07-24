import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutsInfoComponent } from './abouts-info/abouts-info.component';
import {SharedModule} from '../../shared/shared.module';
import { AboutsEditComponent } from './abouts-edit/abouts-edit.component';


@NgModule({
  declarations: [AboutsInfoComponent, AboutsEditComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    SharedModule
  ]
})
export class AboutusModule { }
