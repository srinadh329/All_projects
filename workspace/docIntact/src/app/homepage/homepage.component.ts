import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DocumentService } from '../document.service';
import {Router, NavigationExtras} from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(public userService: UserService, public documentservice: DocumentService,private router: Router) { }
  emailForSignup
  check4
  userdata: any;
  emailchecked = false;
  noEmail:Boolean=false;

  ngOnInit() {
    $(document).ready(function () {
      $('.owl-carousel').owlCarousel({
        stagePadding: 200,
        loop: true,
        dots: true,
        margin: 10,
        nav: false,
        items: 1,
        lazyLoad: true,
        // nav: false,
        autoplay: false,
        responsive: {

          320: {
            items: 1,
            stagePadding: 30
          },
          // 0: {
          //     items: 1,
          //     stagePadding: 60
          // },
          360: {
            items: 1,
            stagePadding: 30
          },
          600: {
            items: 1,
            stagePadding: 100
          },
          800: {
            items: 1,
            stagePadding: 100
          },
          1000: {
            items: 1,
            stagePadding: 200
          },
          1200: {
            items: 1,
            stagePadding: 250
          },

        }
      })
    });
  }

  //=================================free taril mail for signup========================================================================
  semdMailForSignup(email) {
    if(email.value.emailForSignup==undefined)this.noEmail=true;
    if (email.valid) {
      email = { email: email.value.emailForSignup }
      if(!this.userdata.data){
        this.userService.semdMailForSignup(email).subscribe(data => {  
        })
      }
    
      if (this.check4 == false)
        this.documentservice.openSnackBar("Confirmation sent to your email", "X")
    }
  }

  onKeyDownstartfreetrialemail(emailForSignup) {
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
    this.check4 = false;
    if (regexp.test(emailForSignup)) {
      this.userService.getemail(emailForSignup.toLowerCase()).subscribe(data => {
        this.userdata = data
        this.emailchecked = true;
        if (this.userdata.data) {
          this.check4 = true
        }
      })
    }
  }


  onTap() {
    let navigationExtras: NavigationExtras = {
        queryParams: {
            "type": "Signup",
        }
    };
    this.router.navigate(["/"], navigationExtras);
}
}


