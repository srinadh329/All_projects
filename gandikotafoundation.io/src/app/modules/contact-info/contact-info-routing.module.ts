import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessEditComponent } from './business-edit/business-edit.component';
import { BusinessInfoComponent } from './business-info/business-info.component';

const routes: Routes = [{
  path: '', component: BusinessInfoComponent
},
{path:'edit',component:BusinessEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactInfoRoutingModule { }
