import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-recover',
  templateUrl: './admin-recover.component.html',
  styleUrls: ['./admin-recover.component.css']
})
export class AdminRecoverComponent implements OnInit {

  passwordForm: FormGroup;
  showPasswordForm = true;
  tempPassword: any;
  email: any;

  get signUpControls() {
    return this.passwordForm.controls
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService
    , private route: ActivatedRoute, private admin: AdminService, private toaster: ToastrService) {
    this.route.params.subscribe(val => {
      if (val && val?.token && val?.email) {
        this.tempPassword = val?.token.replace(':', '');
        this.email = val?.email;
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.confirmPassword })
  }


  confirmPassword(group: AbstractControl): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if ((password == confirmPassword)) {
      return null;
    }
    else {
      return { 'mismatch': true }
    }
  }

  submitPasswordChange() {
    this.passwordForm.markAllAsTouched();
    if (this.passwordForm.valid) {
      const obj = {
        email: this.email, newPassword: this.passwordForm.get('password')?.value, tempPassword:
          this.tempPassword
      }
      this.spinner.show();
      this.admin.resetPassword(obj).subscribe((data) => {
        this.spinner.hide();
        this.toaster.success("Password reset Sucessfull");
        this.showPasswordForm = !this.showPasswordForm
      }, err => {
        this.spinner.hide();
        this.toaster.error("Network error")
      })
    }
  }

  login() {
    this.router.navigate(['/superadmin'])
  }

}
