import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  signuphide: boolean = true;
  loginForm: any;
  signupview: any;
  signForm: any;
  signdata: any;
  boardform:any;
  selectOptions = ['option-1', 'option-2', 'option-3'];
  constructor(private formBuilder: FormBuilder,private router: Router) { }
  
  @HostListener('document:wheel', ['$event.target'])
public onWheel(targetElement) {
    console.log(targetElement)
}


  ngOnInit(): void {
    localStorage.setItem('name','srinadh');
    localStorage.setItem('age','20');
    
    // console.log(localStorage.getItem('name'));
    // localStorage.removeItem('name');
    // localStorage.clear()
    sessionStorage.setItem('name','srinadh');
    sessionStorage.setItem('age','20');
    this.signupview = 'signformshow';
    this.signdata = 'about';
    this.boardform= 'signShow';
    this.loginForm = this.formBuilder.group({
      emailid: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.signForm = this.formBuilder.group({
      emailid: ['', [Validators.required]],
      yourname: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  signshow(data) {
    this.signupview = data;
  }
  signdetails(data) {
    this.signdata = data;
  }
  boardprocess(data){
    this.boardform = data;


  }
  signboard(){
    this.boardform='signShow';
    this.signupview='!signformshow';
    this.signupview='signupformshow';
  }
  mainmenu(){
    this.router.navigate(['/menu/'],{queryParams:{name:"srinadg",age:"20"}});
  }
}
