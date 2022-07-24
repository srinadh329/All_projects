import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryCreateComponent } from './gallery-create/gallery-create.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';

const routes: Routes = [
  { path: '', component: GalleryListComponent },
  { path: 'create', component: GalleryCreateComponent },
  { path: 'edit/:id', component: GalleryCreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule { }
