
import { Component, OnInit, ViewChild, ElementRef, Input, Inject, ViewEncapsulation } from '@angular/core';

declare var $: any;
declare var H: any;

import { GeneralService } from '../general.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  req=false;
  isMsg=false;
  contactloader=false;
  lname
  email
  mnumber
  message
  fname

  successalert:boolean=false //success message alert
  failalert:boolean=false //fail message alert
  contactdata:any // submiting data
  iebrowser // for Ie validtions
  nameinvalid  // for Ie validtions
  emailinvalid  // for Ie validtions
  mobileinvalid // for Ie validtions
  invalidmsg // for Ie validations
  constructor(private generalService:GeneralService) { }

  ngOnInit() {
    if((!!(window as any).MSInputMethodContext && !!(document as any).documentMode))
    {
      this.iebrowser=true
    }
    else 
    {
      this.iebrowser=false
    
    } 
    $(document).ready(function(){

      $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

  }
  contactSubmit = function(user)
  {
    if(!user.valid)
    {
      this.nameinvalid=true
      this.emailinvalid=true
      this.mobileinvalid=true
      this.invalidmsg=true



    }
      this.req=true; 
      if(user.valid)
      {
        this.req=false;
        this.generalService.contact(user.value).subscribe(data =>{
   this.contactdata=data
          user.resetForm();
         if(this.contactdata.res){
         this.successalert=true;
         }else{this.failalert=true}
        },error =>{
       //  this.failalert=true
        
        })
      }
    
  }
  checkname(data)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.nameinvalid=true
    }
    else
    {
       this.nameinvalid=false
    }
 
  
  }
  checkemail(data){
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.emailinvalid=true
    }
    else
    {
       this.emailinvalid=false
    }
  }

  checkmobile(data){
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.mobileinvalid=true
    }
    else
    {
       this.mobileinvalid=false
    }
  
  }
  checkmsg(data)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      this.invalidmsg=true
    }
    else
    {
       this.invalidmsg=false
    }
  }
  

}
