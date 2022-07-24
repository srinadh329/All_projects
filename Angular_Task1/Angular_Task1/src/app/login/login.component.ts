import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,AbstractControl,ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_Form: any;
  user= {name:'admin',password:'password'}
  loggindeIn: any;
  constructor(private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    
    this.login_Form = this.formbuilder.group({
      name:['',Validators.required],
      password:['',Validators.required]
     
    })
    let isLoggedIn = localStorage.getItem('loggedIn');
    console.log(isLoggedIn)
    if(isLoggedIn && isLoggedIn === 'true'){
      this.router.navigate(['dashboard'])
    }
  }
  Login_Submit(){
    if(this.login_Form.valid && 
      this.login_Form.value.name == this.user.name &&
      this.login_Form.value.password == this.user.password){
        this.router.navigate(['dashboard'])
        localStorage.setItem("loggedIn",'true')
    }

  }

}
