import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss']
})
export class CreateuserComponent implements OnInit {
  create_Form:any;
  student:any;
  id: any;
  update:  any;
  constructor(private formbuilder:FormBuilder,private apiservice:ApiService,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.student = this.apiservice.getuser()
    this.id = this.route.snapshot.queryParams['key'];
    this.update = this.apiservice.userById(this.id)
    console.log(this.id)
    this.create_Form = this.formbuilder.group({
      first:[this.id ? this.update.first :'' ,[Validators.required]],
      last:['',Validators.required],
      subj1_marks:['',[Validators.required]],
      subj2_marks:['',[Validators.required]],
      subj3_marks:['',[Validators.required]],
      subj4_marks:['',[Validators.required]],
    })
    if(this.id){
      this.create_Form.patchValue({
        first:this.update.first,
        last:this.update.last,
        subj1_marks:this.update.subj1_marks,
        subj2_marks:this.update.subj1_marks,
        subj3_marks:this.update.subj3_marks,
        subj4_marks:this.update.subj4_marks,
      })
     
    }

  }
  //update api 
  creat(){
    console.log(this.create_Form.value)
    console.log(this.nameExists(`${this.create_Form.value.first}${this.create_Form.value.last}`))
    if(this.create_Form.valid && !this.id && 
      !this.nameExists(`${this.create_Form.value.first}${this.create_Form.value.last}`)){
      // name validatin
      this.apiservice.creatuser(this.create_Form.value)
      this.router.navigate(['dashboard'])
    }
    else if(this.create_Form.valid && this.id && 
      !this.nameExists(`${this.create_Form.value.first}${this.create_Form.value.last}`)){
      this.apiservice.updateUser(this.create_Form.value,this.update)
      this.router.navigate(['dashboard'])
    }
 
  }
  nameExists(name:string){
    console.log(this.student)
    return this.student.some((x:any)=>x.name == name)
  }
}

