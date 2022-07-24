import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GallerydataComponent } from './gallerydata/gallerydata.component';


@NgModule({
  declarations: [GallerydataComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule
  ]
})
export class GalleryModule { }
