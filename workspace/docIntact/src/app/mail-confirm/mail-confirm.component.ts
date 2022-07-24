import { Component, OnInit,ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
import { CountdownComponent } from 'ngx-countdown';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-mail-confirm',
  templateUrl: './mail-confirm.component.html',
  styleUrls: ['./mail-confirm.component.css']
})
export class MailConfirmComponent implements OnInit {
  @ViewChild('countdown') counter: CountdownComponent;

  emailconfirmation;
  show=false;

  constructor(private adminservice:AdminService,private documentservice:DocumentService,public activatedroute:ActivatedRoute,public userService:UserService) { }
  linkdisable=false;
  email:any;
  ngOnInit() {
    var email = this.activatedroute.snapshot.paramMap.get("id");
    this.email = this.userService.decryptData(email);
  }
  status;

  resendEmailLink()
  {
    this.show=true;
    this.linkdisable=true;
    var data = { email: this.email };
    this.adminservice.resendConfirmationEmail(data).subscribe(data => {
      this.emailconfirmation=data     
      this.counter.restart();
      if(this.emailconfirmation.res=="success"){
        this.documentservice.openSnackBar("Verification link sent to Email","X")
      }
    })
  }
  finishTest() {
    this.linkdisable=false;
    this.show=false;
    this.status = 'finished';
    this.counter.stop();
  }
}
