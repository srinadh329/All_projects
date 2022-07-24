import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormArrayConceptComponent } from './form-array-concept/form-array-concept.component';
import { FormcalculationComponent } from './formcalculation/formcalculation.component';
import { FormsComponent } from './forms/forms.component';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';

const routes: Routes = [
  {
    path:'',component:HeaderComponent,
    children:[
      {path:'state',component:FormsComponent},
      {path:'stepper',component:StepperComponent},
      {path:'formarray',component:FormArrayConceptComponent},
      {path:'calculation',component:FormcalculationComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
