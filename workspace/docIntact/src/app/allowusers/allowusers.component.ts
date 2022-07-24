import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras,RoutesRecognized} from '@angular/router';
import { DocumentService } from '../document.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdminService } from '../admin.service';
import { Location } from "@angular/common";
import { PlatformLocation } from '@angular/common'
import { DataService } from '../core/data.service'
import { GeneralService } from '../general.service';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { SignupdialogboxComponent } from '../signupdialogbox/signupdialogbox.component';
import { UserService } from '../user.service';
import { filter, pairwise } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { FrontEndConfig } from '../frontendConfig';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-allowusers',
  templateUrl: './allowusers.component.html',
  styleUrls: ['./allowusers.component.css']
})
export class AllowusersComponent implements OnInit,OnDestroy {
  type: any
  routersub: Subscription;
  routermatch: any;
  constructor(private generalservice: GeneralService, private dataservice: DataService, private location: PlatformLocation, public activatedroute: ActivatedRoute, private router: Router, private documentService: DocumentService, public dialog: MatDialog, public adminService: AdminService,public userService: UserService, private frontendconfig: FrontEndConfig) {
   this.routersub= this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
    ).subscribe((e: any) => {
        if(this.loggedIn=='true'){
          this.routermatch=e[0].urlAfterRedirects.split('/')[1]
          if(this.routermatch=="Sharereview") this.router.navigate(['/home/myfiles'])
         }
        });
  }
  _id
  loggedIn
  show: boolean = false
  sharedocument;
  errorres: any
  selectedDoc
  profiledata: any
  id: any
  locationchange: any
  expired: boolean = false
  userdata:any
  sharefromid
  agree
  ngOnInit() {
    this._id = this.activatedroute.snapshot.paramMap.get("id");
    console.log(this._id)
    this.loggedIn = localStorage.getItem('loggedIn')

    if (this.loggedIn == 'true') {
      this.adminService.getProfile().subscribe(data => {
        this.profiledata = data

        this.documentService.getpass(this._id).subscribe((data:any) => {
          console.log(data)
          
          this.sharedocument = data;
          //encryption of ids
          var shareddata ={
            sharedid:this.sharedocument._id,
            fileid:this._id
          } 
          this.documentService.encryptedvalues(shareddata).subscribe((sharedata:any)=>{
         var encryptedshareid=sharedata.sharedid
          var  encryptedid=this._id
          // var encryptedshareid =this.userService.encryptData(this.sharedocument._id)
          // var encryptedid=this.userService.encryptData(this._id)
          this.userService.getUserData(this.sharedocument.toemail).subscribe(data => {
            this.userdata=data
          if (this.sharedocument.length == 0) {
          }
          if (this.sharedocument.validity == undefined && this.sharedocument._id) {
            if ((this.profiledata.email).trim() == (this.sharedocument.toemail).trim()) {
              this.documentService.getSelectedDoc(this.sharedocument.fileid).subscribe(data1 => {
                this.selectedDoc = data1

               this.userService.getuserid(this.selectedDoc.uid).subscribe(userdata=>{
                     this.sharefromid=userdata
                if (this.sharedocument.accesstype == "Allowusers") {
                  if(this.sharedocument && this.sharedocument.agreetoSign==false){
                    document.getElementById('basicExampleModal').click()
                  }else{
                    this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
                  }
                                    
                                  }
                                  else if (this.sharedocument.accesstype == "public") {
                                    this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
                                   
                                  }
               })

              });
            }
            else if (this.profiledata.email != this.sharedocument.toemail && this.userdata.data) {
              if (this.sharedocument.accesstype == "Allowusers") {
              let dialogRef = this.dialog.open(CommonDialogComponent,
                { data: { title: 'dependency', name: 'dependency', content: 'You are not authorized to access the file. Login with your valid credentials to access the file' }, width: '500px', panelClass:'deletemod' });
              dialogRef.afterClosed().subscribe(res => {
                if (res) {
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "type": "individuallogin",
                        "id": this._id
                    },
                    skipLocationChange:true
                };
                this.router.navigate(["/"], navigationExtras);
                  // this.router.navigate(['/'], { queryParams: { id: this._id } });
                }
              })
            }
            else if (this.sharedocument.accesstype == "public") {
              this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
             
            }
            }
             else if (this.profiledata.email != this.sharedocument.toemail && !this.userdata.data) {
              
              if (this.sharedocument.accesstype == "Allowusers") {
              let dialogRef = this.dialog.open(CommonDialogComponent,
                { data: { title: 'dependency', name: 'dependency', content: 'You are not authorized to access the file. Signup  with your valid Details to access the file' }, width: '500px', panelClass:'deletemod' });
              dialogRef.afterClosed().subscribe(res => {
                if (res) {
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "type": "individualsignup"
                    },
                    skipLocationChange:true
                };
                this.router.navigate(["/"], navigationExtras);
                  // this.router.navigate(['/'], { queryParams: { id: this._id } });
                }
              })
            }
            else if (this.sharedocument.accesstype == "public") {
              this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
             
            }
          }
          
          }
          if (this.sharedocument.validity == 'expired') {
            this.expired = true
          }
        });
      })
      })
    })
    }
    else {
      this.documentService.getpass(this._id).subscribe(data => {
        this.sharedocument = data;
        var shareddata ={
          sharedid:this.sharedocument._id,
          fileid:this._id
        } 
        //encryption of ids
        this.documentService.encryptedvalues(shareddata).subscribe((sharedata:any)=>{

          var encryptedshareid=sharedata.sharedid
           var  encryptedid=this._id
        // var encryptedshareid =this.userService.encryptData(this.sharedocument._id)
        // var encryptedid=this.userService.encryptData(this._id)
        this.userService.getUserData(this.sharedocument.toemail).subscribe(data => {
         this.userdata=data

        if (this.sharedocument.validity == undefined && this.sharedocument._id && this.userdata.data) {
          
          if (this.sharedocument.accesstype == "Allowusers") {
            
            let navigationExtras: NavigationExtras = {
              queryParams: {
                  "type": "individuallogin",
                  "id": this._id
              }
              ,skipLocationChange:true
          };
          this.router.navigate(["/"], navigationExtras);
          }
  
          else if (this.sharedocument.accesstype == "public") {
            this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
          

          }
        }
       if (this.sharedocument.validity == undefined && this.sharedocument._id && !this.userdata.data) {
          
          if (this.sharedocument.accesstype == "Allowusers") {
            let dialogRef = this.dialog.open(CommonDialogComponent,
              { data: { title: 'dependency', name: 'dependency', content: 'You are not authorized to access the file. Signup  with your valid Details to access the file' }, width: '500px', panelClass:'deletemod' });
            dialogRef.afterClosed().subscribe(res => {
              if (res) {
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                      "type": "individualsignup",
                      "id": this._id
                  },
                  skipLocationChange:true
              };
              this.router.navigate(["/"], navigationExtras);
              }
            })
   
          }
  
          else if (this.sharedocument.accesstype == "public") {
            this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
           

          }
        }
        if (this.sharedocument.validity == 'expired') {
          this.expired = true
          // let dialogRef = this.dialog.open(CommonDialogComponent,
          //   { data: { name: 'expired', cancel: true, content: 'Link got expired !!!!!!' }, width: '500px', panelClass: "deletemod" });
          // dialogRef.afterClosed().subscribe(res => {
          //   if (res) {
          //     this.router.navigate(['/'], { queryParams: { id: this._id } ,skipLocationChange:true});
          //   }
          // });
        }
        if (this.sharedocument.length == 0) {

          const ConfirmationDiaBox = this.dialog.open(SignupdialogboxComponent, {
            width: '500px',
            disableClose: true,
            autoFocus: true,
            data: { title: "You don't Have an Access to View this file", content: 'Remove', Docflag: true }
          });
        }

      });
    })
    })

    }
  }
  ngOnDestroy()
  {
    if(this.routermatch=="Sharereview") this.routersub.unsubscribe }
    termsandpol()
{
  window.open(this.frontendconfig.frontendurl + '/termsandcondition', '_blank');
  
}
privacypolicy(){
  window.open(this.frontendconfig.frontendurl + '/privacypolicy', '_blank');

}
agreeToSign(shareDoc, agreetosign) {

var data = { _id: this.sharedocument._id, agreetoSign: agreetosign };

  if (agreetosign) {
      this.documentService.put('sharingpeoples/sharedoc/update/' + data._id, data).subscribe(data => {
        if (agreetosign) {
          var shareddata ={
            sharedid:this.sharedocument._id,
            fileid:this._id
          } 
          
          this.documentService.encryptedvalues(shareddata).subscribe((sharedata:any)=>{
            var encryptedshareid=sharedata.sharedid
            var  encryptedid=this._id
            document.getElementById('basicExampleModalclose').click()
            this.router.navigate(['/Sharereview/'+encryptedshareid+'/'+encryptedid]);
          })
          
        }
      });
    

  }
  else this.documentService.openSnackBar("Agree to our Terms and Conditions and Privacy Policy", "X")
}

}
