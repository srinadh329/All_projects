import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRecoverComponent } from './components/admin-recover/admin-recover.component';
import { AdminSignUpComponent } from './components/admin-sign-up/admin-sign-up.component';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'signup', component: AdminSignUpComponent },
  { path: 'recoverPassword/:token/:email/:date', component: AdminRecoverComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAuthRoutingModule { }
