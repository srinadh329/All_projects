import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
import { CountdownComponent } from 'ngx-countdown';
import { FrontEndConfig } from '../frontendConfig';

@Component({
  selector: 'app-signupemployee',
  templateUrl: './signupemployee.component.html',
  styleUrls: ['./signupemployee.component.css']
})
export class SignupemployeeComponent implements OnInit {
  @ViewChild('countdown') counter: CountdownComponent;
  constructor(public activatedroute: ActivatedRoute,private router: Router,public adminservice:AdminService,public documentservice:DocumentService, private frontendconfig: FrontEndConfig) { }
  id:any;
  show=true
  active:any
  password:any
  show1:any
  status:any
  mailstatus:any;
  email: any;
  emailconfirmation;
  linkexpire:boolean=false
  formSubmitted
  // agree:boolean=true
  passwordMinLength: Boolean;
  passwordupper: Boolean;
  passwordLower: Boolean;
  passwordNumber: Boolean;
  passwordSpecial: Boolean;
  upadtepassword: boolean
  upadtepassword1: boolean = true;
  usernameLength = false;
  ngOnInit() {

    this.id=this.activatedroute.snapshot.paramMap.get("id");
    this.adminservice.checkStatus(this.id).subscribe((data:any)=>{
      if(data.linkstatus=='Link Expired')
      {
        this.linkexpire=true
      }
      this.status = data
      if(this.status.active) {
        this.router.navigate(['/signupemailconfirm/' + this.status.encryptmail])
      }
    })
  }

  activateemail(userform)
  {
    if(!userform.value.cPassword&& !userform.value.ConfirmPassword)
    {
      this.formSubmitted=true
    }

      if(userform.valid){
        if( userform.value && ((userform.value.cPassword==userform.value.ConfirmPassword  &&  userform.value.agreetoSign== true)))
        {
        var data={id:this.id,password:userform.value.cPassword}
        this.adminservice.activatenewemail(data).subscribe(data1 => {
          console.log(data1)
         this.mailstatus = data1;
         if(data1)
         {
          this.show=false;
         this.show1=true;    
       }
     })
      }
     

      }
      else if( userform && (userform.value.agreetoSign==false ||userform.value.agreetoSign==undefined) ){
        this.documentservice.openSnackBar("Agree to our Terms and Conditions and Privacy Policy", "X") 
  
        }

 
  
 }
 privacypolicy()
 {
  window.open(this.frontendconfig.frontendurl + '/termsandconditions', '_blank');

 }
 Restrictspacekey(event) {
  
  if (event.keyCode == 32) {
  
      return false;
  }
}
validate(password) {
  this.passwordMinLength = false;
  this.passwordupper = false;
  this.passwordLower = false;
  this.passwordNumber = false;
  this.passwordSpecial = false;
  var minMaxLength = /^[\s\S]{8,32}$/,
    upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[ !"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

  if (minMaxLength.test(password)) {
    this.passwordMinLength = true;
  }
  if (upper.test(password)) {
    this.passwordupper = true;
  }
  if (lower.test(password) && password != undefined) {
    this.passwordLower = true;
  }
  if (number.test(password)) {
    this.passwordNumber = true;
  }
  if (special.test(password)) {
    this.passwordSpecial = true;
  }
}
}
