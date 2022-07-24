import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

const routes: Routes =[
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignupComponent },
    { path: 'recoverPassword:token/:email/:date', component: RecoverPasswordComponent }
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
