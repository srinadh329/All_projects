import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewcomponentComponent } from './newcomponent/newcomponent.component';

const routes: Routes = [
  {path:'', component:NewcomponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
