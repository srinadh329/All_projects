import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutsideRoutingModule } from './outside-routing.module';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EducationComponent } from './education/education.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [AboutusComponent, ContactusComponent, EducationComponent, GalleryComponent, HeaderFooterComponent, HomepageComponent, ServicesComponent, LoginComponent],
  imports: [
    CommonModule,
    OutsideRoutingModule,
    SharedModule,
    
  ]
})
export class OutsideModule { }
