import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';

import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [GalleryListComponent, GalleryCreateComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    SharedModule
  ]
})
export class GalleryModule { }
