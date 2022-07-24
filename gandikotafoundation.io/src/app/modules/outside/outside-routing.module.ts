import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EducationComponent } from './education/education.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
const routes: Routes = [
  {
    path:'',component:HeaderFooterComponent,
    children:[
      {path:'', component:HomepageComponent},
      {path:'aboutus', component:AboutusComponent},
      {path:'services', component:ServicesComponent},
      {path:'education', component:EducationComponent},
      {path:'gallery', component:GalleryComponent},
      {path:'contact',component:ContactusComponent},
      {path:'login', component:LoginComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutsideRoutingModule { }
