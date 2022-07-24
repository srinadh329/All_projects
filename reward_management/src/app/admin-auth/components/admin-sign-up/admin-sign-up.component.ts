import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-admin-sign-up',
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.css']
})
export class AdminSignUpComponent implements OnInit {

  signUpForm: FormGroup;
  buildingList: any;

  get signUpControls() {
    return this.signUpForm.controls
  }

  constructor(private formBuilder: FormBuilder, private _router: Router ,private admin:AdminService
    , private storage:StorageService , private toaster :ToastrService , private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  backToLogin() {
    this._router.navigate(['/superadmin/login'])
  }

  initSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // buildingName: [null, Validators.required],
      passWord: ['', [Validators.required, Validators.minLength(6)]],
      loginEmail: ['', [Validators.required, Validators.email]],
      // address: ['', Validators.required],
      // state: ['', Validators.required],
      // city: ['', Validators.required],
      // country: ['US', Validators.required],
      // zipcode: ['', Validators.required],
    })
  }

  signUp() {
    if (this.signUpForm.valid) {
      const obj = { ...this.signUpForm.value }
      this.spinner.show();
      this.admin.signUp(obj).subscribe((data:any) => {
        if (!data.message) {
          // this.storage.setUserDetails(data);
          this.spinner.hide();
          this.toaster.success('SignUp Successful')
          this._router.navigate(['/superadmin/login'])
        }
        else {
          this.spinner.hide();
          this.toaster.error(data?.message)
        }
      })
    }
  }

}
