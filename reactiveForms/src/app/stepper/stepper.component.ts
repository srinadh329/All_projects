import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordConfirming } from '../material/customvalidation';
@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  userForm: any;
  profileForm:any
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formbuilder.group({
      name:['',Validators.required],
      password:['',Validators.required],
      conformpassword:['',Validators.required]
    },{validator: passwordConfirming})
    this.profileForm = this.formbuilder.group({
      name:['',Validators.required],
      password:['',Validators.required],
      conformpassword:['',Validators.required]
    },{validator: passwordConfirming})
  }
  userFormValues(){
    console.log(this.userForm.value)
  }
  ProfileFormValues(){
    console.log(this.profileForm.value)
  }
  finalSubmit(){
    let userValue = this.userForm.value;
    let profileValue = this.profileForm.value;
    let result = {user:userValue,profile:profileValue}
    console.log(result)
  }
}
