import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomedataComponent } from './homedata/homedata.component';
import { HomeDbdataComponent } from './home-dbdata/home-dbdata.component';
import { HomebannereventComponent } from './homebannerevent/homebannerevent.component';
import { HomebannereventdataComponent } from './homebannereventdata/homebannereventdata.component'
const routes: Routes = [
  {path:'', component: HomedataComponent},
  {path:'banner', component:HomeDbdataComponent},
  {path:'banner/:id', component:HomeDbdataComponent},
  {path:'homebannerevent', component:HomebannereventComponent},
  {path:'bannereventdata', component:HomebannereventdataComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
