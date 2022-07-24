import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderfooterComponent } from './headerfooter/headerfooter.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
const routes: Routes = [
  { path: '', component: HeaderfooterComponent,
    children:[
     { path: '', component: HomeComponent},
     { path: 'about', component: AboutComponent},
     { path: 'contact', component: ContactComponent},
    ]

    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
