import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GallerydataComponent} from './gallerydata/gallerydata.component'
const routes: Routes = [
  {
    path:'' ,component:GallerydataComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
