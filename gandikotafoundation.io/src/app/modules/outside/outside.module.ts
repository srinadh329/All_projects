import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EducationComponent } from './education/education.component';
import { GalleryComponent } from './gallery/gallery.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { OutsideRoutingModule } from './outside-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { TestimonialComponent } from './testimonial/testimonial.component';

@NgModule({
  declarations: [AboutusComponent, ContactusComponent, EducationComponent, GalleryComponent, HeaderFooterComponent, HomepageComponent, LoginComponent, ServicesComponent, HeaderComponent, TestimonialComponent],
  imports: [
    CommonModule,
    OutsideRoutingModule,
    SharedModule
  ]
})
export class OutsideModule { }
