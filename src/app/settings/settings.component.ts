import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { config } from '../configFile';
import { OrganizationsService } from '../services/organizations.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
weburl = this.configs.getWeburl();
UserData;
  Userid;
  Password;
  changepass;
  alert;
  passwordvalidation:boolean;
  userdata
  profileresponse
  hides:any
  oldpassword:any
  hide:any
  hide1:any
  orgname:any
  EmailId:any
  ngForm:any
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  organiztionDetails
  settings
  constructor(private userservice:UserService,private router:Router,private snackbar:MatSnackBar, private Organization:OrganizationsService, private configs: config,private route:ActivatedRoute) {
   this.UserData= JSON.parse(localStorage.getItem('userdetails'));
   console.log(this.UserData);
   
   this.Userid=this.UserData._id
    if(this.UserData.roleid.role_id == 3)
    {
   this.Organization.organizationDetails(this.UserData.organization_id._id).subscribe(data=>{
    console.log(data);
    this.organiztionDetails=data
   })
    
  }
   
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log("11111", params)
      this.settings=params.settings 
    })

  }
  password(password) {
    console.log(password.value);
    
    // if (password)
    // this.passwordvalidation = false
  
    //   this.userservice.getuserpassword(password.value).subscribe(data => {
    //     this.userdata = data;
    //     console.log(this.userdata);
    //     if (this.userdata.length != 0) {
    //       this.passwordvalidation = true;
    //       this.alert = "Incorrect OldPassword"
    //     }
    //   });
    }
    changePassword(data)
    {
      console.log(data)
      if(data.valid)
      {
        console.log(data.value);
       this.Password=data.value
        this.userservice.changepassword( this.Password).subscribe(change=>{
          console.log(change);
          this.changepass=change
          if(this.changepass.message == "Password Updated Successfully")
          {
            this.snackbar.open('Password Changed successfully', 'x', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
           this.router.navigate(['navbar/dashboard'])
          }
          if(this.changepass.message == "Incorrect Old Password")
          {
            this.alert="Incorrect Old Password"
          }
        })
      
      }
     
    }

    orgchangePassword(data)
    {
      console.log(data)
      if(data.valid)
      {
        console.log(data.value);
       this.Password=data.value
        this.userservice.changepassword( this.Password).subscribe(change=>{
          console.log(change);
          this.changepass=change
          if(this.changepass.message == "Password Updated Successfully")
          {
            this.snackbar.open('Password Changed successfully', 'x', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            })
           this.router.navigate(['navbar/dashboard'])
          }
          if(this.changepass.message == "Incorrect Old Password")
          {
            this.alert="Incorrect Old Password"
          }
        })
      
      }
     
    }


  

    createProfile(data)
    {
      if(data.valid)
      {
        console.log(data.value);
        this.orgname=data.value
        this.userservice.addProfile(this.orgname).subscribe(data => {
         
          this.snackbar.open("Organization Name Updated", "x", {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        })
      }

    }
imagePreview
file
selectedimg
    orgProfile(e)
    {
      this.selectedimg=e
      this.closeImagePreview = false
      this.file = e.target.files[0];
          
      const reader = new FileReader();
 
        reader.onload = () => {
          this.imagePreview = reader.result;
                 
        };
      reader.readAsDataURL(this.file)
      this.profileresponse = null
    }
    closeImagePreview:boolean
    closePreview()
    {

      this.closeImagePreview = true
      console.log(this.closeImagePreview);
      this.imagePreview=this.organiztionDetails.photo.path

    }

    emailerror1
    emailvalidation1
    EmailList1 = []
    selectable = true;
    removable = true;
    add(event: MatChipInputEvent) {
      console.log(event.input,event.value);
      
      const input = event.input;
      const value = event.value;
      this.emailerror1 = null;
      if ((value || '').trim()) {
        var value1 = value.toLowerCase();
        this.emailvalidation1 = false
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(value1));
        
        if (re.test(value1)) {
          console.log("Checking User Exists");
          this.userservice.checkUserExists(value1).subscribe((response: any) => {
            console.log(response);
            
            if(response.length>0) {
              this.emailerror1 = value1 + " is already a member. Cannot send a request.";
            }
            else {
              this.EmailList1.push(value1);
            }
          })                 
          }
          else {
            this.emailerror1 = "Invalid Email address. Kindly verify and re-enter."
          }
        // Reset the input value
        if (input) {
          input.value = '';
        }
      }
    }

    remove1(email): void {
      const index = this.EmailList1.indexOf(email);
  
      if (index >= 0) {
        this.EmailList1.splice(index, 1);
      }
    }

    reseterror(event) {
      console.log(event.target.value)
      this.emailerror1 = null;
    }
    loginUser
    invitationview

    SendInvite(emaillist) {
 
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log("Email List: ", emaillist);
      if(emaillist.length>0) {
      
        this.userservice.sendInviteMail({emaillist: emaillist, sender: this.loginUser, weburl: this.weburl}).subscribe((response:any) => {
          console.log("Response: ",response)
          if(response =="Success") {
            this.invitationview=true;
  
              this.snackbar.open("Invitations sent Successfully.", "x", {
                duration: 5000,
                verticalPosition: 'top',
                horizontalPosition: 'center'
              });
            
          }
        })      
      }
  
     this.EmailList1=[]
    }

    filesToUpload
    imagedata
    dataclick()
    {
     this.imagePreview=null
      this.filesToUpload = <Array<File>>this.selectedimg.target.files[0];
      const formData: any = new FormData(); // for image
      const files: Array<File> = this.filesToUpload;
                                                                                                                                                                                                                          
      formData.append("uploads[]", files,files['name']);
      this.userservice.saveFiles(formData).subscribe(data => {
        this.imagedata = data;
        console.log(this.imagedata );
        var obj={
          id:this.imagedata[0]._id
        } 
        this.userservice.addProfile(obj).subscribe(data => {
          this.profileresponse = data
          console.log("123456",this.profileresponse);
      })
      }) 

    }
  }