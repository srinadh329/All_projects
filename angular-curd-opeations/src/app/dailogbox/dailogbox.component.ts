import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.scss']
})
export class DailogboxComponent implements OnInit {
  create_Form:any;
  constructor(public dialogRef: MatDialogRef<DailogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,public dialog: MatDialog,
    public formbuilder:FormBuilder,router:Router,private apiservice:ApiService) { }

  ngOnInit(): void {
   
    this.create_Form = this.formbuilder.group({
      id:['',[Validators.required]],
      first:['',[Validators.required]],
      last:['',[Validators.required]],
      age:['',[Validators.required]],
      subj1_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj2_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj3_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj4_marks:['',[Validators.required,Validators.maxLength(100)]],
    })
   if(this.data){
    console.log(this.data.data)
    this.create_Form.patchValue({
      id:this.data.data.id,
      first:this.data.data.first,
      last:this.data.data.last,
      age:this.data.data.age,
      subj1_marks:this.data.data.subj1_marks,
      subj2_marks:this.data.data.subj2_marks,
      subj3_marks:this.data.data.subj3_marks,
      subj4_marks:this.data.data.subj4_marks
    })
   }
  }
  create_user(){
    if(this.create_Form.value){
      console.log(this.create_Form.value)
    this.apiservice.createUser(this.create_Form.value)
  }
    
  }

}
