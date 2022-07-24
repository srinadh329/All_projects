import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array-concept',
  templateUrl: './form-array-concept.component.html',
  styleUrls: ['./form-array-concept.component.scss']
})
export class FormArrayConceptComponent implements OnInit {
  nameArrayForm: any;

  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.nameArrayForm = this.formbuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      friend:this.formbuilder.array([
        this.formbuilder.control('')
      ])
    })
  }
  get friend(){
    return this.nameArrayForm.get('firend') as FormArray;
  }
  friendAdd(){
    this.friend.push(this.formbuilder.group({
      fname:[''],
      fage:['']
    }))
  }
}
