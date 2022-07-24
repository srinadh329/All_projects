import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OutsideModule} from './modules/outside/outside.module';
import {LayoutModule} from './layout/layout.module';
import {AuthGuard} from './core/auth/auth.guard';
const routes: Routes = [
  {
    path:'',
    loadChildren:'./modules/outside/outside.module#OutsideModule'
  },
  {
    path:'admin',
    loadChildren:'./layout/layout.module#LayoutModule',
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
