import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, ChildActivationEnd } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { MessageService } from 'src/app/services/message.service';
import { LoginComponent } from '../login/login.component';
import { config } from 'src/app/configFile';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GroupsService } from '../services/groups.service';
import { MatSnackBar, MatDialog} from '@angular/material';
import { Subscription } from 'rxjs';
import { FrontEndConfig } from '../frontendconfig';
import { isNullOrUndefined } from 'util';
import { map } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { OrganizationsService } from '../services/organizations.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOut1', [
      state('in', style({

        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%,0,0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideInOut2', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)',
        left: '-6rem'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  
  ]
})
export class NavbarComponent implements OnInit {
  subscription: Subscription
  loginuserdata;
  _id;
  weburl;
  urllink;
  alreadyreg: Boolean;
  response: any;
  nodata: Boolean = false
  emailcheck: Boolean = false
  error: any;
  sendMailres
  recmail
  recevData;
  subsVar: any;
  newcount = 0;
  notify1: any;
  menuState: string = 'out';
  notificationState: string = 'out';
  Name: any;
  isShown = false;
  isShown1 = false;
  isShown2 = true;
  butnclick = false;
  userprofiledata: any;
  uprofile: any
  userForm: any;
  viewNotifiction: boolean = false;
  listusers: any;
  notify; // For notification
  notificationsdata = []
  data;
  loginUser;
  sentInvitations: any = [];
  Emailid

  Userdetails: any;
  selectedUser: any;
  groups: any;
  groupInvitations: any = [];
  x: boolean;
  contactpage: string = 'out';
  changepasswordState: string ='out';
  zindex: boolean;
  searchenable: boolean;
  invitefriendres: any;
  regresponse: any;
  viewcontact: boolean;
  serverurl: any;

  dashboardactive: boolean;
  notificationactive: boolean;
  contactactive: boolean;
  chatactive: boolean;
  groupactive: boolean;
  onScroll: any;
  pic: Boolean;
  Groups: any;
  profileresponse;
  isphotoClicked: Boolean = false;
  imagePreview: any;
  filesToUpload: Array<File> = [];
  imagedata;
  searchterm;
  personadd;
  invitationview;
  EmailId;
  menu;
  autoRefreshFriendsUn: Subscription;
  autoRefreshGroupsUn: Subscription;
  autoRefreshNotificatioUn: Subscription;
  incognitores: any;
  incognitoo: boolean;
  incognitoRes: any;
  roleid
  UserData
  Userid
// mobileno validation
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";  
  divheight: number;
  adduseractive: boolean;
  constructor(private groupsService: GroupsService, private configs: config, private userService: UserService, private router: Router, private frontendconfig: FrontEndConfig, private notification: NotificationsService, private messageService: MessageService, private route: ActivatedRoute,private dialog: MatDialog, private snackbar: MatSnackBar,private orgservice: OrganizationsService) {
    this.weburl = this.configs.getWeburl();
    if (localStorage.getItem('role')) this.socketConnect();
    if (localStorage.getItem('role')) {
      this.autoRefreshNotify();

    }
    this.UserData= JSON.parse(localStorage.getItem('userdetails'));
   console.log(this.UserData);
   this.UserData?this.Userid=this.UserData._id:""

    //getting freinds for passing query params
    this.userService.getFriends(this._id).subscribe(users => {
      this.listusers = users;
    })



    this.serverurl = this.frontendconfig.getserverurl(); // for image url
    this.clientNotificationValue();
   // Service invoking for Notification count

    this.autoRefreshNotificatioUn = this.messageService.autoRefreshNotification().subscribe(data => {
      if (data && !data.read && data.receiverid._id == this._id && data.status == "Pending") {
        this.newcount = this.newcount+1;
      }
      // else if (!data.read &&  data.senderId._id == this._id && data.status != "Pending") {
      //   this.newcount = this.newcount +1;

      // }
    
    });
    this.autoRefreshGroupsUn = this.messageService.autoRefreshGroupNotifications().subscribe(data => {
      
      if (data && !data.read && data.memberId._id == this._id && data.status == "Pending") {
        this.newcount = this.newcount+1;
        console.log("member");
        
      }
      // this.notification.getNotifications().subscribe(data => {
      //   console.log(data,"okkkkkkkkkkkkklllllllllll");
        
      //   this.notify = data;
      //   this.newcount = this.notify.filter(x => !x.read).length;
      // });
    });
    this.autoRefreshFriendsUn = this.messageService.autorefreshFriends().subscribe(data => {
      if (data.senderId._id == this._id || data.receiverid._id == this._id) {
        this.userService.getFriends(this._id).subscribe(users => {
          this.listusers = users;
          this.listusers.push(data);
        })
      }
    });

    this.messageService.incognitochat().subscribe(data =>{
      let Data = data;
      console.log("Dataaaaaaaaa", Data);
      if(Data.loginuser == this.loginuserdata.id){
        console.log("####################");
        this.incognitores = data;
          this.incognitoo = true;
          document.getElementById("incognitoaccept").click()
      }
  })

   // This is for incognitoaccept chat socket emit function
    this.messageService.INCOGNITOCHATACCEPT6().subscribe(data=>{
    this.incognitoRes = data    
    if(this.incognitoRes.chatuser == this.loginuserdata.id){
     this.snackbar.open("user was accepted your request Let's start incognito chat", "x", {
       duration: 4000,
       verticalPosition: 'top',
       horizontalPosition: 'center'
     });
    }  
  })
  this.LoadProfile()
    this.roleid= JSON.parse(localStorage.getItem('userdetails'));
    console.log('56756756',this.roleid)
  }
  ngOnInit() {
    this.divheight = window.innerHeight ;
 
    this.router.events.pipe(map(() => {
      let child = this.route.firstChild;
      while (child) {
      if (child.firstChild) {
      child = child.firstChild;
      
      } else if (child.snapshot.queryParams['value'] ) {
      return child.snapshot.queryParams['value'];
      } else {
    return null;
      }
      }
      return null;
      })).subscribe(title => {
        
        //console.log(title)
       if(title=='true'){
         this.chatactive=false;
         this.groupactive=true;
         this.dashboardactive=false;    // comment out in previouss

        //  this.chatactive=false;
      }

       else if(title=='false'){
        this.chatactive=true;
        this.groupactive=false;
        this.dashboardactive=false;
       }
       else if (title==null){
         this.chatactive=false;
         this.groupactive=false;
         this.dashboardactive=true; /// comment in previous
       }



    });
    
    this.loginuserdata = JSON.parse(localStorage.getItem('currentUser'));
    this.Name = this.loginuserdata.Name
    if (this.loginuserdata.id) this._id = this.loginuserdata.id;
    this.Emailid = this.loginuserdata.EmailId;
    this.createSlug(this.loginuserdata);
    // Service invoking for Notification count
    //  this.messageService.notifier.subscribe(data => {
    //    var notify = data;
    //    console.log("Notification count",data)
    //    this.newcount = notify.filter(x => !x.read).length;
    //  });   
    //getting groups for passing query params
    this.userService.getGroupss(this._id).subscribe(groups => {
      this.Groups = groups;
    })
    this.userService.getInvitations(this.loginuserdata.id).subscribe(invitations => {
      {
        this.sentInvitations = invitations;  
        console.log(this.sentInvitations)
      }
    });
    this.userService.getGroupInvitations(this.loginuserdata.id).subscribe(invitations => {
      this.groupInvitations = invitations;
      console.log(this.groupInvitations);
      

    })
  }

  GroupVideoCall() {
    const logindialogRef = this.dialog.open(LoginComponent, {
      width: '800px',
      data: {
        type: 'GroupVideoCall'
      }
    })
  }

  update(data, status, i) {
    var updatedata = {
      senderId: data.senderId._id,
      receiverid: data.receiverid._id,
      from: this.loginuserdata.EmailId,
      to: data.to,
      status: status,
      _id: data._id
    }
    this.userService.Updatestatus(updatedata).subscribe(res => {
      this.sentInvitations.splice(i, 1)
      this.sentInvitations.push(res)
    });
  }
  test: any;
  //Updating group members
  updateGroup(data, status, i) {
    var info = {
      id: data._id,
      status: status
    }
    console.log(info);
    this.groupsService.updateGroupMember(info).subscribe((res: any) => {
      this.groupInvitations.splice(i, 1)
      if (res === 'Rejected') {
         
       }
      else {
        this.router.navigate(['/navbar/main'], { queryParams: { gid: res.GroupId._id, gname: res.GroupId.GroupName, value: true } });
      }

    })
  }

  toggleMenu() {
    this.isShown = !this.isShown;
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isShown1 = false;
    this.isShown2 = true;
    this.butnclick = false;
    this.zindex = false;
    this.dashboardactive = false;
    this.groupactive = false;
    this.notificationactive = false;
    this.chatactive = false;
    this.contactactive = false;
    this.adduseractive=false;
    this.LoadProfile()
  }

  @HostListener('window:resize') onWindowResize() {

    this.divheight = window.innerHeight ;
    // this.chtheight = window.innerHeight - 200;

  }
  close() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
    this.isShown = false;
    this.butnclick = false;
    this.isShown2 = true;
    this.isShown1 = false
    this.imagePreview = null

  }
  close1() {
    this.notificationState = this.notificationState === 'out' ? 'in' : 'out';
    this.isShown = false;
    this.notificationactive = false;
  }
  edit() {
    this.butnclick = true;
    this.isShown1 = true;
    this.isShown2 = false;
    this.imagePreview = null
  }
  back() {
    this.butnclick = false;
    this.isShown1 = false;
    this.isShown2 = true;
  }
  logOut() {
    if (localStorage.getItem('role') == "admin") this.adminLogout();
    if (localStorage.getItem('role') == "Client") this.UserLogout();
    if (localStorage.getItem('role') == "PremiumUser") this.PremiumUserLogout();
    localStorage.removeItem('blogDetails')
    localStorage.removeItem('blogPicId')
  }

  adminLogout = function () {
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    localStorage.removeItem('adminloggedIn')
    localStorage.removeItem('profile')

    this.userService.setAdminLogout();
    this.login = false;
    this.router.navigate(['']);
  }

  UserLogout = function () {
    let obj = {
      email: this.loginuserdata.EmailId,
      loginStatus: 0
    }
    this.userService.updateloginstatus(obj).subscribe(data => {
    });
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    localStorage.removeItem('clientloggedIn')
    localStorage.removeItem('profile')
    localStorage.removeItem('chatuser')
    this.userService.setClientLogout();
    this.login = false;
    this.router.navigate(['']);
  }
  PremiumUserLogout = function () {
    this.socketDisConnect();
    localStorage.removeItem('currentUser')
    localStorage.removeItem('role')
    localStorage.removeItem('loggedIn1')
    localStorage.removeItem('profile')
    this.userService.setPremiumUserLogout();
    this.login = false;
    this.router.navigate(['']);
  }


  myinvitations() {
    this.router.navigate(['MyInvitations'])

  }

  navigate() {
    this.x = true;
    if(this.listusers) {
      if (this.listusers.length <= 0) {
        this.router.navigate(['/navbar/main'], { queryParams: { value: false}});
      }
      if (this.listusers.length > 0) {
        if (this._id == this.listusers[0].receiverid._id) {
          this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[0]._id, userid: this.listusers[0].senderId._id, value: false } });
        }
        else if (this._id == this.listusers[0].senderId._id) {
          this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[0]._id, userid: this.listusers[0].receiverid._id, value: false } });
  
        }
      }
    }
    

    this.dashboardactive = false;
    this.groupactive = false;
    this.notificationactive = false;
    this.chatactive = true;
    this.contactactive = false;
    this.adduseractive=false;

  }
  navigateToGroup() {
    this.dashboardactive = false;
    this.groupactive = true;
    this.notificationactive = false;
    this.chatactive = false;
    this.adduseractive=false;
    this.contactactive = false;
    if (this.Groups) {
      this.router.navigate(['/navbar/main'], { queryParams: { value: true } });
    }
    else {
      console.log("Groups: ",this.Groups);
      this.router.navigate(['/navbar/main'], { queryParams: { gid: this.Groups[0].GroupId._id, gname: this.Groups[0].GroupId.GroupName, value: true } });
    }
  }

 



  // 1
  autoRefreshNotify() {
    // this.messageService.autoRefreshNotification().subscribe(data => {
    //   this.clientNotificationValue();
    // });
  }

  // 2
  RemoveRefreshNotify() {
    this.messageService.autoRefreshremoveNotification().subscribe(data => {
      if (localStorage.getItem('role') == "Client") this.clientNotificationValue();
    });
  }
  //
  socketConnect() {
    var type = { type: 'connect' }
    this.messageService.Connectsocket(type).subscribe(socket => {
    });
  }
  //. 0
  socketDisConnect() {//disconnect socket during logout 
    var type = { type: 'disconnect' }
    this.messageService.Connectsocket(type).subscribe(socket => { });
  }

  // 0
  refreshNav() {
    this.subsVar = this.userService.refreshNav.subscribe(data => {
      if (data == "yes") {
        if (localStorage.getItem('role')) {
          this.socketDisConnect();
          this.socketConnect();
        }
        this.ngOnInit();
      }
    })
  }
  clientNotificationValue() {
    var notify;
    this.notification.getNotifications().subscribe((data:any) => {
      notify = data;
      this.newcount = notify.filter((x:any) => !x.read && x.receiverid._id == this._id).length;
    });
  }



  Notifications() {
    //  to stop  navigating to other page
    //  this.router.navigate(['/notifications']);
    this.newcount = 0
    this.viewNotifiction = !this.viewNotifiction;
    this.notificationState = this.notificationState === 'out' ? 'in' : 'out';
    this.isShown = !this.isShown;
    this.zindex = false;
    this.dashboardactive = false;
    this.groupactive = false;
    this.notificationactive = true;
    this.adduseractive=false;
    this.chatactive = false;
    this.contactactive = false;
    this.notification.readAll().subscribe(data => {
      this.userService.getInvitations(this.loginuserdata.id).subscribe(invitations => {
        {
          this.sentInvitations = invitations;
        }
        this.userService.getGroupInvitations(this.loginuserdata.id).subscribe(invitations => {
          this.groupInvitations = invitations;
    
        })
      });
    });
   
  
  }
  /*
 Function Name: LoadProfile
 Input: None
 Output: Json
 Desc: Load Profile
 */
  LoadProfile() {
    this.LoadUserProfile();
    this.userService.get('users/me').subscribe(data => {
      this.uprofile = data;
      
    });
  }

  LoadUserProfile() {
    this.userService.get('userprofiles/get/current').subscribe(data => {
      this.userprofiledata = data;
      console.log("123456",this.userprofiledata);
    
      if (!this.userprofiledata)
        if (this.userprofiledata) this.disp(this.userprofiledata);
    })
  }


  disp = function (profile) {
    this.LoadData['FullName'] = this.uprofile.FullName;
    this.LoadData['Bio'] = this.uprofile.Bio;
    if (profile.photo) { this.photo = this.uprofile.photo; console.log("123",this.photo);
    }
  }

click:boolean 
userprofile1
  updateProfile(updatedata,userform) {
      console.log(this.profileData,updatedata,userform);
     
      
    this.click=true
    if(this.profileData)
    {
    this.filesToUpload = <Array<File>>this.profileData.target.files;
    const formData: any = new FormData(); // for image
    const files: Array<File> = this.filesToUpload;

    formData.append("uploads[]", files[0], files[0]['name']);
 
    
  this.userService.imageFiles(formData).subscribe(data => {
     this.imagedata=data
      console.log(this.imagedata);
      this.LoadUserProfile()
      
    })
  }
    if(userform.valid)
    {
      console.log("333333333");
      
      this.isShown2 = true;
    this.isShown1 = false;
    
    // updatedata.value.photo = this.userForm;
    this.userService.update('userprofiles/updateprofile/' + this.uprofile._id,  userform.value).subscribe(data => {
      console.log("444444444444",data);
      
      if (data) {
        this.updateUser(this.uprofile._id, userform.value);
        this.snackbar.open('Profile updated successfully', 'x', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      
        this.LoadUserProfile();
  
      }
    })
    this.butnclick = false;
  }
}
  updateUser(id, info) {
    this.userService.update('users/updateprofile/' + id, info).subscribe(data => {
    });
  }

  sidenav() {
    this.router.navigate(['/navbar/sidenav'])
    this.dashboardactive = false;
    this.adduseractive=false;
    this.groupactive = false;
    this.notificationactive = false;
    this.chatactive = false;
    this.contactactive = true;
  }

  dashboard() {
    this.router.navigate(['/navbar/dashboard'])
    this.dashboardactive = true;
    this.adduseractive=false;
    this.groupactive = false;
    this.notificationactive = false;
    this.chatactive = false;
    this.contactactive = false;
  }

  // contactspage slider
  opencontact() {
    this.contactpage = this.contactpage === 'out' ? 'in' : 'out';
    this.isShown = !this.isShown;
    this.zindex = true;
    this.dashboardactive = false;
    this.groupactive = false;
    this.notificationactive = false;
    this.chatactive = false;
    this.adduseractive=false;
    this.contactactive = true;
  }


  //changepassword slider

  openchangepassword() {
    this.changepasswordState = this.changepasswordState === 'out' ? 'in' : 'out';
    this.isShown = !this.isShown;
  }
  closecontact() {
    this.contactpage = this.contactpage === 'out' ? 'in' : 'out';
    this.isShown = !this.isShown;
    this.contactactive = false;
  }
  // To close the sidenav
  closemodalbox() {
    this.menuState = 'out';
    this.contactpage = 'out';
    this.notificationState = 'out';
    this.isShown = false;
    this.notificationactive = false;
    this.contactactive = false;
    this.butnclick = false;
    this.changepasswordState ='out';
    this.isShown2 = true;
  }
  ////////////////////////////////////////////////////////////////////Contacts code/////////////////////////////////////////////////////////////////////////////////
  id;
  userdetails(user) {
    console.log("UserDetails: ",user)
    this.contactpage = this.contactpage === 'out' ? 'in' : 'out';
    this.contactactive = false;
    this.isShown = false;
    this.selectedUser = user;
    localStorage.setItem('chatuser', JSON.stringify(this.selectedUser));
    this.userService.userName(user)
    this.userService.sendData(this.selectedUser)
    user.count = 0

    if (this._id == user.receiverid._id) {
      this.userService.getuserdata(user.senderId._id).subscribe(data => {
        this.router.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: user.senderId._id, value: false } });

      });
    }
    else if (this._id == user.senderId._id) {
      this.userService.getuserdata(user.receiverid._id).subscribe(data => {
        this.router.navigate(['/navbar/main'], { queryParams: { id: this.selectedUser._id, userid: user.receiverid._id, value: false } });



      });
    }


  }

  SearchMail21(e) {
    if ((e.which === 32 || e.which === 9 || e.which === 8 || e.which === 46) && e.target.value.trim() === "") {
      return this.searchenable = false;

    }
    else { this.searchenable = true }
  }
  email
  SearchMail(email) {

    this.email = email
    if (this.email != undefined && this.email != '') {
      console.log("this.email: ", this.email);
      this.userService.getsearchedemail(this.email).subscribe((res: any) => {
        if (res !== null || res !== undefined) {
          console.log("res: ", res);
          this.response = res;
          this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log("loginUser: ", this.loginUser);
          this.userService.getFriends(this.loginUser.id).subscribe((users: any) => {
            console.log("Users: ", users);
            for(let resp of this.response) {
              resp.user=null;
              var flag =false;
              for(let user of users) {              
                if(user.from == this.loginUser.EmailId) {
                  if(resp.EmailId == user.to) {
                    flag = true;
                    resp.user = user
                  }
                }
               else if(user.to == this.loginUser.EmailId) {
                  if(resp.EmailId == user.from) {
                    flag = true;
                    resp.user = user;
                  }
                }
              }
              if (flag == true) {
                resp.status = true;
              }
              else {
                resp.status = false;
              }
            }
            console.log("resp: ", this.response)
        });
      }
      });
    }

  }
  status: boolean = false
  InviteFriend(user) {
    console.log("user", user);
    user = {
      senderId: this._id,
      receiverid: user._id,
      senderEmailId: this.EmailId,
      receiverEmailId: user.EmailId,
      status: this.status,
    }
    console.log(user)
    this.userService.InvitedUser(user).subscribe(res => {
      console.log('res', res);
      this.invitefriendres = res;
      if (this.invitefriendres == 'You already sent a request or Already Your Friend') {
        this.snackbar.open(this.invitefriendres, "X", {
          duration: 5000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      else {
        this.snackbar.open("Invitation sent", "X", {
          duration: 1000,
          panelClass: ['bar-color'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    })
    // user.reset()
  }

  onInvite = function (data) {
    if (data.valid) {
      this.recevData = data.value
      this.recmail = this.recevData.EmailId;
      this.error = true;

      if (this.recmail == undefined) {
        this.nodata = true;
      }

      else {
        data.value.slug = this.loginuserdata.slug;
        data.value.urllink = this.urllink;
        data.value.senderId = this.loginuserdata.id;
        data.value.senderEmailId = this.loginuserdata.EmailId;
        data.value.senderName = this.loginuserdata.Name;
        if (this.response) {
          data.value.receiverid = this.response._id;
          data.value.Name = this.response.Name
        }

        this.userService.sendInviteMail(data.value).subscribe(invitationack => {
          this.error = false;
          this.sendMailres = invitationack;

          if (this.sendMailres.result == "error") {
            this.userService.openSnackBar("NOO!! Something went wrong", "X");
          }
          else if (this.sendMailres == "Invitation Sent") {

            // to display success message
            this.invitationview = true;
            this.userService.openSnackBar(this.sendMailres, "X");
          }
          // you already sent the invitation
          else if (this.sendMailres == "you already sent the invitation") {
            this.userService.openSnackBar(this.sendMailres, "X");
          }
        });
        // document.getElementById("closeModal").click()
      }
    }

    data.reset()
  }

  createSlug = function (profile) {
    this.urllink = this.weburl + '/?slug=' + profile.slug;
  }


  checkInvitationMail(email) {
    var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})');
    if (regexp.test(email)) {
      this.emailcheck = true
      this.userService.getuseremail(email).subscribe((res) => {
        if (res !== null || res !== undefined) {
          this.regresponse = res;

        }

      });

    }
  }


  showgmail() {
    this.viewcontact = true;
  }

  // to close the modal
  closeModal() {

    document.getElementById("closeModal").click()

  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // canclePrivew:boolean
  closeimagePreview()
  {
   this.imagePreview=""
  }

  // ////////////////////////image upload////////////////////////////////////////
  profileData
  onFileSelected(fileInput: any, title: any) {
    this.profileData=fileInput
    console.log("user Profile Picture: ",title)
    this.imagedata;
    const file = fileInput.target.files[0];
    const reader = new FileReader();
    if (!title)
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
    reader.readAsDataURL(file);
 

  }

  uprofileresponse
  createProfile(userprofile,userdata) {
    this.click=true
    console.log(userprofile,userdata);
    
    if(this.profileData)
    {
    this.filesToUpload = <Array<File>>this.profileData.target.files;
    const formData: any = new FormData(); // for image
    const files: Array<File> = this.filesToUpload;

    formData.append("uploads[]", files[0], files[0]['name']);
 
     this.userService.imageFiles(formData).subscribe(data => {
     this.imagedata=data
      console.log(this.imagedata);
      // this.profileresponse=this.imagedata[0]
      this.LoadUserProfile()
    })
  }

    if(userdata.valid)
    {
      console.log(userdata.value);
  
    
    // if (userprofile) {
    //   console.log(userprofile);
      
    //   const userprofiledata = userprofile
    //   userprofiledata.photo = this.userForm;
    //   console.log(userprofiledata);
      
      
      this.userService.add('userprofiles/saveuser', userdata.value).subscribe(data => {
        this.uprofileresponse = data
        console.log(this.uprofileresponse);
        
        if (data) {
          this.updateUser(this.uprofile._id, this.uprofileresponse);
        }
        this.snackbar.open('Profile updated', 'x', {
          duration: 1000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        })
      });

    
     this.isShown2 = true;
    this.isShown1 = false;
    this.butnclick = false;
  }
  }
  ngOnDestroy() {
    this.autoRefreshFriendsUn.unsubscribe();
    this.autoRefreshGroupsUn.unsubscribe();
    // this.autoRefreshNotification.unsubscribe();
  }
  // this.isShown2 = true;
  // this.isShown1 = false;
  // this.butnclick = false;




  // When user accept the incognito chat
  incognitoACCEPT1(data) {
    this.messageService.incognitoACCEPT2(data).subscribe(data => {
    console.log(data)
      })
    for (var i = 0; i<= this.listusers.length; i++) {
      if (this.listusers[i].senderId._id == data.chatuser) {
        return this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].senderId._id, value: false } });
      }
      if (this.listusers[i].receiverid._id == data.chatuser) {
        return this.router.navigate(['/navbar/main'], { queryParams: { id: this.listusers[i]._id, userid: this.listusers[i].receiverid._id, value: false } });
      }
    }
  }

  // When user reject the incogntio chat 
  incognitoreject1(data) {
    console.log(data)
    this.messageService.incognitoReject2(data).subscribe(data => {
      console.log(data)
    })
  }
// ngOnDestroy(){
//   this.autoRefreshFriendsUn.unsubscribe();
//   this.autoRefreshGroupsUn.unsubscribe();
//   this.autoRefreshNotificatioUn.unsubscribe();
// }
// get employes organization wise
getemployes(data){
  this.router.navigate(['navbar/orgemp'],{queryParams:{id:data}})
}
// numbervalidation restrict alphabets
validateNumber(event) {
  const keyCode = event.keyCode;
  const excludedKeys = [8, 37, 39, 46];
  if (!((keyCode >= 48 && keyCode <= 57) ||
    (keyCode >= 96 && keyCode <= 105) ||
    (excludedKeys.includes(keyCode)))) {
    event.preventDefault();
  }
}

//get employe friend list and groups
getempdetails(data){
  console.log('4444444',data);
}

settings(data)
{
  console.log(data);
  
  this.changepasswordState = this.changepasswordState === 'out' ? 'in' : 'out';
  this.isShown =false;
  this.router.navigate(['/navbar/settings'], { queryParams:{settings: data}});

}
blog()
{
  this.router.navigate(['/navbar/blog'],{ queryParams: { select: "Create Blog" } })
  this.dashboardactive = false;
  this.adduseractive=true;
 
  this.groupactive = false;
  this.notificationactive = false;
  this.chatactive = false;
 
  this.contactactive = false;
}

}
