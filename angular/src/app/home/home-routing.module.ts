import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestService } from '../test.service';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:':test',component:TestComponent,resolve:{products:TestService}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
