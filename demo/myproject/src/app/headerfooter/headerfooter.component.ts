import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
@Component({
  selector: 'app-headerfooter',
  templateUrl: './headerfooter.component.html',
  styleUrls: ['./headerfooter.component.scss']
})
export class HeaderfooterComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  loginForm(): void{
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width:'200px'

    });
  }
}
