import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-userscreate',
  templateUrl: './userscreate.component.html',
  styleUrls: ['./userscreate.component.scss']
})
export class UserscreateComponent implements OnInit {
  createUserForm: any;
  student: any;
  id: any;
  update: any;

  constructor(private formbuilder:FormBuilder,
    private apiservice:ApiService,
    private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.student = this.apiservice.getUser();
    this.id = this.router.snapshot.paramMap.get('id')
    this.update = this.apiservice.userById(this.id)
    console.log(this.id)
    // console.log(this.update)
    // console.log(this.student)
    this.createUserForm = this.formbuilder.group({
      first:['',Validators.required],
      last:['',Validators.required],
      age:['',Validators.required],
      subj1_marks:['',Validators.required],
      subj2_marks:['',Validators.required],
      subj3_marks:['',Validators.required],
      subj4_marks:['',Validators.required],
    })
    if(this.id){
      this.update = this.apiservice.userById(this.id)
      // console.log(this.update)
      this.createUserForm.patchValue({
        first:this.update.first,
        last:this.update.last,
        age:this.update.age,
        subj1_marks:this.update. subj1_marks,
        subj2_marks:this.update. subj2_marks,
        subj3_marks:this.update. subj3_marks,
        subj4_marks:this.update. subj4_marks,
      })
    }
   
  }
  CreatUserSubmit(){
    if(this.createUserForm.valid){
      console.log(this.createUserForm.value)
      this.nameExist(`${this.createUserForm.value.first} ${this.createUserForm.value.last}`)
      let idCrement = (Math.max(...this.student.map((x:any)=>x.id)))+1
      if(this.createUserForm.valid && !this.id
        && !this.nameExist(`${this.createUserForm.value.first} ${this.createUserForm.value.last}`)){
          this.apiservice.creatUser(Object.assign({id:idCrement},this.createUserForm.value))
          this.route.navigate(['dashboard'])
        }
      else if(this.createUserForm.valid && this.id
        && this.nameExist(`${this.createUserForm.value.first} ${this.createUserForm.value.last}`)){
          this.apiservice.updateUser(this.update,this.createUserForm.value)
          this.route.navigate(['dashboard'])
        }
    }
  }
  nameExist(name:string){
    console.log(name)
    console.log(this.student.some((x:any)=>x.name==name))
    return this.student.some((x:any)=>x.name==name)
  }
}
