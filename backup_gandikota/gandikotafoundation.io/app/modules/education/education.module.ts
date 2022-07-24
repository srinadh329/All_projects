import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationRoutingModule } from './education-routing.module';
import { EducationdataComponent } from './educationdata/educationdata.component';


@NgModule({
  declarations: [EducationdataComponent],
  imports: [
    CommonModule,
    EducationRoutingModule
  ]
})
export class EducationModule { }
