import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  user = {name:'admin',password:'password'}
  isloggedIn: any;
  isloggedOut: any;
  constructor(private formbuilder:FormBuilder,private route:Router) { }

  ngOnInit(): void {
    this.isloggedIn = localStorage.getItem('loggedIn')
    this.isloggedOut = localStorage.getItem('loggedOut')
    if(this.isloggedIn === 'true'){
      this.route.navigate(['dashboard'])
    }
    console.log(this.isloggedIn)
    console.log(this.isloggedOut)
    this.loginForm = this.formbuilder.group({
      name:['',Validators.required],
      password:['',Validators.required],
      addPhoneNumber:this.formbuilder.array([])
    })
  }
  loginSubmit(){
    if(this.loginForm.valid 
      && this.loginForm.value.name == this.user.name 
      && this.loginForm.value.password == this.user.password){
      this.route.navigate(['dashboard'])
      localStorage.setItem('loggedIn','true')
    }
  }
}
