import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  users:any = [
    {id:1, first:'siva',last:'srinadh',age:30,subj1_marks:25,subj2_marks:60,subj3_marks:50,subj4_marks:70},
    {id:2, first:'venkatesh',last:'ch',age:30,subj1_marks:40,subj2_marks:25,subj3_marks:65,subj4_marks:45},
    {id:3, first:'kavya',last:'priya',age:30,subj1_marks:60,subj2_marks:90,subj3_marks:80,subj4_marks:20},
    {id:4, first:'srinadh',last:'kavya',age:30,subj1_marks:32,subj2_marks:22,subj3_marks:55,subj4_marks:75},
  ]

  getuser(){
    return this.users;
  }
  creatuser(data:any){
    return this.users.push(data)
  }
  userById(id:any){
    return this.users.find((x:any)=>x.id==id)
  }
  updateUser(data:any,id:any){
    return this.users.push(data,id)
  }
}
