import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormCalComponent } from './form-cal/form-cal.component';
import { FormComponent } from './form/form.component';
import { GstComponent } from './gst/gst.component';
import { HeaderComponent } from './header/header.component';
import { MatStepperComponent } from './mat-stepper/mat-stepper.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path:'',component:HeaderComponent,
    children:[
      {path:'form',component:FormComponent},
      {path:'matstepper',component:MatStepperComponent},
      {path:'formarray',component:FormArrayComponent},
      {path:'formcal',component:FormCalComponent},
      {path:'gst',component:GstComponent},
      {path:'table',component:TableComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
