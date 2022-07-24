import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS  }from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './dashboard/layout/header/header.component';
import { FooterComponent } from './dashboard/layout/footer/footer.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CreateRewardComponent } from './dashboard/create-reward/create-reward.component';
import { SidebarComponent } from './dashboard/layout/sidebar/sidebar.component';
import { RewardDetailsComponent } from './dashboard/reward-details/reward-details.component';
import { InvoicesComponent } from './dashboard/invoices/invoices.component';
import { RewardsComponent } from './dashboard/rewards/rewards.component';
import { CancelledRewardsComponent } from './dashboard/cancelled-rewards/cancelled-rewards.component';
import { SharedModule } from './shared/shared.module';
import { Interceptor } from './interceptor/interceptor';
import { PaymentsComponent } from './dashboard/payments/payments.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InvoicePaymentComponent } from './dashboard/invoice-payment/invoice-payment.component';
import { TransactionDetailsComponent } from './dashboard/reward-details/transaction-details/transaction-details.component';
import { RecoverPasswordComponent } from './authentication/recover-password/recover-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReturnItemsComponent } from './dashboard/return-items/return-items.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CreateRewardComponent,
    SidebarComponent,
    RewardsComponent,
    RewardDetailsComponent,
    InvoicesComponent,
    CancelledRewardsComponent,
    PaymentsComponent,
    InvoicePaymentComponent,
    TransactionDetailsComponent,
    RecoverPasswordComponent,
    ReturnItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    InfiniteScrollModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
