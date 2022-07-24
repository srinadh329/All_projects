import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppGuardService } from './app.guards';
import { NoaccessComponent } from './noaccess/noaccess.component';
const routes: Routes = [
   {path: '', component:LoginFormComponent,data:{title : 'POC Login'} }, 
   {path: 'forbidden', component:NoaccessComponent,data:{title : 'FORBIDDEN'} }, 

   { path: 'admin',
   canActivate: [AppGuardService],
   canActivateChild: [AppGuardService],
   loadChildren: () => import('./adminModule/admin.module').then(m => m.AdminModule) },
  { path: 'store',
  canActivate: [AppGuardService],
  canActivateChild: [AppGuardService],

  loadChildren: () => import('./storeModule/store.module').then(m => m.StoreModule) },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
