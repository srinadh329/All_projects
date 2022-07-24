import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  users:any = [
    {id:1, first:'siva',last:'srinadh',age:31,subj1_marks:25,subj2_marks:60,subj3_marks:50,subj4_marks:70},
    {id:2, first:'venkatesh',last:'ch',age:28,subj1_marks:40,subj2_marks:25,subj3_marks:65,subj4_marks:45},
    {id:3, first:'srinadh',last:'kavya',age:45,subj1_marks:60,subj2_marks:90,subj3_marks:80,subj4_marks:20},
    {id:4, first:'kavy',last:'priya',age:25,subj1_marks:32,subj2_marks:22,subj3_marks:55,subj4_marks:75},
  ]
  getUser(){
    this.users.map((x:any)=>{
      x.name = x.first +' '+ x.last;
      x.total =parseInt( x.subj1_marks) + parseInt( x.subj2_marks) + parseInt( x.subj3_marks) + parseInt( x.subj4_marks);
      if(x.subj1_marks >= 25 && x.subj2_marks >= 25 && 
        x.subj3_marks >= 25 && x.subj4_marks >= 25){
          x.status = "pass"
        }
        else{
          x.status = "fail"
        }
    })
    return this.users
  }
  creatUser(data:any){
    return this.users.push(data)
  }
  userById(id:any){
    return this.users.find((x:any)=>x.id==id)
  }
  updateUser(data:any,id:any){
    return this.users.push(data,id)
  }
}
