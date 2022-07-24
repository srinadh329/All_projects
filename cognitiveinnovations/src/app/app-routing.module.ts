import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { ServicesComponent } from './services/services.component';
const routes: Routes = [
  {
    path: '', component: NavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'faqs', component: FaqsComponent },
      { path: 'services', component: ServicesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
