import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../home/home.module';
import { HomeComponent } from '../home/home/home.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';

const routes: Routes = [
  {path:'', component:HeaderFooterComponent,
  children:[
    {
      path:'home',
      loadChildren:() => import('../home/home.module').then (m => m.HomeModule)
    },
    {
      path:'new',
      loadChildren:() => import('../news/news.module').then (m => m.NewsModule)
    },
    {
      path:'about',
      loadChildren:() => import('../about/about.module').then (m => m.AboutModule)
    },
    {
      path:'', redirectTo:'home',pathMatch:'full'
    },
    // {
    //   path:'**', component: HomeComponent
    // }
  ]


  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
