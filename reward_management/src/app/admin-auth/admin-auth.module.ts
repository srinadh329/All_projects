import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminSignUpComponent } from './components/admin-sign-up/admin-sign-up.component';
import { AdminRecoverComponent } from './components/admin-recover/admin-recover.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminSignUpComponent,
    AdminRecoverComponent
  ],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminAuthModule { }
