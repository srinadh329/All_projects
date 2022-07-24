import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.scss']
})
export class GstComponent implements OnInit {
  gstForm:FormGroup;
  value:any
  constructor(private formbuilder:FormBuilder) {
    this.gstForm = this.formbuilder.group({
      pirce:['',Validators.required],
      qty:['',Validators.required],
      gst:['',Validators.required],
      discount:[''],
      total:[''],
      final:[''],
      newFields:this.formbuilder.array([])
    })
   }

  ngOnInit(): void {
    this.gstForm.get('total')?.setValue(0);
    this.gstForm.get('final')?.setValue(0);
  }

  get newFields(){
    return this.gstForm.get('newFields') as FormArray
  }
  add(){
    const newFields = this.formbuilder.group({
      pirce:['',Validators.required],
      qty:['',Validators.required],
      gst:['',Validators.required],
      discount:[''],
    });
    this.newFields.push(newFields)
  }
  calculateResultForm(){
    this.gstForm.get('total')?.setValue(((this.gstForm.value.pirce*this.gstForm.value.qty)* this.gstForm.value.gst/100) 
    + this.gstForm.value.pirce*this.gstForm.value.qty -this.gstForm.value.discount)
  }
  
}
