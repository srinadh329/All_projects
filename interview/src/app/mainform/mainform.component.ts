import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogboxComponent }from'../dialogbox/dialogbox.component';
@Component({
  selector: 'app-mainform',
  templateUrl: './mainform.component.html',
  styleUrls: ['./mainform.component.scss']
})
export class MainformComponent implements OnInit {
  array=['srinadh','siva','sivasrinadh'];
  data=[{
    id:1,
    'name':'srinadh'
  },
  { id:2,'name':'siva'},
  {id:3, 'name':'sivasrinadh'},
  {id:4, 'name':'srinadhsiva'}
]
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  this.data.unshift({id:5,name:'yest'})
  }
login(){
  const dialogRef = this.dialog.open(DialogboxComponent, {
    width: '600px',
    height:'500px',
    data:{title:'Sign In', datalogType:'loginDetails'}
  });
}
Signup(){
  const dialogRef = this.dialog.open(DialogboxComponent, {
    width: '600px',
    height:'600px',
    data:{title:'Sign Up', datalogType:'SignupDetails'}
  });
}
deletename(data){
  var index= this.data.findIndex(x=>x.id==data.id)
  if(index!=-1){
    this.data.splice(index,1)
  }
}

}
