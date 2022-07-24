import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransactionDetailsComponent } from './reward-details/transaction-details/transaction-details.component';
import { ReturnItemsComponent } from './return-items/return-items.component';




@NgModule({
  declarations: [
    TransactionDetailsComponent,
    ReturnItemsComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
