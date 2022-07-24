import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: 'home',
        loadChildren: '../modules/home/home.module#HomeModule',
      },
      {
        path: 'about',
        loadChildren: '../modules/aboutus/aboutus.module#AboutusModule',
      },
      {
        path: 'service',
        loadChildren: '../modules/service/service.module#ServiceModule',
      },
      {
        path: 'education',
        loadChildren: '../modules/education/education.module#EducationModule',
      },
      {
        path: 'gallery',
        loadChildren: '../modules/gallery/gallery.module#GalleryModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
