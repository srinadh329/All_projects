import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.scss']
})
export class HeaderFooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  loginForm(){
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '900px',
      height:'500px',
      data:{title:'Sign In', datalogType:'loginDetails'}
    });
  }
}
