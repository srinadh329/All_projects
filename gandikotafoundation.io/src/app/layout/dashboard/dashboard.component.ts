import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogboxComponent }from '../../shared/dailogbox/dailogbox.component'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardview:any;
  toggle:any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  home(data:any){
    if(this.dashboardview==data){
      this.dashboardview = '';
    }
    else{
    this.dashboardview = data;
  }
  }
  test(){
  const dialogRef = this.dialog.open(DailogboxComponent, {
    width:  '500px',
    height: '230px',
    data: {title: 'Success', dialogType: 'test',}
  });
}
}
