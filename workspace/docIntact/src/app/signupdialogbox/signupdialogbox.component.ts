import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from "@angular/router";
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-signupdialogbox',
  templateUrl: './signupdialogbox.component.html',
  styleUrls: ['./signupdialogbox.component.css']
})
export class SignupdialogboxComponent implements OnInit {
  errores
  error: boolean = false
  constructor(
    public dialogRef: MatDialogRef<SignupdialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private router: Router, private documentService: DocumentService, ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
    this.router.navigate(['/home/shareddocument/:id'])
  }

  ngOnInit() {
  }
  formCheck = false
  dataSubmit = function (otpData) {
    this.formCheck = true
    if (otpData.valid) {
      this.formCheck = false
      this.dialogRef.close(otpData.value.otp);
    }
  }
  password: any
  Passwordsubmit(Password) {

    console.log(this.data)
    this.formCheck = true
    if (Password.valid) {
      this.formCheck = false
      if (!this.data.id) {
        if (Password.value.Password == this.data.content)
          this.dialogRef.close(true);
        else {
          this.error = true
          this.errores = 'Password Incorrect'
        }
        //  })
      }
      if (this.data.id) {
        Password.value.title = "passwordchecking"
        this.documentService.getSearch('sharingpeoples/checkpassword/' + this.data.id + '/' + Password.value.Password + '/'+Password.value.title).subscribe(data => {
          console.log(data)
          if (data) this.dialogRef.close(true);
          else {
            this.error = true
            this.errores = 'Password Incorrect'
          }
        })
      }
    }
  }
}
export interface DialogData {
  title: string;
  content: string;
  otpflag: boolean;
  errorMsg: string;
  id: String;
  Docflag:boolean
}
