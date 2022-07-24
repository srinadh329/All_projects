import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {customValidation} from '../material/customValidation'
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formValidation:FormGroup;
  states:any=[{name:'Andhra Pradesh',cities:[{name:'vizag'},{name:'vzm'}]},
              {name:'Telangana',cities:[{name:'hyd'},{name:'kmm'}]}]
              city:any;
  constructor(private formbuilder:FormBuilder) {
    this.formValidation = this.formbuilder.group({
      name:['',[Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
      age:['',[Validators.required,Validators.pattern('^[0-9]*$'),customValidation.ageValidation]],
      state:['',[Validators.required]],
      city:[{value:"",disabled:true},Validators.required],
    });
    console.log(this.states.find((x:any)=>console.log(x.name)))
    // this.formValidation.get('city')?.disable()

   }
  
  ngOnInit(): void {
    
  }
  // state selection function

  stateSelection(data:any){
    console.log(data.value)
    this.city = this.states.find((s:any)=>s.name == data.value)?.cities;
    this.formValidation.get('city')?.enable()
  }
   // state selection function
  //  user data function
  userData(){
    if(this.formValidation.valid){
      console.log(this.formValidation.value)
    }
  }
}
