import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactInfoRoutingModule } from './contact-info-routing.module';
import { BusinessInfoComponent } from './business-info/business-info.component';
import {SharedModule} from '../../shared/shared.module';
import { BusinessEditComponent } from './business-edit/business-edit.component';


@NgModule({
  declarations: [BusinessInfoComponent, BusinessEditComponent],
  imports: [
    CommonModule,
    ContactInfoRoutingModule,
    SharedModule
  ]
})
export class ContactInfoModule { }
