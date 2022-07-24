import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_Form:any;
  credentail = {name:'admin', password: 'password'}

  constructor(private formbilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    let isLoggedIn = localStorage.getItem('loggedIn');
    if(isLoggedIn && isLoggedIn === 'true') {
      this.router.navigate(['dashboard'])
    }
    this.login_Form = this.formbilder.group({
      name:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  Login(){
    if(this.login_Form.valid && this.login_Form.value.name == this.credentail.name 
      && this.login_Form.value.password == this.credentail.password){
      console.log(this.login_Form.value)
      localStorage.setItem('loggedIn','true')
      this.router.navigate(['dashboard'])
    }
  }
}
