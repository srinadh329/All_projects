import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }
  student = [
    {id:1, first:'siva',last:'srinadh',age:30,subj1_marks:25,subj2_marks:60,subj3_marks:50,subj4_marks:70,status:'pass'},
    {id:2, first:'siva',last:'srinadh',age:30,subj1_marks:40,subj2_marks:25,subj3_marks:65,subj4_marks:45,status:'pass'},
    {id:3, first:'siva',last:'srinadh',age:30,subj1_marks:60,subj2_marks:90,subj3_marks:80,subj4_marks:20,status:'pass'},
    {id:4, first:'siva',last:'srinadh',age:30,subj1_marks:32,subj2_marks:22,subj3_marks:55,subj4_marks:75,status:'pass'},
  ];
}
