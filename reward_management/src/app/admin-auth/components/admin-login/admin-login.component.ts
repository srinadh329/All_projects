import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginUserData = { loginEmail: '', loginPassword: '' }
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  showRecoveryBlock = true;

  constructor(private _router: Router, private admin: AdminService, private storage: StorageService,
    private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  singup() {
    this._router.navigateByUrl('/superadmin/signup');
  }
  onSubmit() {
    if (this.loginUserData.loginEmail != '' || this.loginUserData.loginPassword != '') {
      this.spinner.show();
      this.admin.onLogin(this.loginUserData.loginEmail, this.loginUserData.loginPassword).subscribe((data: any) => {
        if (!data?.message) {
          this.storage.setUserDetails(data);
          this.spinner.hide();
          this.toaster.success('Login Successful')
          this._router.navigate(['/superadmin/dashboard'])
        }
        else {
          this.spinner.hide();
          this.toaster.error(data?.message)
        }
      })
    }
  }

  submitRecovery() {
    this.emailControl.markAllAsTouched();
    if (this.emailControl.valid) {
      this.spinner.show();
      this.admin.forgotPassword(this.emailControl.value).subscribe((data: any) => {
        this.spinner.hide();
        if (!data.message) {
          this.showRecoveryBlock = !this.showRecoveryBlock;
        }
        else {
          this.toaster.error("User is not available,Please sign up")
        }
      }, err => {
        this.spinner.hide();
        this.toaster.error("Network Error")
      })
    }
  }

}
