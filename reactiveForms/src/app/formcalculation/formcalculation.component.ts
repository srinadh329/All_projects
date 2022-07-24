import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formcalculation',
  templateUrl: './formcalculation.component.html',
  styleUrls: ['./formcalculation.component.scss']
})
export class FormcalculationComponent implements OnInit {
  CalForm: any;
  value:any
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.CalForm = this.formbuilder.group({
      name:['',Validators.required],
      gross_salary:['',Validators.required],
      hra:['',Validators.required],
      incentives:['',Validators.required],
      pf:['',Validators.required],
      tax:['',Validators.required],
    })
  }
  total(){
   
    // let total = this.CalForm.value;
    let total = parseInt(this.CalForm.value.gross_salary) + parseInt(this.CalForm.value.hra) + 
    parseInt(this.CalForm.value.incentives) - parseInt(this.CalForm.value.pf)- parseInt(this.CalForm.value.tax);
    console.log(total)
    this.value = total
  }
}
