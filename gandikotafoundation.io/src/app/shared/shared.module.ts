import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { CustomtableComponent } from './customtable/customtable.component';


@NgModule({
  declarations: [
    CustomtableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[MaterialModule,CustomtableComponent]
})
export class SharedModule { }
