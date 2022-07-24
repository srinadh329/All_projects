import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestimonialsRoutingModule } from './testimonials-routing.module';
import { TestimonialsCreateComponent } from './testimonials-create/testimonials-create.component';
import { TestimonialsListingComponent } from './testimonials-listing/testimonials-listing.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [TestimonialsCreateComponent, TestimonialsListingComponent],
  imports: [
    CommonModule,
    TestimonialsRoutingModule,
    SharedModule
  ]
})
export class TestimonialsModule { }
