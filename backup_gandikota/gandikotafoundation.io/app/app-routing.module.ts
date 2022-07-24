import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OutsideModule} from './modules/outside/outside.module';
import {LayoutModule} from './layout/layout.module';
import {HomeModule} from './modules/home/home.module';
import {AboutusModule} from './modules/aboutus/aboutus.module';
import{ServiceModule} from './modules/service/service.module';
import {EducationModule} from './modules/education/education.module';
import {GalleryModule} from './modules/gallery/gallery.module';
import {AuthGuard} from './core/auth/auth.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/outside/outside.module#OutsideModule',
  },
  {
    path:'dashboard',
    loadChildren:'./layout/layout.module#LayoutModule',
    canActivate: [AuthGuard],
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
