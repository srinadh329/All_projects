import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildrenOutletContexts } from '@angular/router';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {path:'', component:HeaderFooterComponent,
    children:[
      {path:'', component:HomeComponent},
      {path:'about', component:AboutComponent},
      {path:'contact', component:ContactComponent},

    ]
    
  },
  {path:'mainmenu', component:MainMenuComponent,
  children:[
    {path:'', component:DashboardComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
