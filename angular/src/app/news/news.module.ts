import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewComponent } from './new/new.component';


@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
