import { Component, OnInit,NgZone } from '@angular/core';
import { FrontEndConfig } from '../frontendconfig';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatDialog } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-homenavbar',
  templateUrl: './homenavbar.component.html',
  styleUrls: ['./homenavbar.component.css']
})
export class HomenavbarComponent implements OnInit {
  notify: any;
  count = 0;
  loginresult: any;
  login: Boolean;
  slugdata;
  emaildata;
  obj;

  constructor(public dialog: MatDialog,private snackbar: MatSnackBar, private router:ActivatedRoute, private userService:UserService,private route : Router,private zone: NgZone) {

  }

    ngOnInit(){  
     if(this.router.snapshot.queryParams && this.router.snapshot.queryParams.slug) { 
      this.slugdata = this.router.snapshot.queryParams.slug.split("/")[0]
      this.emaildata = this.router.snapshot.queryParams.slug.split("/")[1]
      this.obj = {
        slug:this.slugdata,
        email:this.emaildata
      };
      this.userService.invitationExpiry(this.obj).subscribe(data=>{
        console.log(data);
        if(data != "SUCCESS"){
          this.route.navigate(["errorpage"])
        }
     });
    // alert(window.location.href)
     if(this.slugdata !== undefined) {    
      console.log(this.router.snapshot.queryParams.slug.split("/")[1]);
      console.log(this.slugdata);    
      this.loginButton();
     }
  }
  else if(this.router.snapshot.queryParams && this.router.snapshot.queryParams.join) {
    this.obj = {
      GroupId: this.router.snapshot.queryParams.join,
      InvitedBy: this.router.snapshot.queryParams.a,
      InviteeEmail: this.router.snapshot.queryParams.b
    };
    console.log("this.obj: ",this.obj);
    this.userService.GroupinvitationExpiry(this.obj).subscribe(data=>{
      console.log("data: ",data);
      if(data != "SUCCESS"){
        this.zone.run(() => {
          this.snackbar.open(`Invitation link has expired.`, "x", {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        });
        this.route.navigate(["errorpage"])
      }
   });
   if(this.router.snapshot.queryParams.join !==undefined) {
     this.loginButton();
   } 
  }
}

p;
test(x,y){
  this.p=x+y;
return this.p
}

  loginButton(): void {
    const logindialogRef = this.dialog.open(LoginComponent, {
      disableClose: true,
      autoFocus: true,
      width: '1140px',
      // height:'767px',
      maxHeight:'767px',
      panelClass:'logindialog',
      data: {
        type: 'login',
        client: true
      }
    });
    logindialogRef.afterClosed().subscribe(result => {
      console.log("closed")
      this.loginresult = result;
      if (this.loginresult == 'yes') {
        this.login = true;
      }
    });
  }

  logOut() {
    if (localStorage.getItem('role') == "admin") this.adminLogout();
    if (localStorage.getItem('role') == "Client") this.UserLogout();
    if (localStorage.getItem('role') == "PremiumUser") this.PremiumUserLogout();
  }

  adminLogout = function () {
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    this.userService.setAdminLogout();
    this.login = false;
    this.router.navigate(['/']);
  }

  UserLogout = function () {
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    this.userService.setClientLogout();
    this.login = false;
    this.router.navigate(['/']);
  }
  PremiumUserLogout = function () {
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    this.userService.setPremiumUserLogout();
    this.login = false;
    this.router.navigate(['/']);
  }

invitingFriend(invitingfrienddata){
this.userService.invitingFriend(invitingfrienddata).subscribe(data=>{
  console.log(data);
 });
}

acceptFriend(acceptfriend){
this.userService.acceptFriend(acceptfriend).subscribe(data=>{
  console.log(data);
 })
}

rejectFriend(rejectfriend){
  this.userService.rejectFriend(rejectfriend).subscribe(data=>{
    console.log(data);
  })
}

}
