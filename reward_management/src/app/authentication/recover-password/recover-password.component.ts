import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RewardmgtService } from 'src/app/services/rewardmgt.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  showPasswordForm = true;
  tempPassword : any;
  email :any;

  get signUpControls() {
    return this.passwordForm.controls
  }

  constructor(private formBuilder: FormBuilder,private router:Router , private route:ActivatedRoute,
    private reward :RewardmgtService , private toastr: ToastrService ,private spinner: NgxSpinnerService) {
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
      const obj = {email : this.email , newPassword : this.passwordForm.get('password')?.value , tempPassword :
    this.tempPassword}
    this.spinner.show();
      this.reward.resetPassword(obj).subscribe((data)=>{
        this.spinner.hide();
        this.toastr.success("Password reset Sucessfull");
        this.showPasswordForm = !this.showPasswordForm
      } , err => {
        this.spinner.hide();
        this.toastr.error(err.error.message)
      })
     
    }
  }

  login() {
    this.router.navigate(['/login'])
  }

}
