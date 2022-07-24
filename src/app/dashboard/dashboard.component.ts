import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  listusers;
  loginuserdata: any;
  _id: any;
  productsmenu: boolean;
  left
  displayBlog

  constructor(private router:Router,private userService:UserService,private messageservice:MessageService, private dialog: MatDialog) {
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    this._id=this.loginuserdata.id
   }

  ngOnInit() {
    this.userService.getFriends(this._id).subscribe(users => {
      this.listusers = users;
      console.log(this.listusers);
    })

  //   this.messageservice.showblog().subscribe(data=>{
  //     this.displayBlog=data
  //     console.log(this.displayBlog);
      
  //   })
  }
  contact()
  {
    this.router.navigate(['/navbar/sidenav'])
  }

  chatpage()
  {
    
    if(this.listusers.length <= 0){
      this.router.navigate(['/navbar/main'],{ queryParams: { value: false } })
    }
    if(this.listusers.length > 0)
    {
    if (this._id == this.listusers[0].receiverid._id) {
      this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[0]._id, userid: this.listusers[0].senderId._id, value: false } });
    }
    else if (this._id == this.listusers[0].senderId._id) {
      this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[0]._id, userid: this.listusers[0].receiverid._id, value: false } });

    }
  }
  }

  GroupVideoCall() {
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      data: {
        type: 'GroupVideoCall'
      }
    })
  }

  showproducts(){
    this.productsmenu=true;
  }
 
  createBlog()
  {
    this.router.navigate(['/navbar/blog'],{ queryParams: { select: "Create Blog" } })
  }

  showBlog()
  {
    this.router.navigate(['/navbar/blog'],{ queryParams: { select: "list of Blog" } })
  }
}
