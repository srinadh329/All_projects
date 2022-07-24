import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { pathToFileURL } from 'url';
import { NavbarComponent } from './navbar/navbar.component';
import { ContentComponent } from './content/content.component'
const routes: Routes = [
  {
    path:'',component:NavbarComponent,
    children:[
      {path:'', component:ContentComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
