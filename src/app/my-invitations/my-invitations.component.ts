import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrls: ['./my-invitations.component.css']
})
export class MyInvitationsComponent implements OnInit {
  loginUser
  emailid
  from: any;
  notificationservice: any;
  response
  Message;
  sentInvitations;
  update;
  constructor(private router:Router,private userService:UserService) {
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.emailid=this.loginUser.EmailId
    console.log(this.loginUser) 
   }

  ngOnInit() {
   
}
}
