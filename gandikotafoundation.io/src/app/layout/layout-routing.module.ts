import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'', component:DashboardComponent,
    children:[
      {
        path:'home',
        loadChildren:() => import('../modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path:'gallery',
        loadChildren:() => import('../modules/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path:'testimonials',
        loadChildren:() => import('../modules/testimonials/testimonials.module').then(m => m.TestimonialsModule)
      },
      {
        path:'services',
        loadChildren:() => import('../modules/services/services.module').then(m => m.ServicesModule)
      },
      {
        path:'contact-requests',
        loadChildren:() => import('../modules/contact-requests/contact-requests.module').then(m => m.ContactRequestsModule)
      },
      {
        path:'aboutus',
        loadChildren:() => import('../modules/aboutus/aboutus.module').then(m => m.AboutusModule)
      },
      {
        path:'contactus',
        loadChildren:() => import('../modules/contact-info/contact-info.module').then(m => m.ContactInfoModule)
      }
      
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
