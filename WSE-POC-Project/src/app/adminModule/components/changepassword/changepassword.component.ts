import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  changepasswordForm:any;
  hide:boolean=true;
 hide1:boolean=true;
 hide2:boolean=true;
  constructor(private formBuilder: FormBuilder,private adminService:AdminService,private toaster:ToastrManager) { }

  ngOnInit() {
    this.changepasswordForm = this.formBuilder.group({
      // oldpassword: ['', Validators.required],
      userpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }
  changepasswordFields(){
    console.log(this.changepasswordForm)
    if (this.changepasswordForm.valid) {
      var user=JSON.parse(localStorage.getItem("user"));
      this.changepasswordForm.value.userid = user.loginid;
      if (this.changepasswordForm.value.userpassword === this.changepasswordForm.value.confirmpassword) {
        this.changepasswordForm.value.actiontype = 'CP';
        this.adminService.addBranchUserMaintainance(this.changepasswordForm.value).subscribe((data: any) => {
          this.toaster.successToastr(data.res, '', { position: 'bottom-center' });
          // this.dialogRef.close(data.res);
        }, error => {
          this.toaster.warningToastr(error.err, '', { position: 'bottom-center' });
        });
      } else if (this.changepasswordForm.value.userpassword !== this.changepasswordForm.value.confirmpassword) {
        this.changepasswordForm.controls['confirmpassword'].setErrors({ 'error': true });
      }
    }
    
  }
}
