import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestimonialsCreateComponent } from './testimonials-create/testimonials-create.component';
import { TestimonialsListingComponent } from './testimonials-listing/testimonials-listing.component';

const routes: Routes = [
{path:'',component:TestimonialsListingComponent},
{path:'create',component:TestimonialsCreateComponent},
{path:'edit/:id',component:TestimonialsCreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialsRoutingModule { }
