import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { DocumentService } from '../document.service';
import * as _moment from 'moment';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { UserService } from '../user.service';

const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-transaction-verify',
  templateUrl: './transaction-verify.component.html',
  styleUrls: ['./transaction-verify.component.css']
})
export class TransactionVerifyComponent implements OnInit{
  id: any;
  type: any;
  valueRecord: any

  data: any;
  content: any;
  valid;
  notvalid;
  documentid
  logdata
  log
  encrtptid
  encrtpttype
  encrtptdocid
  loggedIn
  profiledata
  userEmail
  clearintervaldata
  constructor(public userservice :UserService, public activatedroute: ActivatedRoute, private router: Router, public documentservice: DocumentService) {
    var urldata = this.router.url.split('/');
    this.encrtptid=urldata[3];
    this.encrtptdocid =urldata[4];
    this.encrtpttype=urldata[2];
   }

  ngOnInit() {
  

    this.loggedIn = localStorage.getItem('loggedIn')
    this.profiledata = JSON.parse(localStorage.getItem('currentUser'));
 

if(this.encrtptid&&this.encrtpttype&& this.encrtptdocid )
{
 var data={ id:this.encrtptid ,type: this.encrtpttype,docid:this.encrtptdocid}
  this.documentservice.decryptedvalues(data).subscribe((data:any)=>{
if(data)
{
  this.id=data.id;
  this.type=data.type
  this.documentid=data.docid
}
if(this.id)  
this.securityverify();
if(this.documentid)
this.docLogs();
  })

}
if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
{
 this.clearintervaldata=setInterval(() => {
    this.ccb(); 
    }, 100);
}

}
ngOnDestroy() {
  clearInterval(this.clearintervaldata);
}

 clearData(){
  window["clipboardData"].setData('text','')
}
 ccb(){
if(window["clipboardData"]){
 window["clipboardData"].clearData();
}
}
  docLogs() {
    console.log(this.documentid)
    var doc = { _id: this.documentid }
    this.documentservice.getDocumentLogs(doc).subscribe(data => {
      this.logdata = data
      if (data) {
        console.log(this.type,this.id)
        if (this.type == "signature" || this.type == "initial" || this.type == "Signature" || this.type == "Initial")       
          this.log = this.logdata.find(x => x.signatureId == this.id);
        if (this.type == "Stamp") this.log = this.logdata.find(x => x.stampId == this.id);
        if (this.type == "Photo") this.log = this.logdata.find(x => x.photoId == this.id);
        console.log(this.log)
      }
    });
  }

  async securityverify() {
    if (this.type == "signature" || this.type == "initial" || this.type == "Signature" || this.type == "Initial"){
      await this.documentservice.getSignature(this.id).subscribe((res:any) => {
       this.valueRecord = res;
        this.verify();
      });

     
    }
 
    else if (this.type == "Stamp"){
      await this.documentservice.getStamp(this.id).subscribe(res => {
        this.valueRecord = res;
        this.verify();
      });
    }
  
    else if (this.type == "Photo"){
      await this.documentservice.getPhoto(this.id).subscribe(res => {
        this.valueRecord = res;
        this.verify();
      });

    }
    
  }

  penDownload() {
    window.open(this.valueRecord.pemFilePath)
  }

  verify() {
    var time = moment().format();
    if (time >= this.valueRecord.expirydate) this.notvalid = true;
    else this.valid = true;
  }

  // navigate = function(){
  //   this.documentservice.getSelectedDoc(this.fileid).subscribe(data => {
  //     console.log(data);
  //     this.content = data
  //   })
  //   this.router.navigate(['/filecontent/:id'], { queryParams: { id: this.content.encryptedid, _id: this.content._id } });
  // }
  navigatetofiles(){
    console.log(this.logdata)
if(this.loggedIn && this.profiledata && this.profiledata.email && this.log){
 console.log(this.profiledata)
  this.userEmail = this.userservice.decryptData(this.profiledata.email);
  if(this.userEmail == this.log.email){
    this.router.navigate(['/home/myfiles/']);
 }else{
  this.router.navigate(['/']);

 }
  }
  else{
    this.router.navigate(['/']);

  }
  }
}
