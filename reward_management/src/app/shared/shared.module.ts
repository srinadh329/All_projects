import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { LoadCashComponent } from './components/load-cash/load-cash.component';
import { AdminTableFilterComponent } from './components/admin-table-filter/admin-table-filter.component';
import { RefundItemsComponent } from './components/refund-items/refund-items.component';



@NgModule({
  declarations: [
    TableFilterComponent,
    LoadCashComponent,
    AdminTableFilterComponent,
    RefundItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule
  ],
  exports:[TableFilterComponent,LoadCashComponent , FormsModule , AdminTableFilterComponent , RefundItemsComponent]
})
export class SharedModule { }
