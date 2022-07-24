import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material.module';
import { CustomtableComponent, KeysPipe } from './customtable/customtable.component';
@NgModule({
  declarations: [CustomtableComponent,KeysPipe],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule, 
    CustomtableComponent
  ],
  providers:[]
})
export class SharedModule { }
