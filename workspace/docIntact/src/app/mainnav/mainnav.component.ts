import { Component, OnInit, OnDestroy, Output, EventEmitter, NgZone, ɵConsole,HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { DataService } from '../core/data.service'
import { AdminService } from '../admin.service';
import { CookieService } from 'ngx-cookie-service';
import { DocumentService } from '../document.service';
import { GeneralService } from '../general.service';
import { Router } from "@angular/router";

import { FileQueueObject, FileuploadService } from '../fileupload.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { fromEvent, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { FrontEndConfig } from '../frontendConfig';

declare var gapi: any;
declare var google: any;
declare var $: any;
declare var Dropbox: any;
declare var OneDrive: any;


@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit, OnDestroy {
  profiledata: any
  profilestyle
  constructor(private Locations: Location, private frontEndConfig:FrontEndConfig, private activatedroute: ActivatedRoute,private ngZone: NgZone, public adminservice: AdminService, public router: Router, public dialog: MatDialog, private userService: UserService, public uploader: FileuploadService, private userservice: UserService, private generalservice: GeneralService, private dataService: DataService, private adminService: AdminService, private cookieService: CookieService, public documentservice: DocumentService) {
    this.socketConnect();
    this.autoRefreshNotification();

  }
  frontendurl = this.frontEndConfig.frontendurl;
  url = false;
  file = true;
  document = true;
  folder = false;
  isSocialLoading:boolean=false;
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
  // this.Locations.back()
  
  }
  @Output() fileAdded = new EventEmitter<{ data: string }>();
  uploadFile(name) {
    this.url = false;
    this.file = true;
    if (name === 'document') {
      this.document = true;
      this.folder = false
    }
    else {
      this.document = false;
      this.folder = true
    }
    var myModal = $('#myModal').on('shown', function () {
      clearTimeout(myModal.data('hideInteval'))
      var id = setTimeout(function () {
        myModal.modal('hide');
      });
      myModal.data('hideInteval', id);
    })

  }
  passwordMinLength: Boolean = false;
  passwordupper: Boolean = false;
  passwordLower: Boolean = false;
  passwordNumber: Boolean = false;
  passwordSpecial: Boolean = false;
  enablenotificationlist:Boolean=false
  type: any;
  role: any;
  samePassword: any;
  userName: any;
  userEmail: any;
  userType: any;
  display: boolean = true
  notificationlogs = []
  samplee
  notification
  count: number
  resultData: any
  diff
  resultDatas: any
  badgeCount: any;
  access: any
  SearchValue: any
  oldpass: any
  newpass: any
  pwd3: any

  hide = true;
  hide1 = true;
  hide2 = true;
  PasswordMissMatch: Boolean = false;
  errorres = ""
  displayerror = false;
  formSubmitted = false;
  local: any
  s: any
  isOldPassword: boolean = false;
  isOldPassword1: boolean = false;
  uid
  res: any;
  subscription:Subscription
  message
  search
  shownotifitab:boolean=false
  IpAddress
  iebrowser
  invalidoldpassword
  invalidnewpas
  invalidconfpas
  focus
  clearintervaldata
  // to get the notification count
  autoRefreshNotification()
  {
    this.dataService.newNotificationReceived().subscribe(data=>{
      this.getNotificationCount();
      this.getOfflineNotification();
    })
  }

  // to check whether the data consists in cookies and stores it 
  cookiesConnect() {
    const cookieExists: boolean = this.cookieService.check('token');
    const userExists: boolean = this.cookieService.check('user');
    if (cookieExists && userExists) {
      var data = { token: this.cookieService.get('token'), user: JSON.parse(this.cookieService.get('user')) }
      if (!localStorage.getItem('currentUser')) this.userService.setUserLoggedIn(data);
      if (localStorage.getItem('currentUser')) {
        this.getProfileData();
      }
    }
  }

  // getting profile content
  getProfileData() {
    this.profiledata = JSON.parse(localStorage.getItem('currentUser'));
    this.role = this.userService.decryptData(this.profiledata.role);
    this.userName = this.userService.decryptData(this.profiledata.name);
    this.userEmail = this.userService.decryptData(this.profiledata.email);
    this.userType = this.userService.decryptData(this.profiledata.type);
  }

  ngOnInit() {
   $(document).ready(function(){
    
    if($(window).width()<1000){
      $(".togg>li").attr('data-toggle','collapse');
       }

   });
$(window).resize(function(){
  
  if($(window).width()<1000){
    $(".togg>li").attr('data-toggle','collapse');
     }
     else{
      $(".togg>li").attr('data-toggle','collapse12');
     }
});
    this.cookiesConnect();
    this.getProfileData();
    this.getOfflineNotification();
    this.getNotificationCount();
    //Internet explorer header fix
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
      this.iebrowser=true
      this.profilestyle="margin-top: -1.5rem;"
     $(".top_nav").addClass("iebrowser"); 
     }
     else {
this.iebrowser=false

     }
     this.IpAddress=JSON.parse(localStorage.getItem('mylocation'));
     this.getGeolocation() //get the current location of user
     if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
     {
      this.clearintervaldata=setInterval(() => {
         this.ccb(); 
         }, 100);
     }
  }
  /// clear data while copy 
  clearData(){
    window["clipboardData"].setData('text','')
  }
   ccb(){
  if(window["clipboardData"]){
   window["clipboardData"].clearData();
  }
  }
  // to get the all notification
  getOfflineNotification() {
    this.generalservice.getOfflinenotification().subscribe((data: any) => {
      this.notificationlogs = data
      this.notificationlogs.forEach(element => {
        element.created_at;
        element.fromEmail = (element.fromid && element.fromid.name) ? element.fromid.name : (element.fromemail).split('@')[0];
        element.diff = this.getDataDiff(new Date(element.created_at), new Date());
      });
    });
  }

  // to get count of notification
  getNotificationCount() {
    this.generalservice.countNotifications().subscribe((data: any) => {
      this.count = data
    })
  }

  // gets the unread notifications
  getNotification() {
    this.generalservice.getnotification().subscribe((data: any) => {
      this.resultDatas = data
    })
  }

  shownotification()
  {
    console.log('show')
    // $("html").css("overflow-x","hidden");
    this.shownotifitab=true

  }
  hidenot()
  {
  
    // setTimeout(() => {
    //   $("html").css("overflow-x","auto");
    // }, 10);
    this.shownotifitab=false

  }
  hidescrool()
  {
    // setTimeout(() => {
    //   $("html").css("overflow-x","hidden");
    // }, 100);
   
  }
  @HostListener('scroll')
  public asd(): void {
    this.shownotifitab=false
}
  // ========================================  dropbox ==============================================

  dropdevkey = 'hfds0x416l38hgr';
  dropscret = 'k2f83puyfke1z1t';
  loaddropbox = function () {
    Dropbox.choose(this.options);
  }

  options = {
    success: (files) => {
      this.isSocialLoading = true;
      files.forEach(element => {
        this.urlcontent(element.link);
      });
    },
    cancel: function () {     
    },

    linkType: "direct", // or "preview"
    multiselect: false, // or false
    extensions: ['.pdf', '.doc', '.docx'],
    folderselect: false, // or true

  };

  urlcontent(urldata) {
    // this.isSocialLoading=true;
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var dropboxurl =
    {
      value: urldata
    }
    if (urldata) {
      //  urldata.value.parentid = this.sampledata1;
      this.uploader.urlcontent(dropboxurl).subscribe(data => {
        this.isSocialLoading=false;
       this.documentservice.sendFileData(data); 
        
        this.documentservice.openSnackBar("File added from Dropbox", "X")

      }, error => {
        if (error == "Invalid")
          this.documentservice.openSnackBar("not pdf ", "X")
          this.isSocialLoading=false;
      })
    }
  }

  // =========================================================================================
  validate(password) {
    this.passwordMinLength = false;
    this.passwordupper = false;
    this.passwordLower = false;
    this.passwordNumber = false;
    this.passwordSpecial = false;
    var minMaxLength = /^[\s\S]{8,32}$/,
      upper = /[A-Z]/,
      lower = /[a-z]/,
      number = /[0-9]/,
      special = /[ !"#$%&()*+,\-./:;<=>?@[\\\]^_`{|}~]/;

    if (minMaxLength.test(password)) {
      this.passwordMinLength = true;
    }
    if (upper.test(password)) {
      this.passwordupper = true;
    }
    if (lower.test(password) && password != undefined) {
      this.passwordLower = true;
    }
    if (number.test(password)) {
      this.passwordNumber = true;
    }
    if (special.test(password)) {
      this.passwordSpecial = true;
    }
  }
  // ===================================== google drive ============================================

  developerKey = 'AIzaSyB4L-PhNuvZHw4wbVOjS93VV0uCAgXHUc0';
  clientId = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
  scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/drive'//insert scope here
  ].join(' ');
  pickerApiLoaded = false;
  oauthToken?: any;

  loadGoogleDrive() {

    gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
    gapi.load('picker', { 'callback': this.onPickerApiLoad.bind(this) });
  }

  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        'client_id': this.clientId,
        'scope': this.scope,
        'immediate': false
      },
      this.handleAuthResult);
  }

  onPickerApiLoad() {
    this.pickerApiLoaded = true;
  }

  handleAuthResult = (authResult) => {
    if (authResult && !authResult.error) {
      // alert(authResult.access_token);
      if (authResult.access_token) {
        this.access = authResult.access_token
        // document.getElementById('fileselect123').click()
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder.
          setOAuthToken(authResult.access_token).
           addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true).setMimeTypes("application/pdf,application/vnd.google-apps.document,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")).
          addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(false).setMimeTypes("application/pdf,application/vnd.google-apps.document,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")). setCallback((e) => { console.log(e); this.pickerCallback(e) }).
          build();
        picker.setVisible(true);
      }
    }
  }
  //google picker callback
  pickerCallback = (data) => {
    let self = this;
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      var doc = data[google.picker.Response.DOCUMENTS][0];
      self.uploadtoDB(doc);
    }
  }

  //uplaod file to db
  uploadtoDB = (doc) => {
    this.isSocialLoading=true;
    doc.access = this.access
    this.documentservice.googleupload(doc).subscribe(data => {
     var newfile = data
      if (newfile) {
        this.isSocialLoading=false;
       this.documentservice.sendFileData(newfile); 
      //  this.documentservice.openSnackBar("File added from Google Drive", "x");
      }
    }) 
  }


  /***********one drive************************/
  oneDriveApplicationId = "d091f200-527a-4572-aab8-678d6f3ac972";
  
 
  loadoneDrive() {
    // this.isSocialLoading=true;
    this.launchOneDrivePicker()
  }

  launchOneDrivePicker = () => {
    var odOptions = {
      clientId: this.oneDriveApplicationId,
      action: "download",
      multiSelect: true,
      openInNewWindow: true,
      advanced: {
        filter: ".pdf,.doc,.docx",
        //  redirectUri:"https://staging.docintact.com/home/myfiles/" // Show only folders and png files
         redirectUri:this.frontendurl+"/home/myfiles/" // Show only folders and png files
      },
      success: (files) => {
this.isSocialLoading=true;  
        this.onedriveurlcontent(files.value);
      },
      cancel: function () { (null); },
      error: function (e) { (e); }
    };
    OneDrive.open(odOptions);
  }

  onedriveurlcontent = (files) => {
    files.forEach(element => {
      var dropboxurl =
      {
        name: element.name,
        url: element["@microsoft.graph.downloadUrl"]
      }
      if (dropboxurl) {
        this.uploader.onedriveurlcontent(dropboxurl).subscribe(data => {
          this.isSocialLoading=false;  
          this.documentservice.sendFileData(data); 
             
          this.documentservice.openSnackBar("File added from Onedrive", "X")
        }, error => {
          if (error == "Invalid")
            this.documentservice.openSnackBar("not pdf ", "X")
            this.isSocialLoading=false;
        })
      }
    });

  }

  // ================================= one drive end ===========================

  getDataDiff(startDate, endDate) {
    var diff    = endDate.getTime() - startDate.getTime();
    var days    = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours   = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }
  logout() {
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    let type = { type: "disconnect" }
    var sub = this.dataService.Connectsocket(type)
      .subscribe(quote => { });
    this.adminService.logout();
  }

  clearnotification(id) {
    id.active = false
    this.generalservice.markedread(id).subscribe(data => {
      this.getNotificationCount();
    });
  }

  // clearing all the notification
  clearAllNotifications(data) {
    this.generalservice.clearAllNotifications(data).subscribe(data => {
      this.getNotificationCount();
      this.notificationlogs  =[];
    });
  }

  clearAllNotificationsactive(data) {
    if( this.enablenotificationlist){
      this.enablenotificationlist=false
    }
   else{ this.enablenotificationlist=true}
    if(this.count)
    {
      var data1 = data.filter(x=> !x.read);
      this.generalservice.clearAllNotificationsactive(data1).subscribe(data => {
        this.getNotificationCount();
      });
    }   
  }

  ngOnDestroy() {
    let type = { type: "disconnect" }
    var sub = this.dataService.Connectsocket(type).subscribe(quote => { });
    clearInterval(this.clearintervaldata);

  }

  searchvalue;
  searchdata;
  //search bar
  Search(Searchterm) {
    
    this.search = {
      search: Searchterm,
    }
    this.documentservice.searchdocuments(this.search).subscribe(data => {
      this.searchdata = data;
    });
    this.searchvalue = Searchterm
  }
  searchnavigate() {
  if(this.searchvalue==null)
  {
    this.documentservice.openSnackBar("Please Enter text ", "X"); 
  }
   if(this.searchvalue!=null)
   { 
   
    this.router.navigate(['/home/search/'], { queryParams: { searchvalue: this.searchvalue } });
    
  
   }

  }
  socketConnect() {
    this.type = { type: "connect" }
    this.dataService.Connectsocket(this.type).subscribe(quote => { });
  }
clearval()
{ 
localStorage.removeItem('browserpath')
 // document.getElementById('id1').click()
 this.searchvalue=null;
  this.SearchValue=null;
}



  // ============================================Change Password Start===============================================
  // check old passsword
  checkpassword(oldPassword) {
    this.samePassword = oldPassword;
    if (oldPassword != '' &&oldPassword!=undefined) {
      this.userService.checkpassword(oldPassword).subscribe(data => {
        var res: any = data
        if (res.result == 'Old password mismatch') {
          this.isOldPassword = true;
          this.errorres = res.result;
        }
        else if (res.result == 'matched')
          this.isOldPassword = false;
      })

    }
  }

  // check new password doesnot match to old password
  checkpassword1(oldPassword) {
    if (oldPassword == this.samePassword) {
      this.isOldPassword1 = true;
      this.errorres = "Old password mismatch";
    }
    this.validate(oldPassword)
  }

  cancel(user) {
    if (user) { user.resetForm(); this.formSubmitted = false; this.isOldPassword = false; this.isOldPassword1 = false }
  }
  // ================ new password update ===============================================
  otpfun = function (user) {
    this.errorres = ""
    this.displayerror = false
    this.formSubmitted = true
    if (user.valid && user.value.oldpass != user.value.newpass && user.value.newpass == user.value.pwd3 && !this.isOldPassword) {
      user.value.IpAddress=(this.IpAddress) ? this.IpAddress.ip:'Not Avilable'
      this.userService.changePass(user.value).subscribe(data => {
        var res = data;
        user.resetForm();
        this.formSubmitted = false
        document.getElementById("changePassCloseBtn").click();
        if (res.result == "success") {
          // this.logout();
          this.documentservice.openSnackBar("Password Changed Successfully", "X");
        }
      })
    }

  }
  checkpasswor(data, type)
  {
    if((data.value=='' || data.value== undefined) && this.iebrowser)
    {
      if(type=='old')
      {
        this.invalidoldpassword=true
      }
      else if(type=='new1'){
        this.invalidnewpas=true

      }
      else if(type=='new2')
      {
        this.invalidconfpas=true
      }
    }
    else
    {
      if(type=='old')
      {
        this.invalidoldpassword=false
      }
      else if(type=='new1'){
        this.invalidnewpas=false

      }
      else if(type=='new2')
      {
        this.invalidconfpas=false
      }
    }
 
  
  }// ==================================Change Password END==========================================================================
// Restrictspacekey in change password

  Restrictspacekey(event) {
  
    if (event.keyCode == 32) {
    
        return false;
    }
}

getGeolocation()
{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var currentLocation={
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      }
  localStorage.setItem('currentLocation', JSON.stringify(currentLocation))
    }, error => {
      console.log(error )  
      localStorage.removeItem('currentLocation')     
    });
  }
}

}
