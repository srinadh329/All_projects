import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router ,NavigationExtras} from '@angular/router';
import { DocumentService } from '../document.service';
import { AdminService } from '../admin.service';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-maillinks',
  templateUrl: './maillinks.component.html',
  styleUrls: ['./maillinks.component.css']
})
export class MaillinksComponent implements OnInit {

  constructor(public activatedroute: ActivatedRoute, private documentService: DocumentService,public dialog: MatDialog, public adminService: AdminService,private router: Router) { }
id :any;
_id:any;
userrecord:any
loggedIn:any
profiledata: any
  ngOnInit() {
    this._id= this.router.url.substring(this.router.url.lastIndexOf('/')  + 1)  
   
if(this._id!="checkuser")
    this.loggedIn = localStorage.getItem('loggedIn')
    if (this.loggedIn == 'true') {
      this.adminService.getProfile().subscribe(data => {
        this.profiledata = data
        var sharedata={
          fileid:this._id
        }
        this.documentService.decryptedvalues(sharedata).subscribe((filedata:any)=>{
          this.documentService.getSharingPeoples(filedata.decryptdata).subscribe(data => {
            this.userrecord=data
            if(this.userrecord.sharingpeoples[0].fromid.email ==this.profiledata.email)
            { 
           this.router.navigate(['filecont/'+this._id]);


            }
            else 
            {
              let dialogRef = this.dialog.open(CommonDialogComponent,
                { data: { title: 'dependency', name: 'dependency', content: 'You are not authorized to access the file. Login with your valid credentials to access the file' }, width: '500px', panelClass:'deletemod' });
              dialogRef.afterClosed().subscribe(res => {
                if (res) {
                  let navigationExtras: NavigationExtras = {
                    queryParams: {
                        "type": "individuallogin",
                        "fileid":this._id
                    },
                    skipLocationChange:true
                };
                this.router.navigate(["/"], navigationExtras  ) ;
                  // this.router.navigate(['/'], { queryParams: { id: this._id } });
                }
              }) 
            }
             });
        })
 
        });
    }
    else
    {
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { title: 'dependency', name: 'dependency', content: 'You are not authorized to access the file. Login with your valid credentials to access the file' }, width: '500px', panelClass:'deletemod' });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          let navigationExtras: NavigationExtras = {
            queryParams: {
                "type": "individuallogin",
                "fileid":this._id
            },
            skipLocationChange:true
        };
        this.router.navigate(["/"], navigationExtras);
          // this.router.navigate(['/'], { queryParams: { id: this._id } });
        }
      })
    }


  }

}
