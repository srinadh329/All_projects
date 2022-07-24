import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EducationComponent } from './education/education.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  {
    path: '', component: HeaderFooterComponent,
    children: [
      { path: '', component: HomepageComponent,data:{title:'Home'} },
      { path: 'aboutus', component: AboutusComponent,data:{title:'About Us'} }, 
      { path: 'services', component: ServicesComponent,data:{title:'Services'} }, 
      { path: 'education', component: EducationComponent,data:{title:'Education'} }, 
      { path: 'contactus', component: ContactusComponent,data:{title:'Contact Us'} }, 
      { path: 'gallery', component: GalleryComponent,data:{title:'Gallery'} }, 
      { path: 'donation', component: AboutusComponent,data:{title:'Donation'} },
      { path: 'login', component: LoginComponent,data:{title:'Login'} }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutsideRoutingModule { }
