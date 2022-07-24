import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { DialogboxComponent } from '../dialogbox/dialogbox.component';
@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {

    console.log(this.data.datalogType);
    
  }
  myform(){
    
  }
  onNoClick(){
    
  }
  btnClick() {
    this.router.navigateByUrl('/mainmenu');
};
}
