import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-orgemployes',
  templateUrl: './orgemployes.component.html',
  styleUrls: ['./orgemployes.component.css']
})
export class OrgemployesComponent implements OnInit {
orgemp;
rolesemp;
contact_person_email:any
@ViewChild('addingEmployee', { static: false }) addingEmployee: TemplateRef<any>;
@ViewChild('empdetails', { static: false }) empdetails: TemplateRef<any>;
  divheight: number;
  showempsucess: boolean;
  fetchdetails: any;
  constructor(private router:ActivatedRoute,private orgservice: OrganizationsService,public dialog: MatDialog,private userservice:UserService,private messageservice:MessageService) { 
 
  }

  ngOnInit() {

    this.divheight = window.innerHeight - 200;
    
    this.router.queryParams.subscribe(params => {
      console.log("222222", params);
      this.orgservice.getorganizationdetais(params.id).subscribe(data =>{
        console.log('78978989',data)
        this.orgemp =data;
      })
      this.orgservice.getgetroles().subscribe(data =>{
        console.log('44444444',data)
        this.rolesemp =data;
      })
    })
  }

  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;

  }
  addemployee() {
    
    let dialogRef = this.dialog.open(this.addingEmployee,
      {
        height: '380px',
        width: '500px'
      });
    dialogRef.afterClosed().subscribe(result => {
  
      if (result !== undefined) {
        if (result === 'yes') {
          console.log('User clicked yes');
        }
        else if (result === 'no') {
          console.log('User clicked no');

        }
      }
     
    })
  }
  emailvalidation
  userdata
  alert
  onBlurEmail(email) {
    if (email) var email1 = email.toLowerCase();
    this.emailvalidation = false
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
    if (regexp.test(email1)) {
      this.userservice.getuseremail(email1).subscribe(data => {
        this.userdata = data;
        console.log(this.userdata);
        if (this.userdata.length != 0) {
          this.emailvalidation = true;
          this.alert = "Email already Exist"
        }
      });
    }
  }
  createusers:any;
  creatingNewEmployee(data){
    
    this.orgservice.createorgemp(data).subscribe(data =>{
    this.createusers = data
    this.showempsucess=true;
    })
    
  }
  Showempdetails(i:any){

    
      let dialogRef = this.dialog.open(this.empdetails,
        {
          height: '360px',
          width: '500px'
        });
      dialogRef.afterClosed().subscribe(result => {
    
        if (result !== undefined) {
          if (result === 'yes') {
            console.log('User clicked yes');
          }
          else if (result === 'no') {
            console.log('User clicked no');
  
          }
        }
       
      })

      this.fetchdetails = this.orgemp[i];
     console.log("ttt", this.fetchdetails)
  }
}
