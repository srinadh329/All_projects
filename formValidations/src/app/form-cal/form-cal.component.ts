import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-cal',
  templateUrl: './form-cal.component.html',
  styleUrls: ['./form-cal.component.scss']
})
export class FormCalComponent implements OnInit {
  CalForm: FormGroup;
  total:any

  constructor(private formbuilder:FormBuilder) {

    this.CalForm = this.formbuilder.group({
      total:['',Validators.required],
      gross_salary:['',Validators.required],
      hra:['',Validators.required],
      incentives:['',Validators.required],
      pf:['',Validators.required],
      tax:['',Validators.required],
    })
   }

  ngOnInit(): void {
    this.CalForm.get('total')?.setValue(0)
  }
  calculateResultForm(){
    this.CalForm.get('total')?.setValue(this.CalForm.value.gross_salary+this.CalForm.value.hra
      + this.CalForm.value.incentives -(this.CalForm.value.pf+this.CalForm.value.tax))
  }
}
