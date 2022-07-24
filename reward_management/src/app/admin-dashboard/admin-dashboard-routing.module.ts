import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundItemsComponent } from '../shared/components/refund-items/refund-items.component';
import { AdminTransactionsComponent } from './components/admin-transactions/admin-transactions.component';
import { PropertyManagersComponent } from './components/property-managers/property-managers.component';
import { RewardReconciliationComponent } from './components/reward-reconciliation/reward-reconciliation.component';
import { RewardTransactionsComponent } from './components/reward-transactions/reward-transactions.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'manager',
        component: PropertyManagersComponent,
      },
      {
        path: 'transactions',
        component: RewardTransactionsComponent,
      },
      {
        path: 'reconciliation',
        component: RewardReconciliationComponent,
      },
      {
        path: 'transactions/:id',
        component: AdminTransactionsComponent,
      },
      {
        path: '',
        redirectTo:'manager',
        component: PropertyManagersComponent,
      },
      {
        path : 'transactions/refund-items/:id/:orderId',
        component: RefundItemsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
