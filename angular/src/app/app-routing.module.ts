import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
const routes: Routes = [
  {
    path:'',
    loadChildren:'./layout/layout.module#LayoutModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules

  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
