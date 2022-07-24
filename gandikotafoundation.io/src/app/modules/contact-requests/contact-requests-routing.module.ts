import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsListingComponent } from './requests-listing/requests-listing.component';
import { RequestsViewComponent } from './requests-view/requests-view.component';

const routes: Routes = [
  {path:'',component:RequestsListingComponent},
  {path:'view/:id',component:RequestsViewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRequestsRoutingModule { }
