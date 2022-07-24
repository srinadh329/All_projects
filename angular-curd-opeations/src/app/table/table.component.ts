import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogboxComponent } from '../dailogbox/dailogbox.component';
import { ApiService } from '../api.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  student_details:any;
  create_Form!:any;
  creat_details:any;
  id_crement:any;
  viewtable:any;
  update_details:any;
  table_search:any
  valueIn:any;
  total_count:any;
  selectedvalue:any;
  student_filter_details: any;
  selectedId: any;
  constructor(public dialog: MatDialog,public formbuilder:FormBuilder,
    private apiService:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.student_details = this.apiService.getUsers();

   
   
    // fullname and total marks
    this.student_details = this.student_details.map((x: any) => {
      x.total = x.subj1_marks + x.subj2_marks + x.subj3_marks + x.subj4_marks;
      x.name = x.first + ' ' + x.last;
      if(x.subj1_marks >= 25 && x.subj2_marks >= 25 && x.subj3_marks >= 25 && x.subj4_marks >= 25){
        x.status = 'pass'
      }
      else{
        x.status = 'fail'
      }
      return (x)
    })
    console.log(this.student_details)
    this.student_filter_details = this.student_details

  }
 
  
  create_new(){
   this.router.navigate(['userupdate']) 
  }
  // edit(item:any){
  //   this.selectedId = item.id
  //    const dialogRef = this.dialog.open(DailogboxComponent, {
  //     width: '250px',
  //     data:{title:'Create',data:item}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }
  edit(event:any){
    console.log(event)
    this.router.navigate(['userupdate'],{queryParams:{key:event.id}})
  }

  // search function

  sort(value:any){
    console.log(value)
  }

  search(e: any) {
    console.log(e)
    this.student_details = this.student_filter_details.filter((x: any) => {
      if (String(x.id).toLowerCase().includes(e.toLowerCase()) || 
      x.name.toLowerCase().includes(e.toLowerCase()) || 
      String(x.age).toLowerCase().includes(e.toLowerCase()) || x.status.toLowerCase().includes(e.toLowerCase()) || 
      String(x.total).toLowerCase().includes(e.toLowerCase())) {
        console.log('fff')
        return x;
      }
    });
  }
  // search function
  // mat section function
  getSelected(event:any){
    console.log(event.value)
    this.selectedvalue = event.value;
    console.log(this.selectedvalue)
    this.student_details = this.student_details.sort((h:any,l:any)=>{
      console.log(l,h)
      return  this.selectedvalue =='high' ? l.total - h.total :  h.total - l.total
    })
  }
  // mat section
  // column filter
  asyn(value:any){
    this.student_details = this.student_details.sort((a:any,b:any)=>{
      return b[value] - a[value];
    })
  }
    desyn(value:any){
      this.student_details = this.student_details.sort((a:any,b:any)=>{
        return a[value] - b[value];
      })
    }
  // column filter

  // delete
  delete(row:any){
    let indexValue = this.student_details.findIndex((i:any)=>i.id == row.id);
    console.log(indexValue)
    if(indexValue !=-1){
      this.student_details.splice(indexValue,1)
      this.total_count = this.student_details.length;
    }
  }
  // delete
}
