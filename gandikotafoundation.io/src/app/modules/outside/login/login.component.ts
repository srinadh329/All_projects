import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  constructor(private formBuilder: FormBuilder,private loginservice:AuthService,private router:Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: ['', ]
    });
  }
  loginsubmit(){
    if(this.loginForm.valid){
      this.spinner.show();
      this.loginservice.login(this.loginForm.value).subscribe((response:any)=>{
        console.log(response);
        localStorage.setItem('token', response.token);
        this.spinner.hide();
        this.router.navigate(['/admin/home']);
      },error =>{
        console.log(error);
      })
    }

  }

}
