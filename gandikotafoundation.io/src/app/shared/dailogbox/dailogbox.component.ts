import { Component, OnInit,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-dailogbox',
  templateUrl: './dailogbox.component.html',
  styleUrls: ['./dailogbox.component.scss']
})
export class DailogboxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DailogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  closeDialog() {
    this.dialogRef.close('')
  }

  deleteEmit() {
    this.dialogRef.close(true)
  }
}
