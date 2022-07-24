import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper/stepper';
import {customValidation} from '../material/customValidation'
@Component({
  selector: 'app-mat-stepper',
  templateUrl: './mat-stepper.component.html',
  styleUrls: ['./mat-stepper.component.scss']
})
export class MatStepperComponent implements OnInit {
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  constructor(private formbuilder:FormBuilder) { 
    this.firstFormGroup = this.formbuilder.group({
      fname:['',Validators.required],
      fpassword:['',Validators.required],
      fconformpassword:['',Validators.required]
    },
    {
      validators: customValidation.firstPasswordValidation
    });
    this.secondFormGroup = this.formbuilder.group({
      sname:['',Validators.required],
      spassword:['',Validators.required],
      sconformpassword:['',Validators.required]
    },
    {
      validators: customValidation.PasswordValidation
    });
  }

  ngOnInit(): void {
    
   
  }
  firstValue(stepper:MatStepper){
  if(this.firstFormGroup.valid){
    stepper.next()
  }

  }
  secondValue(){
    
  }
  twoFormData(){
    let obj = {...this.firstFormGroup.value,...this.secondFormGroup.value}
    console.log(obj)
  }
}
