
import { Component, OnInit, ViewChild, TemplateRef, HostListener } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material';
import { OrganizationsService } from 'src/app/services/organizations.service';
import { MessageService } from 'src/app/services/message.service';
import { GroupsService } from 'src/app/services/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-normalusers',
  templateUrl: './normalusers.component.html',
  styleUrls: ['./normalusers.component.css']
})
export class NormalusersComponent implements OnInit {
  UserChat
  NormalUsers:any;
  selectedUser;
  Groups
  rolesemp
  id:any;
  @ViewChild('NormalUser', { static: false }) NormalUser: TemplateRef<any>;
  @ViewChild('selectedmessage', { static: false }) selectedmessage: TemplateRef<any>;
  listusers: any;
  userMessage: any;
  imgmimetype = ["image/apng", "image/bmp", "image/gif", "image/jpg", "image/jpeg", "image/png", "image/tiff", "image/webp"];
  audiomimetype = ["audio/mpeg", "audio/ogg", "audio/wav", "audio/mp3"];
  videomimetype = ["video/mp4", "video/ogg", "video/webm"];
  docmimetype = ["application/msword", "text/csv", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  divheight: number;
 
  constructor(private route:ActivatedRoute,private router:Router,private userService:UserService,public dialog: MatDialog,private groupService:GroupsService,private orgservice:OrganizationsService,private messageService:MessageService) { 
    this.orgservice.getgetroles().subscribe(data =>{
      console.log('44444444',data[5]._id)
      this.rolesemp = data[5]._id;
      console.log(this.rolesemp);
    
      this.userService.getAllNormalUsers(this.rolesemp).subscribe(data=>{
          console.log(data)
          this.NormalUsers=data
          
        })

    })
    this.router.navigate(['/home/NormalUsers'])

  }

  ngOnInit() {
    this.divheight = window.innerHeight - 200;
    this.route.queryParams.subscribe(params => {
      console.log("11111", params)
      this.UserChat=params.data 
    })
  }
  @HostListener('window:resize') onWindowResize() {
    this.divheight = window.innerHeight - 200;

  }
  normalUsers(data)
  {

    console.log(data);
    this.selectedUser=data
    this.userService.getFriendsdata(data._id).subscribe(users => {
      this.listusers = users;
      console.log( this.listusers);
      
    })

    this.userService.getGroupss(data._id).subscribe(groups =>{
      console.log(groups);
      
      this.Groups=groups
    })
  let dialogRef = this.dialog.open(this.NormalUser,
    {
      height: '50%',
      width: '60%'
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
normalUserId
data(id)
{
  this.normalUserId=id
  this.dialog.closeAll();
  this.router.navigate(['/home/NormalUsers'], { queryParams:{data: "chat"}});
  console.log(id);
  this.messageService.getMessages(id).subscribe(data => {
    this.userMessage = data
    console.log("userMessage",this.userMessage);
  })   


}
groupMessages;
selectGroup
groupdata(firstGroupId)
{
  this.dialog.closeAll();
  this.router.navigate(['/home/NormalUsers'], { queryParams:{data: "groupChat"}});
  this.selectGroup = firstGroupId
  console.log(firstGroupId);
  
this.groupService.getGroupMessages(firstGroupId.GroupId._id).subscribe((res: any) => {
  this.groupMessages = res
  console.log("groupMessages",this.groupMessages);
  
})

}
selectedmessages
selectMessage(dates)
{
  var obj={
    todate:dates.to_date.toLocaleDateString('zh-Hans-CN').replace(/\//g,'-'),
    fromdate:dates.from_date.toLocaleDateString('zh-Hans-CN').replace(/\//g,'-'),
    id:this.normalUserId
 
  }
  console.log("111",dates,"222",obj);
  this.userService.getEmployeeMessages(obj).subscribe(data=>{
    console.log(data);
    this.selectedmessages=data
    let dialogRef = this.dialog.open(this.selectedmessage,
      {
        height: '75%',
        width: '60%'
      });
   
  })
  
}
exportMessages()
{
  console.log(this.selectedmessages);
  const documentDefinition = { content: this.selectedmessages };
  pdfMake.createPdf(documentDefinition)
  // this.dialog.closeAll()
}
}