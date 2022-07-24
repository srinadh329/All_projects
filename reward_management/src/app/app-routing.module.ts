import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './authentication/login/login.component'
import { SignupComponent } from './authentication/signup/signup.component'
import { HeaderComponent } from './dashboard/layout/header/header.component'
import { CreateRewardComponent } from './dashboard/create-reward/create-reward.component'
import { RewardDetailsComponent } from './dashboard/reward-details/reward-details.component'
import { InvoicesComponent } from './dashboard/invoices/invoices.component'
import { RewardsComponent } from './dashboard/rewards/rewards.component';
import { CancelledRewardsComponent } from './dashboard/cancelled-rewards/cancelled-rewards.component';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { InvoicePaymentComponent } from './dashboard/invoice-payment/invoice-payment.component';
import { TransactionDetailsComponent } from './dashboard/reward-details/transaction-details/transaction-details.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { AuthGuard } from './services/auth.guard';
import { ReturnItemsComponent } from './dashboard/return-items/return-items.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/:email/:id', component: SignupComponent },
  { path: 'recoverPassword/:token/:email/:date', component: RecoverPasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'create-reward', component: CreateRewardComponent, canActivate: [AuthGuard] },
  { path: 'rewards', component: RewardsComponent, canActivate: [AuthGuard] },
  { path: 'reward-details', component: RewardDetailsComponent, canActivate: [AuthGuard] },
  { path: 'reward-details/transactions/:id', component: TransactionDetailsComponent, canActivate: [AuthGuard] },
  { path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard] },
  { path: 'cancelled-rewards', component: CancelledRewardsComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },
  { path: 'invoices-payment', component: InvoicePaymentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reward-details/transactions/refund/:id/:orderId' , component:ReturnItemsComponent},
  {
    path: 'superadmin',
    loadChildren: () => import('./admin-auth/admin-auth.module').then(m => m.AdminAuthModule) ,
  },
  {
    path: 'superadmin/dashboard',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) ,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
