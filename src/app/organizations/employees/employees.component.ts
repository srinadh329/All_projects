import { Component, OnInit, HostListener, ViewChild, TemplateRef } from '@angular/core';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { GroupsService } from 'src/app/services/groups.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  OrganizationId
  employeelist:any;
  divheight: number;
  imgmimetype = ["image/apng", "image/bmp", "image/gif", "image/jpg", "image/jpeg", "image/png", "image/tiff", "image/webp"];
  audiomimetype = ["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp3"];
  videomimetype = ["video/mp4", "video/ogg", "video/webm"];
  docmimetype = ["application/msword", "text/csv", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  selectedUser: any;
  @ViewChild('Employee', { static: false }) Employee: TemplateRef<any>;
  @ViewChild('EmployeeMessages', { static: false }) EmployeeMessages: TemplateRef<any>;
  Groups
  listusers
  userMessage: any;
  chatdata: any;
  
  constructor(private Organization:OrganizationsService,private userService:UserService,private dialog: MatDialog,private groupService:GroupsService,private messageService:MessageService) {
    this.OrganizationId=JSON.parse(localStorage.getItem('Organization'))
    console.log("111111111",this.OrganizationId);
    
   }

  ngOnInit() {
    this.Organization.getorganizationdetais(this.OrganizationId._id).subscribe(data=>{
      console.log("22222222222",data);
      this.employeelist=data
    })

    this.divheight = window.innerHeight - 200;

  }
  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;

  }
  employeeDetails(details)
  {
    console.log(details);
    this.selectedUser=details
    this.userService.getFriendsdata(details._id).subscribe(users => {
      this.listusers = users;
      console.log( this.listusers);
      
    })

    this.userService.getGroupss(details._id).subscribe(groups =>{
      console.log(groups);
      
      this.Groups=groups
    })
  this.dialog.open(this.Employee,
    {
      height: '50%',
      width: '60%'
    });

  }

  chat(id)
{
  this.chatdata=id
  console.log(id);
  this.messageService.getMessages(id).subscribe(data => {
    this.userMessage = data
    console.log("userMessage",this.userMessage);
  })   
  let dialogRef = this.dialog.open(this.EmployeeMessages,
    {
      height: '100%',
      width: '100%'
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
groupMessages;
selectGroup
groupdata(firstGroupId)
{
  this.selectGroup = firstGroupId
  console.log(firstGroupId);
  
this.groupService.getGroupMessages(firstGroupId.GroupId._id).subscribe((res: any) => {
  this.groupMessages = res
  console.log("groupMessages",this.groupMessages);
  
})
let dialogRef = this.dialog.open(this.EmployeeMessages,
  {
    height: '100%',
    width: '100%'
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

selectMessage(dates)
{
  var obj={
    todate:dates.to_date,
    fromdate:dates.from_date,
    // id:this.chatdata
 
  }
  console.log(dates);
  this.userService.getEmployeeMessages(obj).subscribe(data=>{
    console.log(data);
    
  })
  
}
}
