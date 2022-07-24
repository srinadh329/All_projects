import { Component, OnInit } from '@angular/core';
import { RewardmgtService } from '../../services/rewardmgt.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/services/storage.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = { loginEmail: '', loginPassword: '' }
  emailControl = new FormControl('',[Validators.required,Validators.email]);
  showRecoveryBlock = true;


  constructor(private auth: RewardmgtService, private _router: Router, private cookieService: CookieService
    , private toastr: ToastrService, private storage: StorageService,private spinner: NgxSpinnerService ,
    private reward :RewardmgtService) { }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("bgTheme")).style.height = window.innerHeight.toString() + 'px';
  }
  singup() {
    this._router.navigateByUrl('/signup');
  }
  onSubmit() {
    if(this.loginUserData.loginEmail != '' || this.loginUserData.loginPassword != '')  {
    this.spinner.show();
    this.auth.onLogin(this.loginUserData.loginEmail, this.loginUserData.loginPassword).subscribe((data: any) => {
      if (!data?.message) {
        this.spinner.hide();
        this.storage.setUserDetails(data);
        this.auth.getBuildingAmount(this.storage.getPropertyId());
        this.toastr.success('Login Successful')
        this._router.navigate(['/create-reward'])
      }
      else {
        this.spinner.hide();
        this.toastr.error(data?.message)
      }
    })
  }
}

  submitRecovery() {
    this.emailControl.markAllAsTouched();
    if (this.emailControl.valid) {
       //api call
       this.spinner.show();
      this.reward.forgotPassword(this.emailControl.value).subscribe((data:any) => {
        this.spinner.hide();
        if(!data.message) {
        this.showRecoveryBlock = !this.showRecoveryBlock;
        } 
        else {
          this.toastr.error("User is not available,Please sign up")
        }
      } ,err => {
        this.spinner.hide();
        this.toastr.error("Network Error")
      })   
    }
  }
}
