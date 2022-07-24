import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-newsignup',
  templateUrl: './newsignup.component.html',
  styleUrls: ['./newsignup.component.css']
})
export class NewsignupComponent implements OnInit {

  constructor(private router: Router,public userService: UserService,public activatedroute: ActivatedRoute,public adminservice:AdminService) { }
  id:any;
  show=true
  active:any
  hide=true;
  hide1=true;
  hide2=true;
  password:any
  show1:any

  ngOnInit() {
  this.id=this.activatedroute.snapshot.paramMap.get("id");
  }

 signup = function (data,title) {
 
  if(title=='individual') this.formSubmitted = true;
  
   data.value.type="individual";
   data.value.role="user"
   this.displayerror = false;
  //  if (data.valid && this.check == false) {
     if(title=='individual') this.formSubmitted = false;
     if(title=='organisation') this.organisation_formSubmitted = false;
      data.value.email=this.id
       data.value.linkSignup="linkSignup"
     this.adminservice.saveuser(data.value).subscribe(data => {       
       this.show1=true
       if (data.token) {
         this.userService.setUserLoggedIn(data.token)
         this.router.navigate(['/home/myfiles/']); 
       }
     })
   
//  }
   
 }
}
