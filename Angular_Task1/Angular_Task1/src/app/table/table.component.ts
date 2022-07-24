import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  student:any;
  add_name: any;
  selectedId: any;
  value:any;
  searchData: any;
  selectedValue: any;
  constructor(private apiservice:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.student = this.apiservice.getuser();
    this.searchData = this.student
    this.student=this.student.map((e:any)=>{
      e.name = e.first +' ' + e.last
      e.total = e.subj1_marks + e.subj2_marks+ e.subj3_marks+ e.subj4_marks;
      if(e.subj1_marks >=25 && e.subj2_marks >=25 && e.subj3_marks >=25 && e.subj4_marks >=25){
        e.status ="pass"
        
      }
      else{
        e.status ="fail"
      }
      return e;
    })
  }
  logout(){
    this.router.navigate(['/'])
    localStorage.setItem('loggedIn','fails')
  }
  addUser(){
    this.router.navigate(['createuser'])
  }
  editUser(event:any){
    this.router.navigate(['createuser'],{queryParams:{key:event.id}})
  }
  deleteUser(data:any){
    let indexValue = this.student.findIndex((e:any)=>e.id==data.id)
    console.log(indexValue);
    if(indexValue !=-1){
      this.student.splice(indexValue,1)
    }
  }
  asyn(value:any){
    this.student.sort((a:any,b:any)=>{
      return typeof a[value] == 'number'? b[value]-a[value] : a[value].localeCompare(b[value])
    })
  }
  asynName(value:any){
    console.log(value)
    this.student.sort((a:any,b:any)=>{
      console.log(a[value],b[value])
      return a[value].localeCompare(b[value])
    })
  }
  desyn(value:any){
    this.student.sort((a:any,b:any)=>{
      return a[value]-b[value]
    })
  }
  desynName(value:any){
    this.student.sort((a:any,b:any)=>{
      return b[value].localeCompare(a[value])
    })
  }
  search(value:any){
    console.log(value)
    this.student = this.searchData.filter((s:any)=>{
      console.log(s)
      if(String(s.id).includes(value) || s.first.includes(value)
      ||s.last.includes(value)|| String(s.age).includes(value)
      ||s.name.includes(value)||String(s.subj1_marks).includes(value)
      ||String(s.subj2_marks).includes(value)||String(s.subj3_marks).includes(value)
      ||String(s.subj4_marks).includes(value)||String(s.total).includes(value)
      ||s.status.includes(value)){
        return s
      }
    })
  }
  getSelected(data:any){
    console.log(data.value)
    this.selectedValue = data.value
    this.student.sort((h:any,l:any)=>{
      return this.selectedValue == "high" ? l.total - h.total : h.total - h.total
    })
  }
}
