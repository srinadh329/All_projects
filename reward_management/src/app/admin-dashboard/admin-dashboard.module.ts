import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { AmountComponent } from './components/amount/amount.component';
import { HeaderAdminComponent } from './components/header/header.component';
import { PropertyManagersComponent } from './components/property-managers/property-managers.component';
import { RewardTransactionsComponent } from './components/reward-transactions/reward-transactions.component';
import { RewardReconciliationComponent } from './components/reward-reconciliation/reward-reconciliation.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { AdminTransactionsComponent } from './components/admin-transactions/admin-transactions.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    AmountComponent,
    HeaderAdminComponent,
    PropertyManagersComponent,
    RewardTransactionsComponent,
    RewardReconciliationComponent,
    AdminSidebarComponent,
    AdminTransactionsComponent
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
