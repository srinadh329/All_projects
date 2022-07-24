import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service'
@Component({
  selector: 'app-user-upate',
  templateUrl: './user-upate.component.html',
  styleUrls: ['./user-upate.component.scss']
})
export class UserUpateComponent implements OnInit {
  create_Form: any;
  student_details: any;
  creat_details: any;
  id_crement: any;
  total_count: any;
  user_id: any;
  id: any;
  update: any;

  constructor(private formbuilder:FormBuilder,private apiService:ApiService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.update = this.apiService.userById; 
    console.log(this.route.snapshot.paramMap)
    console.log(this.route.snapshot.queryParams.key)
    this.id = this.route.snapshot.queryParams.key
    this.student_details = this.apiService.getUsers()
    this.create_Form = this.formbuilder.group({
      first:['',[Validators.required]],
      last:['',[Validators.required]],
      age:['',[Validators.required]],
      subj1_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj2_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj3_marks:['',[Validators.required,Validators.maxLength(100)]],
      subj4_marks:['',[Validators.required,Validators.maxLength(100)]],
    });
    if(this.id){
      console.log(this.id)
      console.log(this.update)
      this.create_Form.patchValue({
        first:this.id.first,
        last:this.id.last
      })
    }
  }
  create_user(){
    let form = this.create_Form.value
    console.log(this.nameExists(`${form.first} ${form.last}`))
    if(this.create_Form.valid && !this.nameExists(`${form.first} ${form.last}`)){
      this.creat_details = this.create_Form.value
      console.log(this.creat_details)
      this.id_crement = this.student_details.map((e:any)=>e.id)
      this.id_crement = (Math.max(...this.id_crement)+1)
      console.log(this.id_crement)
      this.apiService.createUser(Object.assign({id:this.id_crement},this.create_Form.value))
      // this.student_details.push(Object.assign({id:this.id_crement},this.create_Form.value));
      this.create_Form.reset();
      this.total_count = this.student_details.length;
      this.router.navigate(['dashboard'])
    }else if(this.nameExists(`${form.first} ${form.last}`)){
      console.log('Name Exists')
    }

  }
  nameExists(name:string){
    return this.student_details.some((x:any)=>x.name==name)
  }

}
