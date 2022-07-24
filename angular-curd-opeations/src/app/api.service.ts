import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  users:any=[
    {id:1, first:'siva',last:'srinadh',age:30,subj1_marks:20,subj2_marks:60,subj3_marks:50,subj4_marks:70},
    {id:2, first:'venkatesh',last:'ch',age:60,subj1_marks:40,subj2_marks:25,subj3_marks:65,subj4_marks:45},
    {id:3, first:'siva',last:'srinadh',age:30,subj1_marks:60,subj2_marks:90,subj3_marks:80,subj4_marks:20},
    {id:98, first:'siva',last:'srinadh',age:30,subj1_marks:32,subj2_marks:22,subj3_marks:55,subj4_marks:75},
  ]
  constructor() { }

  getUsers(){
    return this.users;
  }
 createUser(data:any){
  return this.users.push(data)
 }
 userById(id:any){
   return this.users(id)
 }
}
