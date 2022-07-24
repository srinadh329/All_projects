import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DocumentService } from '../document.service';
import {Router, NavigationExtras} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  constructor(public userService: UserService, public documentservice: DocumentService ,private router: Router) { }

  emailForSignup;
  aboutusfreetrial;
  userdata: any;
  emailchecked = false;
  noEmail:Boolean=false;

  ngOnInit() { 
    $(document).ready(function(){

      $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});
  
    


  }

  //=================================free taril mail for signup========================================================================
  semdMailForSignup(email) {
    if(email.value.emailForSignup==undefined)this.noEmail=true;
    if (email.valid) {
      email = { email: email.value.emailForSignup }
      this.userService.semdMailForSignup(email).subscribe(data => {
      })
      if (this.aboutusfreetrial == false)
        this.documentservice.openSnackBar("Confirmation sent to your email", "X")
    }
  }
  freetrail(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "type": "Signup",
      }
  };
  this.router.navigate(["/"], navigationExtras);
  }

  onKeyDownstartfreetrialemail(emailForSignup) {
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.aboutusfreetrial = false;
    if (regexp.test(emailForSignup)) {
      this.userService.getemail(emailForSignup.toLowerCase()).subscribe(data => {
        this.userdata = data
        this.emailchecked = true;
        if (this.userdata.data) {
          this.aboutusfreetrial = true
        }
      })
    }
  }

}
