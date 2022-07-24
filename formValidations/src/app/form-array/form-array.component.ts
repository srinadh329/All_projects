import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss']
})
export class FormArrayComponent implements OnInit {
  dynamicArray:FormGroup;
  constructor(private formbuilder:FormBuilder) { 
    this.dynamicArray = this.formbuilder.group({
      name:['',Validators.required],
      age:['',Validators.required],
      friend: this.formbuilder.array([])
    })
  }

  ngOnInit(): void {
   
  }
  get friend(){
    return this.dynamicArray.get("friend") as FormArray
  }
  addDynamicArray(){
   const friendForm = this.formbuilder.group({
    fname: ['', Validators.required],
   })
  
   this.friend.push(friendForm)
   console.log(this.dynamicArray)
  }
  removeIndex(data:any){
    this.friend.removeAt(data)
  }
}
