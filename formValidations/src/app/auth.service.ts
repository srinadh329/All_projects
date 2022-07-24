import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  users:any = [
    {id:1, first:'siva',last:'srinadh',age:31,subj1_marks:25,subj2_marks:60,subj3_marks:50,subj4_marks:70},
    {id:2, first:'venkatesh',last:'ch',age:28,subj1_marks:40,subj2_marks:25,subj3_marks:65,subj4_marks:45},
    {id:3, first:'srinadh',last:'kavya',age:45,subj1_marks:60,subj2_marks:90,subj3_marks:80,subj4_marks:20},
    {id:4, first:'kavy',last:'priya',age:25,subj1_marks:32,subj2_marks:22,subj3_marks:55,subj4_marks:75},
  ]

  getUser(){
    this.users.map((e:any)=>{
      e.name = e.first +' '+e.last;
      e.total = e.subj1_marks + e.subj2_marks + e.subj3_marks + e.subj4_marks;
      e.status = e.subj1_marks >= 25 && e.subj2_marks >= 25 && e.subj3_marks >= 25 && e.subj4_marks >= 25 ? 'pass' : 'fail';
    })
    return this.users;
  }
}
