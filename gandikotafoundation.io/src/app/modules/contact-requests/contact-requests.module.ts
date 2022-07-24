import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRequestsRoutingModule } from './contact-requests-routing.module';
import { RequestsListingComponent } from './requests-listing/requests-listing.component';
import { RequestsViewComponent } from './requests-view/requests-view.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [RequestsListingComponent, RequestsViewComponent],
  imports: [
    CommonModule,
    ContactRequestsRoutingModule,
    SharedModule
  ]
})
export class ContactRequestsModule { }
