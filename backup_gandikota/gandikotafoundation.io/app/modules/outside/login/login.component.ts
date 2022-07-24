import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'protractor';
import {AuthardservicesService} from '../../../core/services/authardservices.service';
import {Router} from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  is_submit:boolean=false;
  user:any;
  constructor(private formBuilder: FormBuilder, private loginservice:AuthardservicesService,private router:Router,private toastr:ToastrManager) { }
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: ['', ]
    });
      
  }
  loginsubmit(){
    if(this.loginForm.valid){
      this.loginservice.login(this.loginForm.value).subscribe((response:any) =>{
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
        this.toastr.successToastr(response.message);
      },(error:any) =>{
        console.log(error);
        this.toastr.errorToastr(error.errors.error);
      })
    }
  }
}
