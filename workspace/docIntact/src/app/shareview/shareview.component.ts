import { Component, OnInit, EventEmitter, OnDestroy, Input, Output, ViewChild, HostListener, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { Router } from "@angular/router";
import { AdminService } from '../admin.service';
import * as moment from 'moment';
import { FrontEndConfig } from '../frontendConfig';
import { DataService } from '../core/data.service';
import { GeneralService } from '../general.service';
import { MatDialog, } from '@angular/material';
import * as RecordRTC from 'recordrtc';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;
import { OrganizationService } from '../organization.service';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { MatSelect, MatSelectChange } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { SharepopupComponent } from '../sharepopup/sharepopup.component'
import { SignupdialogboxComponent } from '../signupdialogbox/signupdialogbox.component';
import { UserService } from '../user.service'
import { DatePipe } from '@angular/common'
import * as _ from "lodash";
import libphonenumber from 'google-libphonenumber';
import { Location, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FiledocumentComponent } from '../filedocument/filedocument.component';
import { text } from '@angular/core/src/render3';

declare var gapi: any;
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
declare var $: any;
declare var H: any;
// interface countrycodes {
//   name: string;
// }
@Component({
  selector: 'app-shareview',
  templateUrl: './shareview.component.html',
  styleUrls: ['./shareview.component.css']
})
export class ShareviewComponent implements OnInit, OnDestroy {
  fixedBoxOffsetTop: any;
  fixedBoxOffsetTopOtherMethod: any;
  showBottom = true;
  showTop = false;
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });
  // public countryFilterCtrl: FormControl = new FormControl();
  @ViewChild('bodyscroll') bodyscroll: ElementRef;

  heatmapss: Boolean = false; // for displaying heatmaps
  versions: Boolean = false; //for displaying versions
  heatmapLoading: Boolean = false;  // loader for heatmap

  private _onDestroy = new Subject<void>();
  //Decalre PDF top and left
  PdfHeight: any = 0; // OnLoad PDf get Height
  PdfWidth: any = 0; // OnLoad Pdf Get width;
  PdfTop: any = 0; // Pdf Top distance
  PdfTopScroll: any = 0; // Pdf Top distance + Scroll Distance
  PdfLeft: any = 0; // Pdf Left distance
  PdfLeftNosideBar: any = 0; // Pdf Without side bar left side distance
  vers: boolean = false
  saveTemplatebtn = false
  isSignaturField: boolean = false; // Check Fields signature is exists or not if exists it will load by default signature
  isIntialField: boolean = false; // Check Fields signature is exists or not if exists it will load by default signature
  isPhotoField: boolean = false; // Check Fields signature is exists or not if exists it will load by default signature
  isStampField: boolean = false; // Check Fields signature is exists or not if exists it will load by default signature
  modelshow: any
  IframePrint: any = ''; // Iframe print for closing the print popup while clicking the back button
  // public filteredEntities: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // public filteredBanks: ReplaySubject<countrycodes[]> = new ReplaySubject<countrycodes[]>(1);
  documentres
  routervalue
  pageInfo=[]
  focus
  @ViewChild('singleSelect') singleSelect: MatSelect;

  // @Input() set dataa(dataa: any[]) {
  //   this._data = dataa;
  //   // load the initial entity list
  //   this.filteredEntities.next(this.dataa.slice());
  // }

  // get dataa(): any[] {
  //   return this._data;
  // }

  // private _data: any[];
  socketConnect() {
    //console.log("share view connect")
    this.type = { type: "connect" }
    this.dataservice.Connectsocket(this.type).subscribe(quote => { });
  }

  socketDisconnect() {
    let type = { type: "disconnect" }
    this.dataservice.Connectsocket(type).subscribe(quote => { });
  }

  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  constructor(private Locations: Location, private _ngZone: NgZone, public datepipe: DatePipe, private organizationService: OrganizationService, private userservice: UserService, public dialog: MatDialog, private dataservice: DataService, private frontEndConfig: FrontEndConfig, private generalservice: GeneralService, private router: Router, public activatedroute: ActivatedRoute, private cookieService: CookieService, private documentService: DocumentService, private adminService: AdminService, private http: HttpClient) {
    this.socketConnect()
  }

  // public countryCtrl: FormControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('video') video: any;
  
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed',history);
     if(this.loggedIn=='true'){
      //  location.replace("http://localhost:4200//home/myfiles");
          // this.router.navigate(['/mainnav/']);
       }
    else {
      location.replace("/");
    }
    
    // var s = window.location.pathname
    // var q = s.substring(s.lastIndexOf("="), s.length); //for remaining Id
    // if (s.lastIndexOf("=") == -1) q = null
    // else q = s.substring(s.lastIndexOf("=") + 1, s.length)
    // if (q == null) {
      // location.replace("http://localhost:4200");
      // }
    // else {
    //   this.router.navigate(['/mainnav/']);
    // }
    // var j= s.substring(s.lastIndexOf(":"),s.length);
    // console.log(j)
    // var q=s.substring(s.indexOf(":"),s.lastIndexOf(":"));
    //  var q=s.substring(s.lastIndexOf("=")+1,s.length);
    //  console.log(q)
    // this.router.navigate(['/mainnav/']);
  }
  recordRTC;
  stream;
  mediaConstraints: any = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    }, audio: true
  };
  expired: boolean = false
  removedFile;
  phone
  fontStyle;
  preview;
  serverurl = this.frontEndConfig.getserverurl();
  endtime: any
  sharedid: any;
  fileid: any
  sharedRecord: any
  documentRecord: any
  docData: any
  fileDataContent: any
  fieldData: any
  fields: any = [];
  filledFieldCount: number = 0
  fieldValues: any
  activeComment: any = [];
  comments: any = [];
  FieldDataRecord: any
  signatureImage: any
  type: any
  fontvalue: any
  fonttype: any
  fontstyle: any
  arrowClass: any
  imageFile: any
  editF: any
  private _presetFonts = ['Tangerine', 'Pacifico', 'Homemade Apple', 'Sacramento', 'Mrs Saint Delafield', 'Ruthie', 'Dr Sugiyama', 'Lovers Quarrel', 'Qwigley', 'Srisakdi', 'Lobster', 'Sniglet', 'Satisfy', 'Bilbo'];
  onlinedata: any
  onlineusers = []
  profiledata: any
  createdtime: any
  _id: any;
  commentsdata
  commentedlines
  coordinatex
  coordinatey
  childcomments = []
  parentcomment = []
  edit = true
  reply = false
  editlabel = false
  documentid
  currentVersionDocFieldOptionsResult: any;
  SignatureList = []
  PhotoList = []
  StampList = []
  auditlogs: any;
  auditlogsResult: any;
  closeChat = false
  expirydate: any;
  presentdate: any;
  errorres: any
  organid: any
  signdependency = false
  
  documentdependency =  true
  req = false
  allDocVersionsResult = []
  // countrycodes
  // today = moment().format("DD-MM-YYYYTHH:mm:ss")
  watermarkLoading: Boolean = false;
  watermarkText
  action = 'x';
  snackBarMeassage: any
  filesToUpload: Array<File> = [];
  imagedata: any
  currentTab = 0;
  platform: any
  latitude: any
  longitude: any
  geocoder: any;
  Address: any
  sharedocument
  linkid
  submitData: any
  finished: boolean = false //document finished or not
  cropimageData: any
  croppedImage: any
  notificationlogs = []
  resultData: any
  diff: any
  count: any
  resultDatas: any
  pdf;
  outline;
  page = 1;
  pagenumbers = []
  requiredFieldsCount = []
  requiredFieldsCounts
  formatvalue = false
  formatvalue1 = false
  formatvalue2 = false
  downloadpath
  isloading: boolean = true; // For loader Appearance
  tabactive
  NotificationData
  Notificationscount
  videorecordChecking
  loggedIn
  expiretimeCheck = true
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  documentImages
  email
  locationdata
  shownoti: boolean = false
  listshow: boolean = false
  showlist: boolean = false
  mobiledemo: boolean = false
  isOldPassword:boolean=false
  isOldPassword1:boolean=false
  samePassword
  passwordMinLength: Boolean = false;
  passwordupper: Boolean = false;
  passwordLower: Boolean = false;
  passwordNumber: Boolean = false;
  passwordSpecial: Boolean = false;
  hide1 = true;
  displayerror
  oldpass
  newpass
  pwd3
  IpAddress
  divsigpadWidth
  iebrowser // for prevalidations errors in ie only
  invalidoldpassword // for ie invalid old password
  invalidnewpas // for ie invalid new password
  invalidconfpas // for ie invalid new confirm  password
  clearintervaldata
  finishbuttonmobile:boolean=false// show  finish button in mobile view
  // divintpadWidth 
  clientId = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
  fieldminlength : any
  fieldsforsubmit = [];
  windowwidth
  scope = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file'
  ].join(' ');

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }

  // @HostListener('window:load', ['$event'])
  // onLoad(event) {
  //   //console.log("called")
  //   var s = window,
  //     d = document,

  //     x = s.innerWidth,
  //     y = s.innerHeight;



  //   if ((x == 1800) && (y == 1125)) {
  //     document.getElementById("doc-view").style.height = "990px";
  //   }
  //   else if ((x == 1024) && (y == 1366)) {
  //     document.getElementById("doc-view").style.height = "1215px";
  //   }

  //   else if ((x == 1519) && (y == 754)) {
  //     document.getElementById("doc-view").style.height = "626px";
  //   }
  //   else if ((x == 768) && (y == 1366)) {
  //     document.getElementById("doc-view").style.height = "1215px";
  //   }
  //   else if ((x == 1440) && (y == 900)) {
  //     document.getElementById("doc-view").style.height = "770px";
  //   }
  //   else if ((x == 1280) && (y == 800)) {
  //     document.getElementById("doc-view").style.height = "670px";
  //   }
  //   else if ((x == 1280) && (y == 950)) {
  //     document.getElementById("doc-view").style.height = "820px";
  //   }
  //   else if ((x == 1855) && (y == 984)) {
  //     document.getElementById("doc-view").style.height = "857px";
  //   }
  // }
  // @HostListener('window:resize', ['$event'])
  // onResize(event) {
  //   var s = window,
  //     d = document,

  //     x = s.innerWidth,
  //     y = s.innerHeight;



  //   if ((x == 1800) && (y == 1125)) {
  //     document.getElementById("doc-view").style.height = "990px";
  //   }
  //   else if ((x == 1024) && (y == 1366)) {
  //     document.getElementById("doc-view").style.height = "1215px";
  //   }

  //   else if ((x == 1519) && (y == 754)) {
  //     document.getElementById("doc-view").style.height = "626px";
  //   }
  //   else if ((x == 768) && (y == 1366)) {
  //     document.getElementById("doc-view").style.height = "1215px";
  //   }
  //   else if ((x == 1440) && (y == 900)) {
  //     document.getElementById("doc-view").style.height = "770px";
  //   }
  //   else if ((x == 1280) && (y == 800)) {
  //     document.getElementById("doc-view").style.height = "670px";
  //   }
  //   else if ((x == 1280) && (y == 950)) {
  //     document.getElementById("doc-view").style.height = "820px";
  //   }
  //   else if ((x == 1855) && (y == 984)) {
  //     document.getElementById("doc-view").style.height = "857px";
  //   }
  // }

   @HostListener('window:resize', ['$event'])
  onResize(event) {
    var s = window,
      d = document,

      x = s.innerWidth
      this.windowwidth = x
    this.windowScrollHeight = window.innerHeight - 130;
  //   this.divsigpadWidth = $("#signaturrepadwidth").width();
  //   console.log(this.divsigpadWidth)
  //   this.divintpadWidth=$("#initialpadwidth").width();
  // console.log(this.divintpadWidth)

  if ((x <= 1920) && (x >= 1024)) {
    this.divsigpadWidth=600   
  }
  else if ((x <= 1024) && (x >= 600)) {
    this.divsigpadWidth=600        
  }

  else if ((x <= 600) && (x >= 320)) {
    this.divsigpadWidth=280        
   
  }
  else {
    this.divsigpadWidth=600
  }

}
@HostListener('window:load', ['$event'])
onLoad(event) {
  //console.log("called")
  var s = window,
    d = document,

    x = s.innerWidth
  if ((x <= 1920) && (x >= 1024)) {
    this.divsigpadWidth=600   
  }
  else if ((x <= 1024) && (x >= 600)) {
    this.divsigpadWidth=600        
  }

  else if ((x <= 600) && (x >= 320)) {
    this.divsigpadWidth=280        
   
  }
else {
  this.divsigpadWidth=600
}}
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.ctrlKey && event.keyCode == 80) || (event.keyCode == 45)) {
      if (event.keyCode == 45) {
        this.snackBarMeassage = 'PrintScreen is not allowed'
        this.documentService.openSnackBar(this.snackBarMeassage, this.action);
      }
      if (event.ctrlKey && event.keyCode == 80) {
        event.returnValue = false;
        event.preventDefault();
        this.snackBarMeassage = 'print is not allowed'
        this.documentService.openSnackBar(this.snackBarMeassage, this.action);
      }
    }
    // this.copyaccess(event, 'keyboardevent') 
  }

  ngOnInit() {
    this.locationdata = JSON.parse(localStorage.getItem('mylocation'));
    this.divsigpadWidth=600;
    var domain = this.router.url.split('/');
    if(domain.length==4){
      var sharedfiledata={
        fileid:domain[3],
        sharedid:domain[2]
      }
    }
    var sharedfiledata={
      fileid:domain[3],
      sharedid:domain[2]
    }
    if(domain.length==3)
    {
      var sharedfiledata={
        fileid:domain[2],
        sharedid:domain[2]
      }
    }
        ////////////////    Map        ////////////////
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
        
          }, error => {
        this.documentService.openSnackBar("Your Location is Blocked please Allow for security reasons", "X")
            this.latitude =  undefined;
            this.longitude = undefined;
    
          });
        }
      
    setTimeout(() => {
      this.documentService.decryptedvalues(sharedfiledata).subscribe((data:any)=>{

        this.sharedid=data.sharedid
        if( domain[1] !="Sharereview" && domain.length==4 )this.fileid=data.fileid
        if(domain[1]=="Sharereview" && domain.length==4)this.linkid=domain[3];
        console.log(this.linkid)
        if (data.fileid && !this.linkid) this.shared();
        if (this.linkid) {
          console.log(this.linkid)
          this.documentService.getpass(this.linkid).subscribe((data:any) => {
            console.log(data);
            if(data.error || data.validity=='expired'){
              if(data.error=='not found') this.documentService.openSnackBar('Link is not Found','X');
              if(data.error=='error') this.documentService.openSnackBar('Try after some time','X');
              if(data.validity=='expired') this.documentService.openSnackBar('Link is Expired','X');
              this.Locations.back();
            }
            this.sharedocument = data;
            if (this.sharedocument.validity == undefined && this.sharedocument._id) this.shared()
            if (this.sharedocument.validity == 'expired') this.expired = true
            if (this.sharedocument.length == 0 || this.sharedocument.revoke == true) {
              // const ConfirmationDiaBox = this.dialog.open(SignupdialogboxComponent, {
              //   width: '500px',
              //   disableClose: true,
              //   autoFocus: true,
              //   data: { title: "You don't Have an Access to View this file", content: 'Remove', Docflag: true }
              // });
              let dialogRef = this.dialog.open(CommonDialogComponent,
                { data: { title: 'dependency', name: 'dependency', content: "You don't Have an Access to View this file" }, width: '500px', panelClass: 'deletemod',disableClose:true});
              dialogRef.afterClosed().subscribe(res => {
                if (res) {
                  this.router.navigate(['/home/shareddocument/'])
                }
              })
            }
          })
        }
      })
    }, 10);
  
    this.loggedIn = localStorage.getItem('loggedIn')
    this.windowScrollHeight = window.innerHeight - 130;
    this.locationdata=JSON.parse(localStorage.getItem('myip'));
    var data=localStorage.getItem('ipaddress')
    if(!this.locationdata) this.locationdata=this.userservice.decryptData(data)
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
      this.iebrowser=true

     }
     else {
this.iebrowser=false

     }
     if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
     {
      this.clearintervaldata=setInterval(() => {
         this.ccb(); 
         }, 100);
     }
 
     this.windowwidth= window.innerWidth
  }
  // clear data while copy 
  clearData(){
    window["clipboardData"].setData('text','')
  }
   ccb(){
  if(window["clipboardData"]){
   window["clipboardData"].clearData();
  }
  }


  getmodeldata() {
    this.GetSignatureDocumentList(false);
    this.GetPhotoDocumentList(false);
    this.GetStampDocumentList(false);
    this.GetInitialDocumentList(false);
  }

  additionalData() {

    setInterval(() => {
      this.endtime = moment().format()
      if (this.createdtime == this.endtime) {
        this.documentService.openSnackBar("Your time is up!", "X")
      }
    }, 1000);

    this.dataservice.newMessageReceived()
      .subscribe(data => {
        if (data && data._id == this.sharedRecord._id && (data.active == false || data.revoke == true)) {
          this.sharedRecord = data
          let dialogRef = this.dialog.open(CommonDialogComponent,
            { data: { title: 'dependency', name: 'dependency', content: "You don't Have an Access to View this file" }, panelClass: 'deletemod', width: '500px', disableClose: true });
          dialogRef.afterClosed().subscribe(res => {
            if (res) {
              this.router.navigate(['/home/shareddocument'])
            }
          })
        }
        else if(((data.documentid == this.sharedRecord.fileid._id) || (data.documentid == this.fileid))){
          this.getSharedPeoples();
        }
        if(data && data._id == this.sharedRecord._id) this.sharedRecord = data
      })

    // this.documentService.getCountrycodes().subscribe((data: any) => {
    //   this.countrycodes = data
    //   this.dataa = this.countrycodes
    //   this.countryCtrl.setValue(this.dataa);
    //   this.filteredEntities.next(this.dataa.slice());
    //   this.countryFilterCtrl.valueChanges
    //     .pipe(takeUntil(this._onDestroy))
    //     .subscribe(() => {
    //       this.filterCountries();
    //     });
    // })

    this.dataservice.newNotificationReceived()
      .subscribe(data => {
        this.getOfflineNotification();
      })

    this.dataservice.newChatReceived()
      .subscribe(data => {
        console.log(data)
        if (this.sharedRecord && this.sharedRecord.fileid && this.sharedRecord.Chat && (data.documentid == this.sharedRecord.fileid._id)) {
          this.openChat = true;
          this.versions = false;
          this.showpages = false;
        }
      })

    this.dataservice.documentUpdate().subscribe(data =>{
      console.log(data)
      if ((this.sharedRecord.fileid && this.sharedRecord.fileid._id == data._id) || (this.fileid == data._id)) {
        if(this.documentRecord.versionid!=data.versionid){
          this.documentRecord = data
          this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.documentRecord._id, versionid: this.documentRecord.versionid }).subscribe(async (currentVersionDocFieldOptions : any) => {
            this.fields = currentVersionDocFieldOptions;
            this.DisplayFieldsData()
          })
        }
        else
          this.documentRecord = data
        if (this.documentRecord.waterMark) this.waterMark = this.documentRecord.waterMark
      }
    })

    this.dataservice.FieldsValueUpdate()
      .subscribe(data => {
        if (this.sharedRecord.fileid._id == data.documentid) {
          // this.LoadFields()
          this.displayUpdatedFieldValue(data) // Update fields whenever field value inserted
        }
      })

    this.dataservice.FieldsOptionsUpdate()
      .subscribe(data => {
        if (this.sharedRecord.fileid._id == data.documentid) {
          this.LoadFields()
        }
      })

    this.dataservice.getsignatureDocs().subscribe(data => {
      if (data.signtype == 'signature')
        this.GetSignatureDocumentList(false)
      else
        this.GetInitialDocumentList(false)
    })

    this.dataservice.getphotoDocs().subscribe(data => {
      this.GetPhotoDocumentList(false)
    })

    this.dataservice.getstampDocs().subscribe(data => {
      this.GetStampDocumentList(false)
    })

    this.dataservice.onlineusers()
      .subscribe(data => {
        if(data.fileid==this.sharedRecord.fileid._id){
          let isNewPerson=true
          this.onlineusers.forEach((element,index) => {
            if(data._id==element._id){
              if(data.viewStatus)
              this.onlineusers[index]=data
              else
              this.onlineusers.splice(index,1)
              isNewPerson=false
            }
          });
          if(isNewPerson){
            if(data.viewStatus)
              this.onlineusers.push(data)
          }
        }
        // this.Getonlineusers(data.fileid)
      })

    this.dataservice.mobilelinkupdate()
      .subscribe(data => {
        this.updateFromMobile(data);
      })

    this.dataservice.newCommentReceived().subscribe(data => {
      this.getComments()
    })
  }

  // Shows the newly submited data in the document
  displayUpdatedFieldValue(FieldValue){
    if(this.fields.length)
      this.fields.forEach((field,index) =>{
        if(field.id == FieldValue.id){
          if (FieldValue.value) field.value = FieldValue.value;
          if (FieldValue.path) field.path = FieldValue.path;
          if (FieldValue.size) field.size = FieldValue.size;
          if (FieldValue.fontText) field.fontText = FieldValue.fontText;
          if (FieldValue.fontStyle) field.fontStyle = FieldValue.fontStyle;
          if (FieldValue.signaturebaseData) field.signaturebaseData = FieldValue.signaturebaseData;
          if (FieldValue.signatureType) field.signatureType = FieldValue.signatureType;
          if (FieldValue.photoType) field.photoType = FieldValue.photoType;
          if (FieldValue.stampType) field.stampType = FieldValue.stampType;
          if (FieldValue.signatureId) field.signatureId = FieldValue.signatureId;
          if (FieldValue.photoId) field.photoId = FieldValue.photoId;
          if (FieldValue.stampId) field.stampId = FieldValue.stampId;
          if (FieldValue.insertedemail) field.insertedemail = FieldValue.insertedemail;
          if (FieldValue.created_at) field.created_at = FieldValue.created_at;
          if (FieldValue.longitude) field.longitude = FieldValue.longitude;
          if (FieldValue.latitude) field.latitude = FieldValue.latitude;
          this.spliceRequitedField(field)
          if(this.profiledata && (FieldValue.insertedemail==this.profiledata.email)) this.finished = true;
        }
      })
      this.dependencyCheck(this.fields)
  }

  // Getting the sharing peoples
  sharingpeople = []
  getSharedPeoples(){
    this.documentService.getsharingpeople(this.sharedRecord.fileid._id||this.fileid).subscribe((sharerecords: any) => {
      this.sharingpeople = sharerecords
    })
  }

  // for creating online users
  createonlineUsers(sharedRecord) {
    console.log(sharedRecord)
    var log = {
      fileid: sharedRecord.fileid._id,
      viewStatus: true,
      email: sharedRecord.toemail,
      uid: (sharedRecord.toid)?(sharedRecord.toid._id):undefined
    }
    this.generalservice.onlineuser(log).subscribe(data => {
      this.onlinedata = data
      this.Getonlineusers(this.sharedRecord.fileid._id)
    })
  }

  // Check expired or not for every 10 seconds 
  Interval = setInterval(() => {
    this.endtime = moment().format("YYYY-MM-DDTHH:mm:ss")
    if (this.expirydate) {
      if (this.expirydate <= this.endtime) {
        clearInterval(this.Interval);
        this.expiretimeCheck = false
        this.isloading=false
        let dialogRef = this.dialog.open(CommonDialogComponent,
          { data: { title: 'dependency', name: 'dependency', content: 'The Document Is Expired' }, width: '500px', panelClass: "deletemod",disableClose:true });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.Locations.back();
          }
        })
      }
    }
  }, 1000);



  async CheckTheDependency() {
    return new Promise(async (resolve, reject) => {
      this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.sharedRecord.fileid._id, versionid: this.sharedRecord.fileid.versionid }).subscribe(async (currentVersionDocFieldOptions: any) => {
        // currentVersionDocFieldOptions.forEach(field => {
        //   if (field.people && field.dependency && field.people == this.sharedRecord.toemail && !this.signdependency) this.dependencyCheck(field, currentVersionDocFieldOptions);
        // });
        this.documentService.getDocumentSingleLog({documentid:this.sharedRecord.fileid._id,message:'Submited',sharedid:this.sharedid,toemail:this.sharedRecord.toemail}).subscribe((data:any) => {
          console.log(data);
          if(data && data.length){
            this.finished = true;
          }
        })
        this.dependencyCheck(currentVersionDocFieldOptions);
        resolve()
      },error=>{
        console.log(error);
        this.documentService.openSnackBar(error,'X')
      })
    })
  }





  // Check Is there any password protection are there or not
  shared() {
    // this.isloading=true;
    this.documentService.getSharedDoc(this.sharedid).subscribe(async res => {
      this.sharedRecord = res;
      console.log(this.sharedRecord)
      this.profiledata = JSON.parse(localStorage.getItem('currentUser'))
      if (this.profiledata && this.profiledata.email) {
        this.profiledata.name = this.userservice.decryptData(this.profiledata.name)
        this.profiledata.email = this.userservice.decryptData(this.profiledata.email);
        this.profiledata.id = this.userservice.decryptData(this.profiledata.id)
      }
      else {
        var nameArray = this.sharedRecord.toemail.split('@')
        this.profiledata.name = nameArray[0]
        this.profiledata.email = this.sharedRecord.toemail
      }

      if (this.sharedRecord.revoke == true) {
        let dialogRef = this.dialog.open(CommonDialogComponent,
          { data: { title: 'dependency', name: 'dependency', content: "You don't Have an Access to View this file" }, width: '500px', panelClass: 'deletemod' ,disableClose:true});
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.router.navigate(['/home/shareddocument'])
          }
        })
      }



     
      if (this.sharedRecord.filepassword && this.sharedRecord.pin && !this.passwordCheck) {
        this.isloading = false
        const ConfirmationDiaBox = this.dialog.open(SignupdialogboxComponent, {
          width: '500px',
          disableClose: true,
          autoFocus: true,
          panelClass:'passwordbottom',
          data: { title: "Please enter this document's password to view it", content: this.sharedRecord.filepassword, otpflag: true,id:this.sharedRecord._id }
        });
        console.log(this.sharedRecord)
        ConfirmationDiaBox.afterClosed().subscribe(async result => {
          console.log(result)
          if (result) {
            this.isloading = false
            this.passwordCheck = true
            await this.loadDocumentRecordAndDependency()
            if (this.sharedRecord.VideoRecord)
              this.startRecording();
            else this.videorecordChecking=true
            // this.isloading=false;
          }
          else {
           
            this.Locations.back();
          }
        });
      }
      else if (this.sharedRecord.VideoRecord){
        this.loadDocumentRecordAndDependency()
        this.startRecording()
      }
      else{
        this.videorecordChecking=true
        this.loadDocumentRecordAndDependency()
      }
      if (this.sharedRecord.access_expirydate) {
        this.expirydate = moment(this.sharedRecord.access_expirydate).format("YYYY-MM-DDTHH:mm:ss")
        this.Interval
      }
      // if(this.sharedRecord && this.sharedRecord.Chat) this.createonlineUsers(this.sharedRecord);
      if (!this.sharedRecord.agreetoSign) {
        console.log(this.sharedRecord)
        this.sharedRecord.agreetoSign = true
        this.documentService.put('sharingpeoples/sharedoc/update/' + this.sharedRecord._id, this.sharedRecord).subscribe(data => {
          // this.documentService.sharingupdate(this.sharedRecord).subscribe(data => {
        })
      }
    }, error => {
      this.isloading=false
      if (error == 'Expired') {
        let dialogRef = this.dialog.open(CommonDialogComponent,
          { data: { title: 'dependency', name: 'dependency', content: 'The Document Is Expired' }, width: '500px', panelClass: "deletemod",disableClose:true });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.Locations.back();
          }
        })
      }
    });
  }

  async loadDocumentRecordAndDependency(){
    if (this.sharedRecord.folderid){
      this.documentService.getDocumentRecord(this.fileid).subscribe(async data=>{
        this.sharedRecord.fileid=data
        if(this.sharedRecord && this.sharedRecord.Chat) this.createonlineUsers(this.sharedRecord);
        await this.CheckTheDependency()
        this.documentRecord= this.sharedRecord.fileid
        this.documentService.getDocumentImages(this.documentRecord._id).subscribe(docimg => {
          this.documentImages = docimg
        })
      })
    }
   else{
    if(this.sharedRecord && this.sharedRecord.Chat) this.createonlineUsers(this.sharedRecord);
    await this.CheckTheDependency()
    this.documentRecord= this.sharedRecord.fileid
    this.documentService.getDocumentImages(this.documentRecord._id).subscribe(docimg => {
      this.documentImages = docimg
    })
    }
  }

  // Get FieldsWith Values for this docuemnt (If you want reload you can use this)     
  LoadFields() {
     this.documentService.getSelectedDoc(this.sharedRecord.fileid._id||this.fileid).subscribe(data => {
      this.documentRecord = data
      if (this.documentRecord.waterMark) this.waterMark = this.documentRecord.waterMark
      console.log(this.documentRecord)
      this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.documentRecord._id, versionid: this.documentRecord.versionid }).subscribe(async currentVersionDocFieldOptions => {
        console.log(currentVersionDocFieldOptions);
        this.fields = currentVersionDocFieldOptions;
       
        await this.documentStatusUpdate(this.fields)
        this.DisplayFieldsData();
      }, error => {
        console.log(error)
        if(error == 'Not Found')
        this.documentStatusUpdate(this.fields)
      });
    })
  }

  DisplayFieldsData() {

    // await this.documentStatusUpdate(this.fields)
    this.filledFieldCount = 0
    var isAnyOneInserted = 0
    this.fieldsforsubmit =  this.fields.filter(x => x.type != 'label')
    console.log(this.fieldsforsubmit.length,this.filledFieldCount)
    this.fieldsforsubmit.forEach(field => {
      if ( field.value || field.signatureId || field.stampId || field.photoId)
        this.filledFieldCount++
      if(field.insertedemail) isAnyOneInserted++
    });
    console.log(this.filledFieldCount,this.fieldsforsubmit.length)
    if(!isAnyOneInserted) this.filledFieldCount = 0
    this.requiredFieldsCount = this.fields.filter(field => (field.restrict && field.restrict == 'required' && field.people && field.people == this.sharedRecord.toemail &&  !(field.value || field.insertedemail || field.signatureId || field.photoId || field.stampId)));
    console.log(this.requiredFieldsCount)
    this.requiredFieldsCounts = this.requiredFieldsCount.length;
    this.dependencyCheck(this.fields);
    for (let field of this.fields) {
      if (field.type == 'date' && field.value) field.value = new Date(field.value)
      if (!field.insertedemail && !field.people && (field.value || field.photoId || field.stampId || field.signatureId)) field.ownerFieldValue = true;
      if (field.insertedemail == this.sharedRecord.toemail) this.finished = true
      // if(field.people)
      // console.log(field.type,field.people != this.sharedRecord.toemail)
      // console.log(field.people && (field.people != this.sharedRecord.toemail))
      if(field.people && (field.people != this.sharedRecord.toemail)) field.readonly = true;
      // if (field.people && field.dependency && field.people == this.sharedRecord.toemail && !this.signdependency) this.dependencyCheck(field,this.fields);
      if (field.type == 'label') field.class = "disableDiv"
      else if (field.type == 'signature') this.isSignaturField = true;
      else if (field.type == 'initial') this.isIntialField = true;
      else if (field.type == 'Photo') this.isPhotoField = true;
      else if (field.type == 'Stamp') this.isStampField = true;
      if (!this.sharedRecord.view) this.populateDefaults(field);
      else field.readonly = true;

      setTimeout(() => { this.updateFieldCss(field); }) //After Div insert in html then only it needs to be call
      $("#style-1").scrollTop(1);
    } // Update Css Fields
    this.nextField()
    // if(this.sharedRecord.view)
    // this.documentStatusUpdate(this.fields)
  }

  //Updating document status
  documentStatusUpdate(fields) {
    return new Promise(async (resolve, reject) => {
      fields = fields.filter(field => field.type != 'label')
      this.documentService.getsharingpeople(this.sharedRecord.fileid._id).subscribe((sharerecords: any) => {
        var sharereviews = []
        // var sharerecords = this.sharingpeople
        var shareSignatures = []
        shareSignatures = sharerecords.filter(element => !element.view)
        sharereviews = sharerecords.filter(element => element.view)
        var shareAgree = sharerecords.filter(element => element.agreetoSign)
        var statusemail = []
        var filledFieldCount = 0
        fields.forEach(function (field) {
          var unique = true;
          if (field.insertedemail) {
            statusemail.forEach(function (email) {
              if (_.isEqual(field.insertedemail, email)) unique = false;
            });
            if (unique) statusemail.push(field.insertedemail)
          }
          if (field.value || field.signatureId || field.stampId || field.photoId)
            filledFieldCount++
        });
        if (this.sharedRecord.view) {
          var unique = true;
          var v = this.sharedRecord.toemail
          statusemail.forEach(function (email) {
            if (_.isEqual(v, email)) unique = false;
          });
          if (unique) statusemail.push(this.sharedRecord.toemail);
        }
        if (statusemail.filter(element => element == this.sharedRecord.toemail).length == 0) {
          fields.filter(field => {
            if ((field.value || field.signatureId || field.stampId || field.photoId) && (field.people == this.sharedRecord.toemail )) {
              if (filledFieldCount > 0)
                filledFieldCount--
            }
          })
        }
        this.filledFieldCount = filledFieldCount

        var status
        console.log(sharerecords)
        if (this.sharedRecord.view) {
          if (shareAgree.length == sharerecords.length)
            status = "Completed"
          else if (sharerecords.length > 1)
            status = "Partially completed"
        }
        else if (!this.sharedRecord.view) {
          console.log(((statusemail.length == shareSignatures.length) || (filledFieldCount == fields.length)) && shareAgree.length == sharerecords.length)
           if (((statusemail.length == shareSignatures.length) || (filledFieldCount == fields.length)) && shareAgree.length == sharerecords.length)
            status = "Completed"
            else if (sharerecords.length >= 1 && (statusemail.length >= 1 || filledFieldCount > 1))
            status = "Partially completed"
        }

        if (sharerecords[0].fileid.status != "Completed" && status == "Completed") {
          this.documentService.newCompletedDocImgs({ id: this.documentRecord._id, createCompDocImg: true }).subscribe((data: any) => { })
        }

        console.log(status)
        if (sharerecords[0].fileid.status != status){
          // sharerecords[0].fileid.status = status
          this.documentService.updatefolder({_id:sharerecords[0].fileid._id,status:status}).subscribe(updatedData => { });
        }
        resolve()
      });
    })
  }

  passwordCheck: boolean = false;

  // Load Aditional Info
  loadAdditionalData() {
    this.auditlog({ id: this.sharedRecord.fileid._id }); // Get All Audit log when ever page loading is done
    this.getComments()
    if (this.sharedRecord.VersionAccess)
      this.getAllDocVersions(this.sharedRecord.fileid._id)
    // if (this.sharedRecord.fileid._id) this.Getonlineusers(this.sharedRecord.fileid._id);
    // Marking as he is available for online users
    var log = {
      fileid: this.sharedRecord.fileid._id,
      viewStatus: true,
      email: this.sharedRecord.toemail,
      uid: this.sharedRecord.toid,
    }
    // this.generalservice.onlineuser(log).subscribe(data => { this.onlinedata = data });
    // Load Notifications
    this.getOfflineNotification();
  }


  // 
  //Populate Default Values
  populateDefaults(field) {
    if (field.class != "disableDiv" && field.type == "name" && !field.value && (field.people == this.sharedRecord.toemail)) 
    {
      field.value = this.sharedRecord.toid.name
      if(field.value && field.required) this.spliceRequitedField(field)
    }
    else if (field.class != "disableDiv" && field.type == "email" && !field.value && (field.people == this.sharedRecord.toemail)) 
    {
      field.value = this.sharedRecord.toemail
      if(field.value && field.required) this.spliceRequitedField(field)
    }
    else if (field.class != "disableDiv" && field.type == "date" && !field.value && (field.people == this.sharedRecord.toemail)) 
    {
      field.value = new Date();
      if(field.value && field.required) this.spliceRequitedField(field)
    }
    else if (field.class != "disableDiv" && (field.type == "signature" && !field.signatureId)) {
      if (this.isSignaturField) this.populateDefaultSignature(field, 'signature');
    }
    else if (field.class != "disableDiv" && (field.type == "initial" && !field.signatureId)) {
      if (this.isIntialField) this.populateDefaultSignature(field, 'initial');
    }
    else if (field.class != "disableDiv" && field.type == "Photo" && !field.photoId) {
      if (this.isPhotoField) this.PopulateDefaultPhoto(field)
    }
    else if (field.class != "disableDiv" && field.type == "Stamp" && !field.stampId) {
      if (this.isStampField) this.PopulateDefaultStamp(field);
    }
  }

  // Load Signature 
  populateDefaultSignature(field, type) {
    console.log(field)
    if (((field.type == "signature" || field.type == 'initial')&& !field.signatureId)) {
      this.documentService.getDefaultSignature({ email: this.sharedRecord.toemail, signtype: type }).subscribe((data: any) => {
        if (field.people && field.people == this.sharedRecord.toemail) {
          field.req = false
          this.spliceRequitedField(field)
          let date = new Date()
          if (data._id) field.signatureId = data._id;
          if (data.type) field.signatureType = data.type
          if (data.signaturebaseData) field.signaturebaseData = data.signaturebaseData
          if (data.path) field.path = data.path
          if (data.size) field.size = data.size
          if (data.name) field.name = data.name
          if (data.encryptedid) field.encryptedid = data.encryptedid
          if (data.fontStyle) field.fontStyle = data.fontStyle
          if (data.fontText) field.fontText = data.fontText
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          data.created_at = date
          data.fieldId = field.id
          if (type == 'signature')
            this.savedocLogs(this.sharedRecord.fileid._id, data, 'Signature')
          else if (type == 'initial')
            this.savedocLogs(this.sharedRecord.fileid._id, data, 'Initial')
        }
      })
    }
  }

  // Load Default Photo IF exists
  PopulateDefaultPhoto(field) {
    if ((field.type == "Photo" && !field.photoId && !field.authentication)) {
      this.documentService.getDefaultPhoto(this.sharedRecord.toemail).subscribe((data: any) => {
        if (field.people && field.people == this.sharedRecord.toemail) {
          field.req = false
          this.spliceRequitedField(field)
          let date = new Date()
          if (data._id) field.photoId = data._id
          if (data.type) field.photoType = data.type
          if (data.path) field.path = data.path
          if (data.size) field.size = data.size
          if (data.name) field.name = data.name
          if (data.encryptedid) field.encryptedid = data.encryptedid
          if (data.photobaseData) field.photobaseData = data.photobaseData
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          data.created_at = date
          data.fieldId = field.id
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Photo')
        }
      })
    }
  }

  // Get Default Stamp
  PopulateDefaultStamp(field) {
    if ((field.type == "Stamp" && !field.stampId)) {
      this.documentService.getDefaultStamp(this.sharedRecord.toemail).subscribe((data: any) => {
        if (field.people && field.people == this.sharedRecord.toemail) {
          field.req = false
          this.spliceRequitedField(field)
         let date = new Date()         
          if (data._id) field.stampId = data._id
          if (data.type) field.stampType = data.type
          if (data.path) field.path = data.path
          if (data.size) field.size = data.size
          if (data.name) field.name = data.name
          if (data.encryptedid) field.encryptedid = data.encryptedid
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          data.created_at = date
          data.fieldId = field.id
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Stamp')
        }
      })
    }
  }

  //Get pdf empty left space
  getpdfSizes() {
    this.PdfTop = document.getElementById('docsubheader').offsetHeight;
    this.PdfTopScroll = $("#style-1").scrollTop();
    console.log(this.PdfTopScroll)
    this.PdfLeft = $('#docsidebar').outerWidth(true) + (($('#blog-post').outerWidth(true) - $('#blog-post').width()) / 2);
    this.PdfLeftNosideBar = ($('#blog-post').outerWidth(true) - $('#blog-post').width()) / 2;
  }

  /*Get Field Left Side distance
    Inputs
    field : object  : field Info
    Output:- Fild Left Value 
  */
  getFieldLeft(field) {
    var left = 0;
    if ((field.top || field.coordinatey) && this.zoomVal != 1) {
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      if (field.left) {
        var l = (field.left / 100) * perc;
        left = field.left - l;
      }
      else {
        console.log(field.coordinatey)
        var l = (field.coordinatey / 100) * perc;
        left = (field.coordinatey - l) - ((this.zoomVal * 10) - 10);
      }
    }
    else if (field.left) left = field.left;
    else if (field.coordinatey) left = field.coordinatey; // only comments section
    return left + this.PdfLeftNosideBar;
  }

  // Get Field Top as per zoom Level
  getFieldTop(field) {
    var top = 0;
    //Only zoom section
    if ((field.top || field.coordinatex) && this.zoomVal != 1) {
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      if (!field.selectText && field.top) {
        var l = (field.top / 100) * perc;
        top = field.top - l;
      } else if (field.coordinatex) {
        var l = (field.coordinatex / 100) * perc;
        top = field.coordinatex - l;
      }
      else if (field.selectText) {
        var l = (field.top / 100) * perc;
        top = field.top - l;
      }
    }
    else if (field.top) { top = field.top; }
    else if (field.coordinatex) { top = field.coordinatex }
    return top;
  }

  // Get Field Height as per zoom Level
  getFieldHeight(field) {
    //Only zoom section
    if (field.height && this.zoomVal != 1) {
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      var l = (field.height / 100) * perc;
      return field.height - l;
    }
    else return field.height;
  }

  // Get Field width as per zoom Level
  getFieldWidth(field) {
    //Only zoom section
    if (field.width && this.zoomVal != 1) {
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      var l = (field.width / 100) * perc;
      return field.width - l;
    } else return field.width;
  }

  // Caliculate distance percentage
  getPercentageChange(oldNumber, newNumber) {
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
  }

  // Update Font Size dipandance up on the field
  ResetFieldFonts(field) {
    if(this.windowwidth > 750 )
    {
    if (field && field.type && (field.type == 'signature' || field.type == 'initial' || field.type == 'Photo' || field.type == 'Stamp' || (field.type == 'label' && field.placeholder == "label" && !field.value))) {
      var div = $("#" + field.id + '-input');
      var fontsizeInvw = div.width() / 90
      var fontsizeInvh = div.height() / 90
      if (div.width() == 15) div.css('font-size', 0.56 + 'vw');
      else if (div.width() == div.height())
        div.css('font-size', (fontsizeInvh + fontsizeInvw) + 'vmin');
      else if (div.width() > div.height())
        div.css('font-size', fontsizeInvh + 0.5 + 'vw');
      else {
        fontsizeInvw = div.width() / 90
        fontsizeInvh = div.height() / 90
        div.css('font-size', (fontsizeInvw) + 'vw');
      }
    }
  }
    if (field && field.type && field.type == 'date') {
      this.assignRadio(field, 'pickerType');
    }
  }

  UpdateDateFormat(field) {
    console.log(field)
    var index = this.requiredFieldsCount.findIndex(x => x.id == field.id);
    console.log(index)
    if (index >= 0) {
      this.requiredFieldsCount.splice(index, 1);
      $("#" + field.id).removeAttr("tabindex");
      $("#" + field.id).removeClass("focuscolor");
      $("#" + field.id + "-input").addClass("label");
      $("#" + field.id + "-input").removeClass("drag-box-label");
    }
    this.requiredFieldsCounts = this.requiredFieldsCount.length;
    if (field.pickerType == 'date') {
      var m = JSON.parse(JSON.stringify(field.dateformats));
      field.dateformats = '';
      setTimeout(() => { field.dateformats = m });
    }
    else if (field.pickerType == 'time') {
      var m = JSON.parse(JSON.stringify(field.timeformats));
      field.timeformats = '';
      setTimeout(() => { field.timeformats = m });
    }
    else {
      var m = JSON.parse(JSON.stringify(field.dateTimeformats));
      field.dateTimeformats = '';
      setTimeout(() => { field.dateTimeformats = m });
    }
    return field.value;
    if (!field.value) return true;
    if (field.pickerType == 'date') field.value = this.datepipe.transform(field.value, field.dateformats)
    else if (field.pickerType == 'time') field.value = this.datepipe.transform(field.value, field.timeformats)
    else field.value = this.datepipe.transform(field.value, field.dateTimeformats)
  }

  clearDateValue(f) {
    f.value = null;
    if (f.restrict && f.restrict == 'required' && f.people && (!f.people || f.people == this.sharedRecord.toemail ) && !this.requiredFieldsCount.some(x => x.id == f.id)) this.requiredFieldsCount.push(f)
    this.requiredFieldsCounts = this.requiredFieldsCount.length;
  }

  assignRadio(f, key) {
    if (f.type == 'date' && key == 'pickerType' && this.editF) {
      setTimeout(() => {
        $(".date-clear").hide();
        $("." + f.pickerType + "-picker-dropdown").show();
        if (f.pickerType == 'date') {
          this.editF.pickerT = 'calendar';
          this.editF.dateformats = 'dd/MM/yyyy';
          this.editF.timeformats, this.editF.dateTimeformats = '';
        }
        else if (f.pickerType == 'time') {
          this.editF.pickerT = 'timer';
          this.editF.timeformats = 'hh:mm a';
          this.editF.dateformats, this.editF.dateTimeformats = '';
        }
        else {
          this.editF.pickerT = 'both';
          this.editF.dateTimeformats = 'dd/MM/yyyy hh:mm';
          this.editF.dateformats, this.editF.timeformats = '';
        }
      }, 10);
    }
  }

  // Resize fields on window resize
  onWindowResize() {
    this.getpdfSizes();
  }

  /* Wher we require we can configure the fields with left and height
    Inputs :--
      Output:- --
    */
  resetFields(fields) {
    if (!fields) fields = this.fields;
    console.log(fields);
    for (let field of this.fields) {
      //field.left = field.left + this.PdfLeftNosideBar;
      field.top = field.top + document.getElementById('docsubheader').offsetHeight + 30;
      /*setTimeout(() =>{
        this.updateFieldCss(field);
      },200);*/
    }
  }

  //filter countries
  // private filterCountries() {
  //   if (!this.dataa) return;
  //   let search = this.countryFilterCtrl.value;
  //   if (!search) {
  //     this.filteredEntities.next(this.dataa.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   this.filteredEntities.next(
  //     this.dataa.filter(country => country.name.toLowerCase().indexOf(search) > -1)
  //   );
  // }

  

  onRightClick(event) {
    // event.preventDefault()
  }

  // getting signature list
  GetSignatureDocumentList(taboption) {
    console.log(taboption)
    if (this.sharedRecord)
      this.documentService.ListOfSignatures(this.sharedRecord.toemail).subscribe((res: any) => {
        if (res.length > 0) {
          this.SignatureList = []
          res.forEach(signelement => {
            let needToPush = true;
            this.SignatureList.forEach(element => {
              if ((signelement.type == 'font' && signelement.fontStyle == element.fontStyle && signelement.fontText == element.fontText) ||
                (signelement.type == 'signaturepad' && signelement.signaturebaseData == element.signaturebaseData)) {
                needToPush = false;
                return;
              }
            });
            if (needToPush) this.SignatureList.push(signelement);
          });
          console.log(this.SignatureList.length)

        } else if (taboption && this.SignatureList.length == 0) {
          this.tabactive = taboption;
          this.signature()
        }
      });
  }

  initialList = []
  GetInitialDocumentList(taboption) {
    if (this.editF) this.editF.req = false;
    if (this.sharedRecord)
      this.documentService.ListOfInitials(this.sharedRecord.toemail).subscribe((res: any) => {
        if (res.length > 0) {
          this.initialList = []
          res.forEach(signelement => {
            let needToPush = true;
            this.initialList.forEach(element => {
              if ((signelement.type == 'font' && signelement.fontStyle == element.fontStyle && signelement.fontText == element.fontText) ||
                (signelement.type == 'signaturepad' && signelement.signaturebaseData == element.signaturebaseData)) {
                needToPush = false;
                return;
              }

            });
            if (needToPush) this.initialList.push(signelement);
          });
        }
      });
  }

  setInitialDefaultSettings(sign) {
    if (sign.setDelete) {
      var index = this.initialList.findIndex(x => x._id == sign._id)
      if (index >= 0) {
        this.initialList.splice(index, 1)
      }
      if (this.initialList.length == 0)
        this.tabactive = 'tab3'
    }
    this.documentService.setSignatureDefaultSettings(sign).subscribe(data => {
      // this.GetInitialDocumentList(false);
    })
  }

  setSignatureDefaultSettings(sign) {
    if (sign.setDelete) {
      var index = this.SignatureList.findIndex(x => x._id == sign._id)
      if (index >= 0) {
        this.SignatureList.splice(index, 1)
      }
    }
    if (this.SignatureList.length == 0)
      this.tabactive = 'tab3'
    this.documentService.setSignatureDefaultSettings(sign).subscribe(data => {
      // this.GetSignatureDocumentList(false);
    })
  }

  setPhotoDefaultSettings(sign) {
    if (sign.setDelete) {
      var index = this.PhotoList.findIndex(x => x._id == sign._id)
      console.log(index)
      if (index >= 0) {
        this.PhotoList.splice(index, 1)
      }
      if (this.PhotoList.length == 0)
        this.tabactive = 'tab5'
    }
    this.documentService.setPhotoDefaultSettings(sign).subscribe(data => {
      // this.GetPhotoDocumentList(false);
    })
  }

  setStampDefaultSettings(sign) {
    if (sign.setDelete) {
      var index = this.StampList.findIndex(x => x._id == sign._id)
      console.log(index)
      if (index >= 0) {
        this.StampList.splice(index, 1)
      }
      if (this.StampList.length == 0)
        this.tabactive = 'tab2'
    }
    this.documentService.setStampDefaultSettings(sign).subscribe(data => {
      // this.GetStampDocumentList(false);
    })
  }

  updateorgemps(e) {
    //console.log(this.documentRecord._id);
    //console.log(e.organizationid)
    //console.log(e._id);
    this.organizationService.updateorgsharingpeople(this.documentRecord._id, e).subscribe(data => {
      //console.log(data)
    })
  }

  GetPhotoDocumentList(taboption) {
    if (this.sharedRecord)
      this.documentService.ListOfPhotos(this.sharedRecord.toemail).subscribe((res: any) => {
        //console.log(res)
        if (res.length > 0)
          this.PhotoList = res;
      });
  }

  GetStampDocumentList(taboption) {
    if (this.sharedRecord)
      this.documentService.ListOfStamps(this.sharedRecord.toemail).subscribe((res: any) => {
        //console.log(res)
        this.StampList = res;
      });
  }

  selectSignature(data, title) {
    this.editF.req = false
    this.spliceRequitedField(this.editF)
    let date = new Date()
    console.log(date)
    if (data._id) this.editF.signatureId = data._id;
    if (data.type) this.editF.signatureType = data.type
    if (data.signaturebaseData) this.editF.signaturebaseData = data.signaturebaseData
    if (data.path) this.editF.path = data.path
    if (data.size) this.editF.size = data.size
    if (data.name) this.editF.name = data.name
    if (data.encryptedid) this.editF.encryptedid = data.encryptedid
    if (data.fontStyle) this.editF.fontStyle = data.fontStyle
    if (data.fontText) this.editF.fontText = data.fontText
    this.editF.latitude = this.latitude
    this.editF.longitude = this.longitude
    this.editF.created_at = date
    data.created_at = date
    data.fieldId = this.editF.id
    this.savedocLogs(this.sharedRecord.fileid._id, data, title)
  }

  selectPhoto(data) {
    this.editF.req = false
    this.spliceRequitedField(this.editF)
    if (data.bottlenecksCreated == false && this.editF.authentication == true) {
      this.documentService.bottlenecksCreationForPhoto(data).subscribe((result: any) => {
        if (result._id && result.bottlenecksCreated) {
          this.savedPhoto = data
          let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'aiauthenticate' }, disableClose: true, width: '500px', panelClass: "deletemod" });
          dialogRef.afterClosed().subscribe( res => {
            if(res){
          this.authenticateFun(data._id)
            }
          })
        }
        else
          this.documentService.openSnackBar('Choose other photo', "X")
      }, error => {
        this.documentService.openSnackBar(error, "X")
        console.log(error)
      })
    }
    else if (data.bottlenecksCreated == true && this.editF.authentication == true) {
      this.savedPhoto = data
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'aiauthenticate' }, disableClose: true, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe( res => {
        if(res){
      this.authenticateFun(data._id)
        }
      })
    }
    else {
      this.savedPhoto = data
      this.setPhoto('select')
    }
  }

  selectStamp = function (data) {
    this.editF.req = false
    this.spliceRequitedField(this.editF)
    let date = new Date()
    if (data._id) this.editF.stampId = data._id
    if (data.type) this.editF.stampType = data.type
    if (data.path) this.editF.path = data.path
    if (data.size) this.editF.size = data.size
    if (data.name) this.editF.name = data.name
    if (data.encryptedid) this.editF.encryptedid = data.encryptedid
    this.editF.latitude = this.latitude
    this.editF.longitude = this.longitude
    this.editF.created_at = date
    data.created_at = date
    data.fieldId = this.editF.id
    this.savedocLogs(this.sharedRecord.fileid._id, data, 'Stamp')
  }



  requiredFiled: any
  // anotherrecord:any
  submit = function (e) {
    console.log(this.fields);
    if (document.getElementById('myModal12345')) { this.isloading = false }
    if (this.requiredFieldsCounts == 0) {
      this.fieldemails = this.fields.find(x => (x.type == 'email' || x.type == 'mobilenumber') && !x.fieldvalidationCheck);
      this.fieldminlength = this.fields.find(x => (x.type == 'name' || x.type == 'text' || x.type == 'email' || x.type == 'mobilenumber' || x.type == 'company') && x.minlengtherror)
      console.log(this.fieldemails)
      if (this.fieldemails || this.fieldminlength) {
        let dialogopem = this.dialog.open(CommonDialogComponent, { data: { title: 'dependency', name: 'dependency', content: "Unable To submit data due to invalid data Entered" }, width: '500px', panelClass: 'deletemod',disableClose:true});
      }
      else if (!this.fieldemails) {
        let dialogRef = this.dialog.open(CommonDialogComponent,
          { data: { name: 'sharesubmit', cancel: true, content: 'Are you sure you want to submit the file?' }, width: '500px', panelClass: "deletemod",disableClose:true });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            console.log(this.requiredFieldsCount)
            this.fields.forEach(async element => {
              console.log(element)
              console.log(element.value)
              if (element.people) {
                if ((element.type == 'initial' || element.type == 'signature' || element.type == 'Photo' || element.type == 'Stamp') && element.required == true && element.people == this.sharedRecord.toemail && !(element.signatureId || element.photoId || element.stampId)) {
                  element.req = true
                }
                else if (element.value == undefined) {
                  await this.validateField(e, element)
                }
                else {
                  this.validateField(element.value, element)
                }
              }
            });
            this.requiredFiled = this.fields.find(x => x.req || (x.error == "Fill this field" || x.toucherror == "Fill this field"));
            if (this.requiredFiled) {
              console.log(this.requiredFiled)
              document.getElementById('reqFieldModal').click()
              return;
            }
            console.log(this.sharedRecord)
            var name
            if (this.profiledata.name) name = this.userservice.decryptData(this.profiledata.name)
            else {
              var nameArray = this.sharedRecord.toemail.split('@')
              name = nameArray[0]
            }
            // this.fields.find(x =>)
            this.isloading = true
    
             if(!this.locationdata)this.locationdata=JSON.parse(localStorage.getItem('myip'));
            this.documentService.updateSharedFieldsValue({ name: name, uid: this.sharedRecord.toid ? this.sharedRecord.toid : null, email: this.sharedRecord.toemail ? this.sharedRecord.toemail : null, fieldvalues: this.fields, documentid: this.sharedRecord.fileid._id, tomail: this.sharedRecord.fromid.email,IpAddress:(this.locationdata)?this.locationdata.ip:' ' }).subscribe(async res => {
              console.log(res)
            this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.documentRecord._id, versionid: this.documentRecord.versionid }).subscribe(async currentVersionDocFieldOptions => {
              this.fields=currentVersionDocFieldOptions;
              console.log(this.LogsList)
              this.documentService.createBulkFieldLogs(this.LogsList).subscribe(data =>{})
              await this.documentStatusUpdate(this.fields)
              // await this.documentStatusUpdate(this.fields)
              document.getElementById('basicExampleModal').click()
              this.isloading = false
              this.finished = true;

              this.documentService.openSnackBar("Submited Successfully", "X");
              if(this.pageInfo.length > 0)
                this.auditlogs.pageInfo=this.pageInfo
              console.log(this.auditlogs)
              clearInterval(this.pageinterval);
              console.log(this.auditlogs,this.endtime)
              if (this.auditlogs) this.generalservice.updatetime(this.auditlogs, this.endtime).subscribe(data => {
               
                this.auditlogsResult = data
                console.log(this.auditlogsResult)
              });
              this.pageinterval=setInterval(()=>{
                this.pageInfo[this.pageNo-1].time = ++this.pageInfo[this.pageNo-1].time;
            },1000)
              this.savedocLogs(this.sharedRecord.fileid._id, '', 'Submited');
              if (this.profiledata && this.profiledata.email) {
                const result = {
                  fromid: this.sharedRecord.toid ? this.sharedRecord.toid._id : null,
                  toid: this.sharedRecord.fromid,
                  sharingPeopleId: this.sharedRecord._id,
                  type: 'submit',
                  fromemail: this.sharedRecord.toemail,
                  documentid: this.sharedRecord.fileid._id
                }
                console.log(result)
                this.generalservice.createnotification(result).subscribe(response => {
                  //console.log(response);
                });
              }
            })
            })
          }
        });
      }
    }
    else {
      document.getElementById('reqFieldModal').click()
    }
  }

  createFolderDialogClose() {
    console.log(this.requiredFiled)
    document.getElementById('closeReqModal').click()
    // $("div.page").attr("tabindex", "0")
    // $("div#"+this.requiredFiled.id+":eq(1)").focus();
    // document.getElementById('focus').focus();
    // document.getElementById("focus").focus();
  }

  validateField = async function (e, f) {
    console.log("validatefield")
    if(f.type &&  f.restrict != 'readonly' && !f.insertedemail && (!f.people || f.people == this.sharedRecord.toemail))
    {
    $("#" + f.id+ "-input").attr("tabindex", 1).focus();
    
      $("#" + f.id+ "-input").addClass("focuscolor");
    }
    if (f.email) {
      if (f.required && (e == '' || e.length == 0 || e.length == undefined) && f.email == this.sharedRecord.toemail) {
        f.error = "Fill this field";
        f.toucherror = false;
      }
      else if (f.required && e.length == 0 && f.email == this.sharedRecord.toemail)
        f.error = "Fill this field";
      else {
        f.error = false;
        f.toucherror = false;
      }
    }
  }

  valueDecr = false
  validateFieldtouch(e, f) {
   
    console.log(f.value)
    if (f.email) {
      console.log(f.valueDecr)
      if (f.required && f.value == undefined && f.email == this.sharedRecord.toemail) {
        f.touched = true;
        f.error = false;
        f.toucherror = "Fill this field";
      }
    }
    else {
      f.touched = false;
      if(f.minlengtherror) f.valueDecr = false
      console.log(f.value , f.required , !f.valueDecr , f.people == this.sharedRecord.toemail,!f.minlengtherror)
      if (f.value && f.required  && f.people == this.sharedRecord.toemail && !f.minlengtherror) {
        var index = this.requiredFieldsCount.findIndex(x => x.id == f.id)
       this.spliceRequitedField(f)
        $("#" + f.id).removeAttr("tabindex");
        $("#" + f.id).removeClass("focuscolor");
        $("#" + f.id + "-input").addClass("label");
        $("#" + f.id + "-input").removeClass("drag-box-label");
        console.log(this.requiredFieldsCount)
      }
      if (!f.value && f.restrict == 'required' && !f.minlengtherror) {
        if (!this.requiredFieldsCount.some(x => x.id == f.id) && (!f.people || f.people == this.sharedRecord.toemail)) this.requiredFieldsCount.push(f);
        this.requiredFieldsCounts = this.requiredFieldsCount.length;
        f.valueDecr = false
        console.log(f)
      }
    }
  }

  image = true
  //Chat functions
  test() {
    this.showpages = !this.showpages
    if (this.image) { this.image = false } else {
      this.image = true
    }
    this.closeChat = !this.closeChat
    if (this.closeChat) {
      this.openChat = true;
    }
    else {
      this.openChat = false;
    }
  }

  chatdata = {};
  chatHistory: any;
  openChat = false;
  sendchatdata = function () {
    this.chatdata.from = this.viewRecord.uid._id;
    this.chatdata.to = this.viewRecord.bankNo._id;
    this.chatdata.loanDocID = this.viewRecord._id;
    this.chatdata.type = "loan";
  }

  windowScrollHeight: any;
  PDFLoading = true;
  waterMark: any = { fontsize: '14px', content: '' };
  onLoading() {
    this.PDFLoading = false;
    // this.loadWaterMark();
  }


  loadPDF(pdf) {
    // //console.log($(".page").width());
    $(".blog-post").width($(".page").width());
    $(".textLayer").css("border", '1px solid #000');
    // this.additionalData()
    this.onWindowResize()
  }

  incrementPage(amount: number) {
    this.page += amount;
  }
  pageinterval
  afterLoadComplete(pdf) {
   
    this.pdf = pdf;
    this.LoadFields();// Load Fields Values
    this.getSharedPeoples()
    var v = this.pdf.numPages.toString()
    for (var i = 1; i <= this.pdf.numPages; i++) {
      this.pagenumbers.push(i.toString().padStart(this.pdf.numPages.toString().length, '0'))
      this.pageInfo.push({pageNo:i,time:0})
    }
    this.pageinterval=setInterval(()=>{
      this.pageInfo[this.pageNo-1].time = ++this.pageInfo[this.pageNo-1].time;
  },1000)
   
    this.loadOutline();
    this.getpdfSizes()
    this.loadAdditionalData();
    this.additionalData()
    this.getmodeldata();

    this.isloading = false;
    setTimeout(() => {
      this.PdfHeight = $(".page:first").height();
      this.PdfWidth = $(".page:first").width();
    }, 100)
  }

  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
      console.log(this.outline)
    });
  }

  onError(event) {
    console.log(event)
  }

  pdfZoom: any = 0; //PDf Zoom Percentage
  zoomVal = 1; // PDF Zoom 
  zoomWidth  // Before zoom we will caliculate width
  zoomHeight  // Before zoom we will caliculate height
  // PDf Zoom Functions
  // PDf Zoom Functions
  pdfZoomIn() {
    this.zoomWidth = $(".page").width()
    if (this.zoomVal <= 1.5) {
      this.zoomVal += 0.1
    }
  }

  pdfZoomOut() {
    this.zoomWidth = $(".page").width()
    if (this.zoomVal > 1) {
      this.zoomVal -= 0.1
    }
  }

  pdfZoomreset() {
    this.zoomWidth = $(".page").width()
    this.zoomVal = 1
  }

  // Load Water Mark
  loadWaterMark() {
    let text: any = this.waterMark;
    var fontSize = text.fontsize.substring(0, 2);
    var contentL = text.content.length;
    if (!text.location || text.location == '') return false;
    $(".remove_watermark").remove();
    var css = 'font-size:' + text.fontsize + '; font-family:"' + text.fontfamily + '";position: absolute;';
    $("body").append("<div class='remove_watermark' style='" + css + "'>" + text.content + "</div>");
    var css = '';
    var mark_width = $(".remove_watermark:last").width();
    $(".remove_watermark").hide();
    //watermark calculation
    var m = Math.sin(text.rotate * Math.PI / 180) / 2;
    var val = Math.abs(mark_width * m);
    var val_left = 0;
    if (text.rotate > 85 && text.rotate < 95) val_left = (mark_width - fontSize) / 2;
    else val_left = (Math.abs(val * Math.sin(text.rotate * Math.PI / 180)) + fontSize) / 2;

    if (text.location == 'top_left') css += '.textLayer:before{top:0;left:0; left: -' + val_left + 'px; top:' + val + 'px;';                          //top-left 
    else if (text.location == 'top_right') css += '.textLayer:before{ top:0; right:0; right: -' + val_left + 'px; top:' + val + 'px;';                //top-right
    else if (text.location == 'middle') css += '.textLayer{ display:flex;justify-content:center;align-items: center;} .textLayer:before{';      //middle 
    else if (text.location == 'bottom_left') css += '.textLayer:after{ bottom:0; left: 0; left: -' + val_left + 'px; bottom:' + val + 'px;';        //bottom-left
    else if (text.location == 'repeat') css += '.textLayer{ display:flex;justify-content:center;align-items: center;} .textLayer:before{';
    else css += '.textLayer:after{ right: 0; bottom:0; right: -' + val_left + 'px; bottom:' + val + 'px;';                                        //bottom-right
    if (text.content && text.content != '' && text.location != 'repeat') css += 'content:' + '"' + text.content + '";';
    else if (text.content && text.content != '' && text.location == 'repeat') css += 'content:' + '"' + (text.content + ' ').repeat(10000) + '"; width: 200%; ';
    if (text.line_hight && text.line_hight != '' && text.location == 'repeat') css += ' line-height: ' + text.line_hight + '; ';
    if (text.color && text.color != '') css += 'color:' + '' + text.color + ';';
    if (text.fontsize && text.fontsize != '') css += 'font-size:' + text.fontsize + ';';
    if (text.fontfamily && text.fontfamily != '') css += 'font-family:' + '"' + text.fontfamily + '";';
    if (text.weight) css += "font-weight: bold; ";
    if (text.style) css += "font-style: italic; ";
    if (text.decoration) css += "text-decoration: underline; ";
    if (text.rotate && text.rotate != '') css += "transform: rotate(" + text.rotate + "deg);";

    css += 'position: absolute;}';
    $("style[data-custom*='delete']").remove();
    $(".page:first").after("<style data-custom='delete'>" + css + "</style>");
  }

  accessbutton = false
  /// Getting Comments
  getComments() {
    if (this.sharedRecord.fileid._id) {
      var id = { id: this.sharedRecord.fileid._id }
      this.documentService.getcomments(id).subscribe(data => {
        this.commentsdata = data
        console.log(this.commentsdata)
        this.childcomments = []
        this.parentcomment = []
        this.commentsdata.forEach(element => {
          if (element.uid._id != this.profiledata.id) { element.coordinatey -= 15; }
          if (element.parentcommentid) {
            if (element.uid) {
              if (element.uid._id == this.sharedRecord.toid._id) {
                element.isreply = true
              }
            }
            else {
              if (element.people == this.sharedRecord.toemail) {
                element.isreply = true
              }
            }
            this.childcomments.push(element)
          }
          else {
            if (element.uid) {
              if (element.uid._id == this.sharedRecord.toid._id) {
                element.isreply = true
                this.accessbutton = true
              }
            }
            else {
              if (element.people == this.sharedRecord.toemail) {
                element.isreply = true
              }
            }
            this.parentcomment.push(element)
          }
        })
      })
    }
  }

  //Add comments
  addComment(val, commentdata) {
    console.log(val.value)
    console.log(this.coordinatey + '-' + this.PdfLeftNosideBar);
    this.comment = val.comment
    this.documentid = val._id
    this.editlabel = true
    this.formSubmitted = true
    val.value.documentid = this.sharedRecord.fileid._id,
      val.value.commentedlines = this.commentedlines,
      val.value.coordinatex = this.coordinatex,
      val.value.height = this.coordinatehight,
      val.value.width = this.coordinatewidth,
      val.value.coordinatey = this.coordinatey - this.PdfLeftNosideBar
    val.value.showComment = true
    if (this.sharedRecord.toid) {
      val.value.uid = this.sharedRecord.toid._id
      val.value.name = this.profiledata.name
    }
    val.value.email = this.sharedRecord.toemail
    var nameArray = this.sharedRecord.toemail.split('@')
    val.value.name = nameArray[0]
    if (val.value.comment && val.value.comment.length) {
      this.formSubmitted = false
      this.documentService.postcomments(val.value).subscribe((data: any) => {
        commentdata.commentbtn = false
        this.activeComment = []
      })
    }
  }
  latestrecord : any
  handleClick =async function(e) {
    if(!this.locationdata)this.locationdata=JSON.parse(localStorage.getItem('myip'));
    this.getpdfSizes();
    $(".blog-post").width($(".page").width());
    var selection = window.getSelection();
    var oRange = selection.getRangeAt(0); //get the text range
    var oRect = oRange.getBoundingClientRect();
    this.commentedlines = selection.toString()
    var docwidth = document.getElementById('blog-post').offsetWidth;
    console.log(oRect.top + '-' + this.PdfTop + '+' + this.PdfTopScroll);
    var top = oRect.top - this.PdfTop - document.getElementById('docheader').offsetHeight + this.PdfTopScroll;
    var offestLeft = ($('.parentClass').width() / 100) * 25 + 5;
    var left = oRect.left - offestLeft;
    console.log(top, left);
    if (this.zoomVal != 1) {
      var l = 0;
      var NH = $(".page:first").height();
      var NW = $(".page:first").width();
      var heightPercentage = top / (NH / 100);
      top = (this.PdfHeight / 100) * heightPercentage;
      var widthPercentage = left / (NW / 100);
      left = (this.PdfWidth / 100) * widthPercentage;
      top = (this.PdfHeight / 100) * heightPercentage;
    }
    var mousedata = {
      // left :document.getElementById('blog-post').offsetWidth,
      //       top :e.pageY - document.getElementById('docheader').offsetHeight,
      coordinatex: top,
      coordinatey: left,
      width: oRect.width,
      height: oRect.height,
      text: selection.toString(),
      message: 'selected',
      documentid: this.sharedRecord.fileid._id,
      isFile: true,
      latitude: this.latitude,
      longitude: this.longitude,
      Address: this.Address,
      uid: this.sharedRecord.toid ? this.sharedRecord.toid._id : null,
      email: this.sharedRecord.toemail,
      IpAddress:(this.locationdata)?this.locationdata.ip:' ',
      pageWidth:$(".page:first").width(),
      pageHeight: $(".page:first").height()
    }
      console.log(this.latestrecord)
       if(this.latestrecord)
      {
        this.latestrecord.updatedAt = moment().format()
        await this.generalservice.updatetime(this.latestrecord, this.endtime).subscribe(data => {
          console.log(data)
          // this.auditlogsResult = data
        });
      }
    if(oRect.height <= 100)
    {
      this.documentService.savemousemovement(mousedata).subscribe(data => {
        this.latestrecord = data
        // console.log(this.latestrecord)
      });
    }
  
    this.coordinatex = top
    this.coordinatey = oRect.left - offestLeft
    this.coordinatewidth = oRect.width;
    this.coordinatehight = oRect.height;
    this.activeComment = [];
    if (selection.toString().length > 0) {
      if (this.sharedRecord.comment) {
        if(oRect.height <= 100)
        this.activeComment.push({ top: top - 2, docwidth: docwidth, left: oRect.left - offestLeft, selectText: 'selection.toString()', comment: '', active: true, height: oRect.height, width: oRect.width, commentbtn: false })
        else
        this.documentService.openSnackBar("comments are not allowed for this text", "X");
      }
    }
  } 

  openModel = function (id, field) {
    this.req = false
    this.selectimg = null
    this.added = null
    this.countrylist = []
    this.showlist = false
    // this.tabactive = 'tab1'
    if (this.sharedRecord.view || this.finished || (field.restrict && field.restrict == 'readonly')) return true;
    if (this.profiledata.name)
      this.preview = this.userservice.decryptData(this.profiledata.name)
    if (id == 'signatureModalBtn') {
      // setTimeout(() => {
        // this.divsigpadWidth = $("#signaturrepadwidth").width();
        // console.log(this.divsigpadWidth)
      // }, 1000);
      if (this.SignatureList.length > 0) this.tabactive = 'tab1'
      else this.tabactive = 'tab3'
    }
    else if (id == 'photoModalBtn') {
      if (this.PhotoList.length > 0) this.tabactive = 'tab1';
      else this.tabactive = 'tab5'
    }
    else if (id == 'stampModalBtn') {
      if (this.StampList.length > 0) this.tabactive = 'tab1';
      else this.tabactive = 'tab2'
    }
    else if (id == 'initialModalBtn') {
      // setTimeout(() => {
      //   this.divintpadWidth=$("#initialpadwidth").width();
      // }, 1000);
      // console.log(this.divintpadWidth)

      if (this.initialList.length > 0) this.tabactive = 'tab1';
      else this.tabactive = 'tab3'
    }
    if (!field.people || field.people == this.sharedRecord.toemail) {
      this.editF = field
      document.getElementById(id).click();
      if ((this.SignatureList.length == 0 && id == 'signatureModalBtn') || (this.initialList.length == 0 && id == 'initialModalBtn')) {
        setTimeout(() => {
          this.signature()
        }, 1000);
      }
    }
  }

  signatureValidation: any
  showImage(data) {
    if (this.signatureValidation && this.signatureValidation.length > 0) this.signatureImage = data;
    // this.signatureImage = data;
    this.type = "signaturepad"
  }

  signature() {
    window.dispatchEvent(new Event('resize'));
  }

  // sendImage(data) {
  // this.signatureImage = data;
  // }

  signtype: any
  onFileSelected(fileInput: any, title: any, signtype) {
    this.imageFile = fileInput
    console.log(this.imageFile)
    if (title == "signature") {
      this.type = "fileupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      console.log(this.filesToUpload)
      this.signtype = signtype
    }
    else if (title == "photo") {
      this.type = "photoupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      console.log(this.filesToUpload[0])
    }
    else if (title == "stamp") {
      this.type = "stampupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.cropimageData = event
    this.croppedImage = event.base64;
  }

  selectFont(font, preview) {
    console.log(font + "$$$$$$$" + preview);
    this.fonttype = preview;
    this.fontstyle = font;
    this.type = "font"
  }

  selectedTab(e) {
    //console.log(e)
  }

  mobileNumberValidation(form, fromsendlink) {
    this.req = false
    if (!fromsendlink) this.resend = false
    if (form.value.enteredvalue != null && this.added != null) {
      var phnnumber = this.added + String(form.value.enteredvalue)
      var number = form.value.enteredvalue.toString()
      if (number.length > 4) {
        var c = phoneUtil.parse(phnnumber);//It should works and give you some output
        var isValid = phoneUtil.isValidNumber(c); // returns true
        console.log(isValid)
        // this.req = !isValid
        if (isValid) return phnnumber
        else return false
      }
      else return false
    }
    else return false
  }

  resend = false
  sendLink = function (uploadlinkForm, valid, type) {
    if(!this.locationdata)this.locationdata=JSON.parse(localStorage.getItem('myip'));
    this.req = false
    if (this.added != null && uploadlinkForm.value.enteredvalue) {
      var val = this.mobileNumberValidation(uploadlinkForm, true)
      this.req = val ? false : true
      if (valid == true && val) {
        uploadlinkForm.value.phNumber = val
        uploadlinkForm.value.type = type;
        uploadlinkForm.value.documentid = this.sharedRecord.fileid._id;
        uploadlinkForm.value.fieldid = this.editF.id;
        uploadlinkForm.value.uid = this.profiledata.id;
        uploadlinkForm.value.email = this.profiledata.email;
        uploadlinkForm.value.fromIP=(this.locationdata)?this.locationdata.ip:' '
        if (this.editF.authentication) uploadlinkForm.value.authentication = this.editF.authentication;
        this.documentService.sendingLink(uploadlinkForm.value).subscribe(data => {
          // uploadlinkForm.resetForm()
          this.resend = true
          this.documentService.openSnackBar("Link Sent Successfully", "X")
        })
      }
      else {
        this.documentService.openSnackBar("Enter Valid Mobile Number", "X")
      }
    } else {
      this.documentService.openSnackBar("Choose Country and Enter Valid Mobile Number", "X")
    }
  }

  save(preview) {
    //console.log(preview);
    this.fontvalue = preview;
  }

  editField(item: any, index: number) {
    console.log(item)
    if(item.type &&  item.restrict != 'readonly' && !item.insertedemail && (!item.people || item.people == this.sharedRecord.toemail))
    {
    $("#" + item.id+ "-input").attr("tabindex", 1).focus();
    
      $("#" + item.id+ "-input").addClass("focuscolor");
      
    }
    this.editF = item;
    // this.editF.latitude = this.latitude;
    // this.editF.longitude = this.longitude;
  }
//field highlight on focusing
focusfield(item)
{
  console.log(item.type ,  item.restrict != 'readonly' , !item.insertedemail , !item.people ,item.people , item.people == this.sharedRecord.toemail)
  if(item.type &&  item.restrict != 'readonly' && !item.insertedemail && (!item.people || item.people == this.sharedRecord.toemail))
    {
    $("#" + item.id+ "-input").attr("tabindex", 1).focus();
    
      $("#" + item.id+ "-input").addClass("focuscolor");
    }
}
  getAllDocVersions = function (id) {
    this.documentService.getAllDocVersions(id).subscribe(allDocVersions => {
      this.allDocVersionsResult = allDocVersions
    })
  };


  LogsList = []
  // Creating of Document logs
  savedocLogs(fileid, fielddata, message) {
    if(!this.locationdata)this.locationdata=JSON.parse(localStorage.getItem('myip'));
    // this.latitude = this.latitude ? this.latitude : (this.locationdata)? this.locationdata.latitude: undefined;
    // this.longitude = this.longitude ? this.longitude : (this.locationdata)? this.locationdata.longitude: undefined;
    console.log(message == 'Closed' || message == 'Submited')
    if (message == 'Closed' || message == 'Submited') {
      console.log("ppppppppppppppppppppppppppp", message, this.sharedRecord)
      let sigdata = {
        latitude: this.latitude,
        longitude: this.longitude,
        message: message,
        documentid: this.sharedRecord.fileid._id,
        uid: this.sharedRecord.toid,
        email: this.sharedRecord.fromid.email,
        toemail: this.sharedRecord.toemail,
        Opened_at: localStorage.getItem('CreatedAt'),
        endTime: moment().format("YYYY-MM-DDTHH:mm:ss"),
        IpAddress:(this.locationdata)?this.locationdata.ip:' ',
        sharedid:this.sharedid
      };

      this.documentService.createfieldlogs(sigdata).subscribe(data => { })
    }
    else {

      var signdata = {
        signatureId: message == 'Signature' || message == 'Initial' ? fielddata._id : undefined,
        photoId: message == 'Photo' ? fielddata._id : undefined,
        stampId: message == 'Stamp' ? fielddata._id : undefined,
        uid: this.sharedRecord.toid,
        email: this.sharedRecord.fromid.email,
        toemail: this.sharedRecord.toemail,
        latitude: this.latitude,
        longitude: this.longitude,
        documentid: this.sharedRecord.fileid._id,
        path: fielddata.pemFilePath,
        message: message,
        created_at :fielddata.created_at,
        IpAddress:(this.locationdata)?this.locationdata.ip:' ',
        fieldId: fielddata.fieldId,
        sharedid:this.sharedid
      };
      console.log(signdata)
      let isLogInserted = false
      this.LogsList.forEach((log,index) => {
        if(log.fieldId==signdata.fieldId){
          console.log(signdata)
          log=signdata
          this.LogsList[index] = signdata
          isLogInserted=true
        }
      })
      if(!isLogInserted) this.LogsList.push(signdata)


      // this.documentService.createfieldlogs(signdata).subscribe(data => {
      //   console.log(data);
      // })
    }
  }


  signatureSubmit = function (title) {
    if (this.type == "signaturepad" && this.cropimageData && this.croppedImage) {
      this.isloading = true;
      if (title == 'signature') document.getElementById("signatureModalBtn").click();
      else if (title == 'initial') document.getElementById("initialModalBtn").click();
      var signatureData = { signdata: this.cropimageData, type: "signaturepad", signtype: title, uid: this.sharedRecord.toid ? this.sharedRecord.toid._id : null, email: this.sharedRecord.toemail ? this.sharedRecord.toemail : null }
      this.documentService.saveSignatureimages(signatureData).subscribe(data => {
        console.log(data)
        if (data)
          this.isloading = false;
          data.fieldId = this.editF.id
        if (title == 'signature') {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Signature')
        } else {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Initial')
        }
        if (data) {
          this.editF.signatureId = data._id;
          this.editF.signaturebaseData = data.signaturebaseData
          this.editF.signatureType = data.type
          this.signatureImage = {}
          this.editF.created_at=data.created_at
          this.editF.latitude = this.latitude
          this.editF.longitude = this.longitude
          // if (this.editF.required && !this.editF.valueDecr) {
          //   this.requiredFieldsCounts--;
          //   this.editF.valueDecr = true
          // }
          this.spliceRequitedField(this.editF)
          // alert(data.signtype)
          // if (data.signtype == 'signature') document.getElementById("signatureModalCloseBtn").click();
          // else if (data.signtype == 'initial') document.getElementById("initialModal").click();
          if (this.signtype == 'signature') $("#uploadCaptureInputFileSignature").val('');
          if (this.signtype == 'initial') $("#uploadCaptureInputFileInitial").val('');
          this.type = null;
          this.signatureImage = null;
          this.cropimageData = null;
          this.signatureValidation = null;
        }
      })
    }
    else if (this.type == "fileupload" && this.imageFile) {
      this.isloading = true;
      if (title == 'signature') document.getElementById("signatureModalBtn").click();
      else if (title == 'initial') document.getElementById("initialModalBtn").click();
      this.cropimageData.file.name = this.filesToUpload[0].name
      this.filesToUpload = this.cropimageData;
      const formData: any = new FormData();
      const files = this.filesToUpload;
      console.log(this.filesToUpload)
      this.cropimageData.file.name='signature.png'
      formData.append("uploads", this.filesToUpload.file, this.cropimageData.file.name);
      formData.append("type", "fileupload")
      formData.append("email", this.sharedRecord.toemail)
      if (this.sharedRecord.toid) formData.append("uid", this.sharedRecord.toid._id)
      formData.append("signtype", this.signtype)
      console.log(formData)
      this.documentService.saveSignatureimages(formData).subscribe(data => {
        console.log(data)
        if (data)
          this.isloading = false;
          data.fieldId = this.editF.id
        if (title == 'signature') {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Signature')
        } else {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Initial')
        }
        this.imageFile = null
        this.croppedImage = null
        console.log(data)
        if (data) {
          this.editF.signatureId = data._id
          this.editF.path = data.path
          this.editF.size = data.size
          this.editF.signatureType = data.type
          this.editF.name = data.name
          this.editF.encryptedid = data.encryptedid
          this.editF.created_at=data.created_at
          this.editF.latitude = this.latitude
          this.editF.longitude = this.longitude
          // if (this.editF.required && !this.editF.valueDecr) {
          //   this.requiredFieldsCounts--;
          //   this.editF.valueDecr = true
          // }
          this.spliceRequitedField(this.editF)
          $("#uploadCaptureInputFile").val('');
          // if (data.signtype == 'signature') document.getElementById("signatureModalBtn").click();
          // else if (data.signtype == 'initial') document.getElementById("initialModal").click();
          this.type = null;
          this.imagedata = null
        }
      });
    }
    else if (this.type == "font" && this.fonttype && this.fontstyle) {
      console.log(this.fontstyle)
      this.isloading = true;
      var fontSignatureData = { fonttype: this.fonttype, fontstyle: this.fontstyle, type: "font", signtype: title, uid: this.sharedRecord.toid ? this.sharedRecord.toid._id : null, email: this.sharedRecord.toemail ? this.sharedRecord.toemail : null }
      if (this.isloading) {
        if (title == 'signature')
          document.getElementById("signatureModalBtn").click();
        else if (title == 'initial')
          document.getElementById("initialModalBtn").click();
      }
      this.documentService.saveSignatureimages(fontSignatureData).subscribe(data => {
        console.log(data)
        this.isloading = false;
        data.fieldId = this.editF.id
        if (title == 'signature') {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Signature')
        } else {
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Initial')
        }
        if (data) {
          this.editF.signatureId = data._id
          this.editF.fontStyle = data.fontStyle
          this.editF.fontText = data.fontText
          this.editF.signatureType = data.type
          this.editF.created_at=data.created_at
          this.editF.latitude = this.latitude
          this.editF.longitude = this.longitude
          this.spliceRequitedField(this.editF)
          $("#uploadCaptureInputFile").val('');
          // if (data.signtype == 'signature')
          //   document.getElementById("centralModallg").click();
          // else if (data.signtype == 'initial')
          //   document.getElementById("initialModal").click();
          this.type = null;
          this.preview = this.fonttype = this.fontstyle = null;
        }
      })
    }
    else this.documentService.openSnackBar("Select/Draw/Type/Choose " + title, 'X')
  }

  photoSubmit = function () {
    if (this.cropimageData && (this.webcamImage || this.filesToUpload[0])) {
      var files = []
      if (this.type == "photoupload") {
        this.isloading = true
        document.getElementById("photoModalBtn").click();
        files.push(this.filesToUpload[0]);
      }
      else {
        // this.isloading = true
        var blob = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
        // var fd = new FormData(document.forms[0]);
        // fd.append("canvasImage", blob,'photo.png');
        // fd.append( "type", "captured");
        files.push(blob);
        this.isloading = true
        document.getElementById("photoModalBtn").click();
      }
      files.push(this.cropimageData.file)
      const formData: any = new FormData();
      console.log(files)
      this.spliceRequitedField(this.editF)
      files.forEach(element => {
        formData.append("uploads", element, element.name ? element.name : 'photo.png');
      })
      formData.append("type", this.type ? this.type : "captured")
      formData.append("authentication", this.editF.authentication == true ? true : false)
      formData.append("email", this.sharedRecord.toemail)
      if (this.sharedRecord.toid && this.sharedRecord.toid._id) formData.append("uid", this.sharedRecord.toid._id)
      console.log(formData)
      this.documentService.savePhotoimages(formData).subscribe(data => {
        console.log(data)
        this.isloading = false
        this.savedPhoto = null
        if (data._id && data.authentication) {
          this.savedPhoto = data
          let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'aiauthenticate' }, disableClose: true, width: '500px', panelClass: "deletemod" });
          dialogRef.afterClosed().subscribe( res => {
            if(res){
          this.authenticateFun(data._id)
            }
          })
        }
        else if (data._id && !data.authentication) {
          this.savedPhoto = data
          this.setPhoto('submit')
        }
        else if (data.message)
          this.documentService.openSnackBar('Choose other photo', "X")
      }, error => {
        this.documentService.openSnackBar(error, "X")
        console.log(error)
      })
    }
  }


  stampSubmit = function () {
    if (this.type == "stampupload") {
      document.getElementById("stampModalBtn").click();
      this.isloading = true
      console.log(this.cropimageData)
      this.cropimageData.file.name = this.filesToUpload[0].name
      this.filesToUpload = this.cropimageData;
      const formData: any = new FormData();
      const files = this.filesToUpload;
      console.log(this.filesToUpload)
      this.cropimageData.file.name='stamp.png'
      formData.append("uploads", this.filesToUpload.file, this.cropimageData.file.name);
      formData.append("type", "stampupload")
      formData.append("email", this.sharedRecord.toemail)
      if (this.sharedRecord.toid) formData.append("uid", this.sharedRecord.toid._id)
      this.documentService.saveStampimages(formData).subscribe(data => {
        if (data){
          data.fieldId = this.editF.id
          this.savedocLogs(this.sharedRecord.fileid._id, data, 'Stamp')
        }
        this.imageFile = null
        this.croppedImage = null
        //console.log(data)
        this.imagedata = data
        if (data) {
          this.editF.stampId = data._id
          this.editF.path = data.path
          this.editF.size = data.size
          this.editF.name = data.name
          this.editF.encryptedid = data.encryptedid
          this.editF.stampType = data.type
          this.editF.created_at=data.created_at
          this.editF.latitude = this.latitude
          this.editF.longitude = this.longitude
          this.spliceRequitedField(this.editF)
          $("#uploadCaptureInputFileStamp").val('');
          this.isloading = false
        }
      });
    }
    else this.documentService.openSnackBar("Select/Choose Stamp", 'X')
    this.type = null;
    this.imagedata = null
  }

  Getonlineusers(documentid) {
    this.generalservice.GetonlineUsers(documentid).subscribe((data:any) => {
      this.onlineusers = data
      console.log(this.onlineusers)
    })
  }

  ngOnDestroy() {
    console.log(this.pageInfo)
    clearInterval(this.Interval);
    clearInterval(this.pageinterval);
    if(this.auditlogsResult) this.auditlogs = this.auditlogsResult
    if( this.pageInfo.length > 0)
    this.auditlogs.pageInfo=this.pageInfo
    if(this.IframePrint !==  '') this.IframePrint.parentNode.removeChild(this.IframePrint); // Iframe print for closing the print popup while clicking the back button
    if (this.stream) this.stopRecording()
    if (this.onlinedata) this.generalservice.offline(this.onlinedata).subscribe(data => { })
    if (this.auditlogs) this.generalservice.updatetime(this.auditlogs, this.endtime).subscribe(data => {
      console.log(data)
      this.auditlogsResult = data
      console.log( this.auditlogsResult)
    });
    if(this.latestrecord)
    {
      this.latestrecord.updatedAt = moment().format()
       this.generalservice.updatetime(this.latestrecord, this.endtime).subscribe(data => {
        console.log(data)
        // this.auditlogsResult = data
      });
    }
    if (this.profiledata && this.profiledata.email) {
      if (!this.finished && !this.sharedRecord.view) {
        var result: any
        result = {
          toid: this.sharedRecord.fromid,
          documentid: this.sharedRecord.fileid._id,
          sharingPeopleId: this.sharedRecord._id,
          fromemail: this.sharedRecord.toemail,
          type: 'closed'
        }
        if (this.sharedRecord.toid && this.sharedRecord.toid._id) {
          result.fromid = this.sharedRecord.toid._id;
        }
        console.log(result)
        this.generalservice.createnotification(result).subscribe(response => {
          console.log(response);
          this.savedocLogs(this.sharedRecord.fileid._id, '', 'Closed')
        });
      }
    }
    this.socketDisconnect();
    clearInterval(this.clearintervaldata);
  }

  opening(val) {
    if (this.sharedRecord.toid._id == val.uid._id) {
      this.reply = false
    }
    if (this.sharedRecord.toid._id != val.uid._id) {
      this.reply = true
    }
  }

  editcomment(val) {
    if (val.value.comment && val.value.comment.length)
      this.documentService.editcomments(val.value).subscribe(data => {
        this.editlabel = false
        this.edit = true
      })
  }

  deletecomment(val, title) {
    if (title == 'resolve')
      val.resolve = true
    else if (title == 'delete')
      val.ok = true
    this.documentService.deletecomments(val._id, title).subscribe(data => {
      // val.resolve=false
      // val.ok=false
    })
  }

  cancel() {
    this.comment = null
    this.editlabel = false
    this.edit = true
  }

  comment1(val) {
    this.edit = false
    this.editlabel = true
    this.comment = val.comment
    this.documentid = val._id
  }

  showScroll: boolean;
  showScrollHeight = 300;
  hideScrollHeight = 10;

  scrollToTop() {
    this.bodyscroll.nativeElement.scrollTop = 0;
  }

  scrollToBottom() {
    console.log("gggdgg")
    this.bodyscroll.nativeElement.scrollTop = this.bodyscroll.nativeElement.scrollHeight;
  }

  // replycomment(val) {
  // //console.log(val)
  // //console.log(val._id)
  // //console.log("sfsgf")
  // //console.log(this.sharedRecord.toid._id)
  // const filedialog = this.dialog.open(CommentdialogComponent, {
  // data: {
  // data: 'reply',
  // data1: val.documentid,
  // data2: val.commentedlines,
  // data3: val.coordinatex,
  // data4: val.coordinatey,
  // data5: val._id,
  // data6: this.sharedRecord.toid._id
  // },
  // width: '500px',
  // disableClose: true,
  // autoFocus: true,
  // });
  // filedialog.afterClosed().subscribe(result => {
  // //console.log(result)
  // });
  // }

  commentid
  openSpecificComment(data) {
    this.comment = null
    this.commentid = data._id
    data.showComment = !data.showComment
  }

  commentbtn = false
  formSubmitted = false
  postcommentData: any
  comment
  coordinatewidth
  coordinatehight

  commentfield(data) {
    data.commentbtn = !data.commentbtn
  }

  commetClose(data) {
    data.commentbtn = false
  }

  selectorid: any
  replycomment(data) {
    //console.log(data)
    this.selectorid = data._id
    // this.editlabel = false
    //console.log(this.replycommentfield)
  }

  replyData: any
  replycommentdata(val, commentForm) {
    this.formSubmitted = true
    if (commentForm.value.replyField && commentForm.value.replyField.length) {
      if (this.loggedIn == 'true') val.name = this.profiledata.name
      else {
        var nameArray = this.sharedRecord.toemail.split('@')
        val.name = nameArray[0]
      }
      this.replyData = {
        documentid: val.documentid,
        commentedlines: val.commentedlines,
        coordinatex: val.coordinatex,
        coordinatey: val.coordinatey,
        parentcommentid: val._id,
        comment: commentForm.value.replyField,
        uid: this.sharedRecord.toid,
        email: this.sharedRecord.toemail,
        name: val.name
      }
      this.documentService.replycomments(this.replyData).subscribe(data => {
        this.formSubmitted = false
        commentForm.resetForm();
      })
    }
  }

  auditlog(uid) {
    var mousedata: any;
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    mousedata = {
      message: 'Viewed',
      documentid: this.sharedRecord.fileid,
      isFile: true,
      latitude: this.latitude,
      longitude: this.longitude,
      Address: this.Address,
      email: this.sharedRecord.toemail,
      toemail: this.sharedRecord.toemail,
      IpAddress:(this.locationdata)?this.locationdata.ip:' ',
      sharedid:this.sharedid
    }
    if (this.sharedRecord.toid && this.sharedRecord.toid._id) mousedata.uid = this.sharedRecord.toid._id
    this.documentService.savemousemovement(mousedata).subscribe(data => {
      this.auditlogs = data
      console.log(this.auditlogs)
      localStorage.setItem('CreatedAt', this.auditlogs.created_at);
    });
  }

  pencolor = '#000000'
  isOpenPad = true
  SignaturePadcolor
  colorcodefun(x) {
    this.pencolor = x
    this.isOpenPad = false;
    this.croppedImage = null
    this.cropimageData = null
    this.signatureValidation = null
    this.signatureImage = null
    setTimeout(() => {
      this.isOpenPad = true;
    }, 100);
    this.signature()
  }

  clearsign() {
    //  alert("cleared")
    this.signatureImage = null;
    this.cropimageData = null;
    this.croppedImage = null;
    this.signatureValidation = false
  }

  isDisabled2(): boolean {
    return true;
  }

  opendependencypopup = false
  // Check for depadancy for document or field
  dependencyCheck(DocFields) {
    this.isloading = true
    this.opendependencypopup = false
    if (DocFields.length) {
      
      var insertedFields=DocFields.filter(field => field.insertedemail)
      var dependencyFields=DocFields.filter(field => field.people==this.sharedRecord.toemail && field.dependency)
      var myFields=DocFields.filter(field => field.people==this.sharedRecord.toemail)
      var showedDependencyFields

      if(dependencyFields.length){
          insertedFields.forEach(insField => {
            dependencyFields = dependencyFields.filter(depField => !(depField.dependency == insField.insertedemail))
          });
          console.log(dependencyFields)
          if(dependencyFields.length){
            
            dependencyFields.forEach(depField => {
              DocFields.forEach(field => {
                if(depField.id==field.id){
                  field.class = 'disableDiv'
                  $( $("#" + field.id).prop('title','This field has a dependency with '+ field.dependency+'!'))
                }
              }); 
            });            
            this.isloading = false

            showedDependencyFields = dependencyFields.filter(depField => depField.dependencytype=='View Access')
            if(showedDependencyFields.length && !this.opendependencypopup){
              this.opendependencypopup = true
              this.documentdependency = false
              this.DependencyPopup(showedDependencyFields)
            }
          }
          else{
            console.log(dependencyFields)
          }
      }
      else{
        console.log(dependencyFields)
      }
    }
    this.isloading = false
  }

  DependencyPopup(fields) {
    console.log(fields)
    if(fields.length){
      let content = ''
      fields.forEach((field,index) => {
        content = content + field.dependency
        if(fields.length-1 > index) content = content + ', '
      });
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { title: 'dependency', name: 'dependency', content: 'This document has dependency! You cannot access the document until  provide the '+ content +' submit the document.' }, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        if (res) {
          // this.router.navigate(['/home/shareddocument'])
          this.Locations.back();
        }
      })
    }
  }


  updateFromMobile(newContent) {
    if (this.sharedRecord.fileid._id == newContent.documentid) {
      if ((newContent.type == 'signature' || newContent.type == 'initial') && newContent.signatureId && newContent.signaturebaseData && newContent.signatureType) {
        if (newContent.type == 'signature') document.getElementById("signatureModalCloseBtn").click();
        else if (newContent.type == 'initial') document.getElementById("initialModalCloseBtn").click();
        this.fields.forEach(field => {
          if (field.id != newContent.fieldid) return;
          field.req = false
          this.spliceRequitedField(field)
          let date = new Date()          
          if(newContent.signatureId) field.signatureId = newContent.signatureId;
          if(newContent.signaturebaseData) field.signaturebaseData = newContent.signaturebaseData;
          if(newContent.signatureType) field.signatureType = newContent.signatureType;
          if(newContent.path) field.path = newContent.path
          if(newContent.size) field.size = newContent.size
          if(newContent.name) field.name = newContent.name
          if(newContent.encryptedid) field.encryptedid = newContent.encryptedid
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          let logFieldData={
            created_at: date,
            fieldId: field.id,
            pemFilePath: newContent.pemFilePath,
            _id: newContent.signatureId
          }
          if(newContent.type == 'signature')
            this.savedocLogs(this.sharedRecord.fileid._id, logFieldData, 'Signature')
          else if(newContent.type == 'initial')
            this.savedocLogs(this.sharedRecord.fileid._id, logFieldData, 'Initial')
        })
      }
      else if (newContent.type == 'photo' && newContent.photoId && newContent.photoType) {
        document.getElementById("photoModalCloseBtn").click();
        this.fields.forEach(field => {
          if (field.id != newContent.fieldid) return;
          field.req = false
          this.spliceRequitedField(field)
          let date = new Date()         
          if(newContent.photoId) field.photoId = newContent.photoId;
          if(newContent.photoType) field.photoType = newContent.photoType;
          if(newContent.photobaseData) field.photobaseData = newContent.photobaseData;
          if(newContent.path) field.path = newContent.path
          if(newContent.size) field.size = newContent.size
          if(newContent.name) field.name = newContent.name
          if(newContent.encryptedid) field.encryptedid = newContent.encryptedid
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          let logFieldData={
            created_at: date,
            fieldId: field.id,
            pemFilePath: newContent.pemFilePath,
            _id: newContent.photoId
          }         
          this.savedocLogs(this.sharedRecord.fileid._id, logFieldData, 'Photo')
        })
      }
      else if (newContent.type == 'stamp' && newContent.stampId && newContent.stampType) {
        document.getElementById("stampModalCloseBtn").click();
        this.fields.forEach(field => {
          field.req = false
          this.spliceRequitedField(field)
          let date = new Date()          
          if (field.id != newContent.fieldid) return;
          if(newContent.stampId) field.stampId = newContent.stampId;
          if(newContent.stampType) field.stampType = newContent.stampType;
          if(newContent.path) field.path = newContent.path
          if(newContent.size) field.size = newContent.size
          if(newContent.name) field.name = newContent.name
          if(newContent.encryptedid) field.encryptedid = newContent.encryptedid
          field.latitude = this.latitude
          field.longitude = this.longitude
          field.created_at = date
          let logFieldData={
            created_at: date,
            fieldId: field.id,
            pemFilePath: newContent.pemFilePath,
            _id: newContent.stampId
          }        
          this.savedocLogs(this.sharedRecord.fileid._id, logFieldData, 'Stamp')
        })
      }
    }
  }

  updateFieldCss(field) {
    if (field.type == 'date' && field.timepicker) {
      field.settings.timePicker = true
    }
    for (let prop in field) {
      if (prop.substring(0, 4) == 'css-') {
        if (prop.substring(4) == 'transform') {
          $("#" + field.id).css(prop.substring(4), "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('msTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('MozTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('OTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css(prop.substring(4), "rotate(" + field[prop] + "deg)");
        }
        else if (field[prop] != false) $("#" + field.id + '-input').css(prop.substring(4), field[prop]);
        else $("#" + field.id + '-input').css(prop.substring(4), '');
      }
    }
    // if(this.documentRecord.waterMark) this.loadWaterMark()
    if (this.documentRecord.waterMark) {
      this.waterMark = this.documentRecord.waterMark;
      setTimeout(() => {
        this.loadWaterMark();
      }, 1000);
    }
    this.ResetFieldFonts(field);
  }

  /// Lable Field Settings //
  lableKeyUp(event, field) {
    if (field.type == 'label') {
      // div.css('font-size', (fontsizeInvh+fontsizeInvw) + 'vmin');
      $('#' + field.id + '-input').css('font-size', field['css-font-size']);
      // field['css-font-size']=fontsize;
      field.value = event.target.textContent;
    }
    else {
      var fontsize = $('#' + field.id + '-input').css('font-size');
      if (event.target.value.length > 30) field.width = event.target.value.length * fontsize.substring(0, fontsize.length - 2) / 2;
      field.value = event.target.value;
    }
  }

  // Video Recording
  ngAfterViewInit() {
    // set the initial state of the video
    if (this.video) {
      let video: HTMLVideoElement = this.video.nativeElement;
      video.muted = false;
      video.controls = true;
      video.autoplay = false;
    }
  }

  startRecording() {
    if(navigator.mediaDevices) navigator.mediaDevices.getUserMedia(this.mediaConstraints).then(this.successCallback.bind(this), this.errorCallback.bind(this));
    else this.errorCallback({name:'Mediainterface does not support'})
  }

  errorCallback(error) {
    this.videorecordChecking = false
    let str = String(error)
    let err
     if (str.includes('Requested device not found') || error.name.includes('NotFoundError')  || error.message.includes('Invalid constraint')) err = 'Camera not found'
     else if (str.includes('Permission dismissed')) err = 'Camera Permission dismissed'
     else if (str.includes('Permission denied') || error.name.includes('NotAllowedError' || error.message.includes('The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.')) || error.name.includes('PermissionDeniedError')) err = 'Camera Permission denied'
     else if (str.includes('Could not start video source') || error.name.includes('AbortError')) err = 'Already camera running for other purpose'
     else if (error.name.includes('Mediainterface does not support') || !navigator.mediaDevices) err = "Your browser doesn't support MediaInterface to acces webcam"
     else err = error.message | error.name  
     this.showWebcam = false;
     this.isloading=false   
     let dialogRef22 = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: err  }, width: '500px', panelClass: "deletemod" ,disableClose:true});
    dialogRef22.afterClosed().subscribe(res => {
      console.log(res)
      if(res)
      {
        dialogRef22.close();
      this.startRecording()
      }
      else
      this.Locations.back();
    });
    
    // this.documentService.openSnackBar(err,"X")
  }
  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    // let video: HTMLVideoElement = this.video.nativeElement;
    //console.log(window);
    //video.src = this.createObjectURL(stream);
    this.toggleControls();
    this.videorecordChecking = true
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    //console.log(recordRTC.getBlob())
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
    var formData = new FormData();
    formData.append('video[]', recordRTC.getBlob(), 'video.webm')
    if (this.sharedRecord) {
      formData.append('documentid', this.sharedRecord.fileid._id)
      formData.append('sharedid', this.sharedRecord._id)
      if (this.sharedRecord.toid) formData.append('uid', this.sharedRecord.toid._id)
      formData.append('email', this.sharedRecord.toemail)
    }
    this.documentService.uploadVideo(formData).subscribe(res => {
      console.log(res)
    })
  }

  download() {
    this.recordRTC.save('video.webm');
  }

  ///////////////////////////////////////////////
  // toggle webcam on/off
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  TakePicture() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    console.log(error)
    var err;
    if (error.message.includes('Requested device not found') || error.message.includes('The object can not be found here.') || error.message.includes('Invalid constraint')) err = 'Camera not found'
    else if (error.message.includes('Permission dismissed')) err = 'Camera Permission dismissed'
    else if (error.message.includes('Permission denied') || error.message.includes('The request is not allowed by the user agent or the platform in the current context.') || error.message.includes('The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.')) err = 'Camera Permission denied'
    else if (error.message.includes('Could not start video source') || error.message.includes('Starting video failed')) err = 'Already camera running for other purpose'
    else if (error.message.includes('Only secure origins are allowed')) err = 'Only secure origins are allowed the camera'
    else if (error.message.includes('Mediainterface does not support') || !navigator.mediaDevices) err = "Your browser doesn't support MediaInterface to acces webcam"
    else err = error.message
    this.showWebcam = false
    if (err) this.documentService.openActionSnackBar(err, 'X')
    this.errors = []
    this.errors.push(error);
    // console.log(this.errors)
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    // console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  //// Authentication
  authenticate: Boolean = false
  authIput
  camLoaderSuccess: Boolean = false
  camLoaderFail: Boolean = false
  authenticateFun = async function  (id) {
    navigator.mediaDevices.getUserMedia(this.mediaConstraints).then(this.authenticateCheck.bind(this,id), this.cameraErrorCallback.bind(this));
   }
   authenticateCheck(id)
   {
     this.authIput = id
     this.authenticate = true;
   }

   cameraErrorCallback(error) {
    console.log(error)
    let str = String(error)
    let err
    if (str.includes('Requested device not found') || error.name.includes('NotFoundError')  || error.message.includes('Invalid constraint')) err = 'Camera not found'
    else if (str.includes('Permission dismissed')) err = 'Camera Permission dismissed'
    else if (str.includes('Permission denied') || error.name.includes('NotAllowedError' || error.message.includes('The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.')) || error.name.includes('PermissionDeniedError')) err = 'Camera Permission denied'
    else if (str.includes('Could not start video source') || error.name.includes('AbortError')) err = 'Already camera running for other purpose'
    else if (error.name.includes('Mediainterface does not support') || !navigator.mediaDevices) err = "Your browser doesn't support MediaInterface to acces webcam"
    else err = error.message | error.name
    this.showWebcam = false
   //  else err =error
    let dialogRef22 = this.dialog.open(CommonDialogComponent,
      { data: { name: 'videorecord', cancel: false, content: err }, width: '500px', panelClass: "deletemod" ,disableClose:true});
    dialogRef22.afterClosed().subscribe(res1 => {
      // this.router.navigate(['//Sharereview/'+this.sharedid+'/'+this.fileid]);
    });
    // this.documentService.openSnackBar(err,"X")
  }
  modelClosing(event: any) {
    console.log(event.res)
    this.camLoaderSuccess = false;
    this.camLoaderFail = false;
    this.authenticate = false;
    if (event.res == 'success') {
      this.camLoaderSuccess = true;
      document.getElementById('modalOpenBtn').click();
    }
    else if (event.res == 'failed') {
      this.camLoaderFail = true;
      document.getElementById('modalOpenBtn').click();
    }
  }

  retry() {
    document.getElementById('modalClosBtn').click();
    this.camLoaderSuccess = false;
    this.camLoaderFail = false;
    this.authenticate = true;
  }

  closemsgmodal() {
    document.getElementById('modalClosBtn').click();
    this.camLoaderSuccess = false;
    this.camLoaderFail = false;
  }

  savedPhoto
  setPhoto(title) {
    var data = this.savedPhoto
    if (data && this.editF) {
      this.editF.req = false
      this.spliceRequitedField(this.editF)
    let date = new Date()
      if (data._id) this.editF.photoId = data._id
      if (data.type) this.editF.photoType = data.type
      if (data.path) this.editF.path = data.path
      if (data.size) this.editF.size = data.size
      if (data.name) this.editF.name = data.name
      if (data.encryptedid) this.editF.encryptedid = data.encryptedid
      if (data.photobaseData) this.editF.photobaseData = data.photobaseData
      this.editF.latitude = this.latitude
      this.editF.longitude = this.longitude
      this.editF.created_at = date
      data.created_at = date
      data.fieldId = this.editF.id          
      this.savedocLogs(this.sharedRecord.fileid._id, data, 'Photo')

      this.imageFile = null
      this.croppedImage = null
      this.type = null;
      this.imagedata = null
      $("#uploadCaptureInputFile").val('');
      document.getElementById("photoModalCloseBtn").click();
    }
  }

  savePhoto() {
    if (this.webcamImage) {
      var data = { photobaseData: this.webcamImage.imageAsDataUrl, type: "captured" }
      this.documentService.savePhotoimages(data).subscribe((data: any) => {
        //console.log(data);
        if (data && this.editF) {
          this.editF.photoId = data._id
          this.editF.photobaseData = data.photobaseData
          this.editF.photoType = data.type
          this.webcamImage = null;
          this.showWebcam = false;
          $("#uploadCaptureInputFile").val('');
          document.getElementById("photoModalCloseBtn").click();
        }
      });
    }
    else {
      this.documentService.openSnackBar("First Capture the photo", "X");
    }
  }


  logout() {
    this.cookieService.delete('token')
    let type = { type: "disconnect" }
    var sub = this.dataservice.Connectsocket(type)
      .subscribe(quote => { });
    this.adminService.logout();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  Cancel() {
    this.webcamImage = null;
  }

  tabOpen(title) {
    this.tabactive = title;
    this.croppedImage = this.imageFile = null;
    this.showlist = false
  }

  checkw(data) {
    console.log(data)
  }

  showpages = true
  showversion() {
    var vers = !this.versions;
    if (vers) {
      this.showpages = false;
      this.heatmaps = [];
    }
    else this.showpages = true;
  }

  closeversion() {
    this.versions = false
    this.showpages = true;
  }

  gotoPage(i) {
    console.log(this.PdfTop)
    var x = $("div.page:eq(" + (i - 1) + ")").position();
    $("#style-1").scrollTop(parseInt(x.top));
  }

  public cameraWasSwitched(deviceId: string): void {
    //console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  //Address from position
  public getAddressFromLatLng(query: string) {
    this.geocoder.reverseGeocode({ prox: query, mode: "retrieveAddress" }, result => {
      if (result.Response.View.length > 0) {
        if (result.Response.View[0].Result.length > 0) {
          var location = result.Response.View[0].Result[0].Location.Address
          this.Address = location.Label
          //console.log(this.Address)
        } else {
        }
      } else {
      }
    }, error => {
    })
  }

  //this function is for displaying pagenumber  and text feild arrow mark
  pageNo: any = 1;
  onPdfScroll(e) {
    var scroll = $("#style-1").scrollTop();
    var PDFheights = [];
    var h = 0;
    $("div.pdfViewer").find("div.page").each(function () {
      PDFheights.push({ start: h, end: h + $(this).height() })
      h = h + $(this).height();
    })
    var i = 0;
    PDFheights.forEach(page => {
      i++;
      if (page.start <= scroll && page.end >= scroll) this.pageNo = i++;
       });
    
    if (this.requiredFieldsCount.length > 0) {
      var fields = this.requiredFieldsCount.sort(function (a, b) { return a.top - b.top; });
      var height = 0;
      for (let i = 0; i < fields.length; i++) {
        if (!this.validfield(fields[i])) {
          height = fields[i].top + fields[i].height;
          break;
        }
      }
      var scroll = $("#style-1").scrollTop();
      var hei = Math.abs(height) + this.PdfTop + $("#docheader").height();
      if (height < $(window).height() / 2 && scroll < 50) {
        this.arrowClass = 'ArrowCenter'
        $(".upIndicator").css("top", Math.round(hei / ($(window).height() / 100)) + '%');
      }
      else {
        height -= ($("#style-1").height() / 2);
        $(".upIndicator").css("top", '50%');
        if (height - 50 > scroll) this.arrowClass = 'ArrowTop';
        else if (height - 50 <= scroll && height + 50 >= scroll) this.arrowClass = 'ArrowCenter';
        else if (height + 50 < scroll) this.arrowClass = 'ArrowDown';
      }
   
    }
  }

  showpage = false
  showsideimages() {
    if (!this.showpage) {
      this.showpage = true
    } else {
      this.showpage = false
    }
  }

  validfield(field) {
    if (field.restrict == 'required' && (!field.value || field.value == '')) return false;
    else if (field.restrict == 'required' && (field.value && (field.minlengtherror ||  !field.fieldvalidationCheck) )) return false;
    else if ((field.type == "signature" || field.type == "intial") && field.restrict == 'required' && (!field.signatureId || field.signatureId == '')) return false;
    else if (field.type == "text" && field.type == "email" && field.type == "photo" && field.type == "stamp" && field.restrict == 'required' && field.value != "") return true
    else return true;
  }

  arrowShow = true
  nextField() {
    console.log(this.requiredFieldsCount)
    var lisfields = this.requiredFieldsCount.filter(element => element.people && element.people == this.sharedRecord.toemail && !(element.value || element.insertedemail || element.signatureId || element.photoId || element.stampId))
    console.log(lisfields)
    console.log(this.requiredFieldsCount)
    console.log(this.requiredFieldsCount.some(x => x.minlengtherror || x.fieldvalidationCheck == false))
    if (this.requiredFieldsCount.some(x => x.minlengtherror || x.fieldvalidationCheck == false  )) {
      lisfields.push(this.requiredFieldsCount.find(element => (element.value && (element.minlengtherror || !element.fieldvalidationCheck))))
      console.log(lisfields)
    }
    var fields = lisfields.sort(function (a, b) {
      return a.top - b.top;
    });
    for (let i = 0; i < fields.length; i++) {
      if (!this.validfield(fields[i])) {
        if(fields[i].type && (fields[i].people == this.sharedRecord.toemail))
        $("#" + fields[i].id+ "-input").attr("tabindex", 1).focus();
        console.log("checkbox","#" + fields[i].id + "-input")
        $("#" + fields[i].id + "-input").addClass("focuscolor");
        break;
      }
    }
    this.onPdfScroll('e')
  }



  //heat maps 
  viewedcount = 0;
  selectedcount = 0
  name: any = [];
  heatmaps
  heatMaps = function () {
    var heatmap = !this.heatmapss;
    console.log(this.heatmapss, heatmap);
    if (heatmap) {
      this.heatmapLoading = true;
      this.ReviewMode = true;
      var doc = { _id: this.sharedRecord.fileid._id }
      this.selectedcount = 0; this.viewedcount = 0;
      this.documentService.getDocumentLogs(doc).subscribe(data => {
        this.heatmaps = data;
       
        this.heatmapLoading = false;
        if (this.sharedRecord.fileid._id) {
          console.log("hggggg")
          for (var i = 0; i < this.heatmaps.length; i++) {
            if (this.heatmaps[i].message == 'Viewed') {
              this.viewedcount += 1;
            }
            else if (this.heatmaps[i].message == 'selected') {
              this.heatmaps[i].top = this.heatmaps[i].coordinatex - 18;
              this.heatmaps[i].left = this.heatmaps[i].coordinatey;
              this.heatmaps[i].tooltipleft = (this.heatmaps[i].width / 2) - 75;
              // this.heatmaps[i].left = this.heatmaps[i].coordinatey - this.PdfLeft + this.PdfLeftNosideBar + this.heatmaps[i].width / 2 - 223;
              this.selectedcount += 1;
            }
          }
        }
      });
    }
    else this.heatmaps = [];
  }

  mouseentered(data) {
    this.selectedcount = 0, this.name = [];
    for (var i = 0; i < this.heatmaps.length; i++) {
      if (this.heatmaps[i].message == 'selected' && Math.round(this.heatmaps[i].coordinatex) == Math.round(data.coordinatex)
        && Math.round(this.heatmaps[i].coordinatey) >= Math.round(data.coordinatey) && Math.round(this.heatmaps[i].coordinatey) < Math.round(data.coordinatey + data.width)) {
        if (this.heatmaps[i].uid) this.name.push({ name: this.heatmaps[i].uid.name, date: this.heatmaps[i].created_at });
        else this.name.push({ name: this.heatmaps[i].email.split('@')[0], date: this.heatmaps[i].created_at });
        this.selectedcount += 1;
      }
    }
  }

  // pdfDownload() {
  //   this.documentService.pdfDownload(this.documentRecord)
  // }

  printpdfDoc() {
    this.isloading = true;
    this.documentService.pdfPrint(this.documentRecord).subscribe((data: any) => {
      console.log(data)
      this.isloading = false;
      // this.documentService.pdfPrint(this.selectedDoc)
      var xhr = new XMLHttpRequest()
      xhr.open("GET", data.path)
      xhr.responseType = 'blob'
      xhr.onload = () => {
        var blob = new Blob([xhr.response], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        this.IframePrint = iframe;
        iframe.contentWindow.print();
      }
      xhr.send()
    })
  }

  spliceRequitedField(field) {
    // console.log("spliceRequitedField")
    this.requiredFieldsCount.forEach((element, index) => {
      // console.log(element.id + "{}}{}{" + field.id)
      if (element.id == field.id) {
        // console.log(this.requiredFieldsCount, this.requiredFieldsCounts)
        this.requiredFieldsCount.splice(index, 1)
        this.requiredFieldsCounts = this.requiredFieldsCount.length;
        $("#" + field.id).removeAttr("tabindex");
        $("#" + field.id).removeClass("focuscolor");
        $("#" + field.id + "-input").addClass("label");
        $("#" + field.id + "-input").removeClass("drag-box-label");
        // console.log(this.requiredFieldsCount, this.requiredFieldsCounts)
      }
    });
  }

  validateemail(field) {
    if(!field.minlengtherror)
    {
      var pattern = field.pattern
      var index = this.fields.findIndex(x => x.id == field.id);
      if (field.value == '') {
        field.fieldvalidationCheck = true;
        if (field.restrict == 'required' && (!field.people || field.people == this.sharedRecord.toemail) && !this.requiredFieldsCount.some(x => x.id == field.id)) this.requiredFieldsCount.push(field);
        this.requiredFieldsCounts = this.requiredFieldsCount.length;
        // field.valueDecr = false
      }
      else if (field.value) {
        console.log(field.pattern);
        var regexp = new RegExp(pattern)
       field.fieldvalidationCheck = false;
      
        console.log(regexp.test(field.value))
        if (regexp.test(field.value)) {
          console.log(field, this.sharedRecord.toemail)
           field.fieldvalidationCheck = true;
          
          if (field.required && field.people == this.sharedRecord.toemail ) {
            console.log("validemail");
            var indx1 = this.requiredFieldsCount.findIndex(x => x.id == field.id);
            this.spliceRequitedField(field)
            // field.valueDecr = true
            $("#" + field.id).removeAttr("tabindex");
            $("#" + field.id).removeClass("focuscolor");
            $("#" + field.id + "-input").addClass("label");
            $("#" + field.id + "-input").removeClass("drag-box-label");
            
          }
          // this.fields[index].fieldvalidationCheck = true;
        }
        else {
          if (field.restrict == 'required' && (!field.people || field.people == this.sharedRecord.toemail) && !this.requiredFieldsCount.some(x => x.id == field.id)) this.requiredFieldsCount.push(field);
          this.requiredFieldsCounts = this.requiredFieldsCount.length;
          // field.valueDecr = false
        }
      }
    }
  
  }

  // Set Download options berore download  / opening the popup
  setDownload() {
    this.downloadType = 'computer'
    this.downloadFile = 'current'
    this.withlog = false;
    this.pdfPinSet = false;
    this.pdfPin = '';
    this.email = '';
  }

  // PdfGEt Pdf Download URL
  pdfDownload(token) {
    if (this.downloadFile == 'withoutchanges') this.withlog = undefined;
    var downloaddata = {
      id: this.documentRecord._id,
      name: this.documentRecord.name,
      downloadType: this.downloadType,
      downloadFile: this.downloadFile,
      withlog: this.withlog,
      pdfPinSet: this.pdfPinSet,
      pdfPin: this.pdfPin,
      access_token: '',
      scope: this.scope,
      token_type: '',
      expiry_date: '',
      email: this.email
    }
    if (token) {
      downloaddata.access_token = token.access_token;
      downloaddata.token_type = token.token_type;
      downloaddata.expiry_date = token.expires_at;
    }
    if (this.downloadType != 'attachment') {
      document.getElementById('savetempclose').click()
      this.isloading = true
      this.documentService.pdfDownload(downloaddata).subscribe((data: any) => {
        console.log(data)
        if (data.path && downloaddata.downloadType == "computer") {
          this.isloading = false
          var xhr = new XMLHttpRequest()
          xhr.open("GET", data.path)
          xhr.responseType = 'blob'
          xhr.onload = function () {
            saveAs(xhr.response, downloaddata.name);
          }
          xhr.send()
        }
        else if (downloaddata.downloadType == 'drive') {
          this.isloading = false
          if (!NgZone.isInAngularZone()) this._ngZone.run(() => {
            this.documentService.openSnackBar("File Export To Drive", "X");
          });
        }
        else this.isloading = false
      });
    }
    else if (this.downloadType == 'attachment') {
      if (this.email == null || this.email == '') {
        this.documentService.openSnackBar("Please Enter Email", "X");
      }
      else {
        var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
        if (regexp.test(this.email)) {
          document.getElementById('savetempclose').click()
          this.isloading = true
          this.documentService.pdfDownload(downloaddata).subscribe((data: any) => {
            console.log(data)
            if (downloaddata.email && downloaddata.downloadType == "attachment" && data.path) {
              this.isloading = false
              this.documentService.openSnackBar("File Sent To Email", "X");
            }
            else this.isloading = false
          });
        }
        else {
          this.documentService.openSnackBar("Please Enter Valid  Email", "X");
        }
      }
    }
  }

  showdropdown(event, title) {
    console.log(title)
    this.mobiledemo = !this.mobiledemo
    this.showlist = true
    this.listshow = false
    if (title == 'signature') {
      setTimeout(() => {
        $("#openmodel1").focus();
      }, 100);
    }
    if (title == 'initial') {
      setTimeout(() => {
        $("#openmodel2").focus();
      }, 100);
    }
    if (title == 'photo') {
      setTimeout(() => {
        $("#openmodel3").focus();
      }, 100);
    }
    if (title == 'stamp') {
      setTimeout(() => {
        $("#openmodel4").focus();
      }, 100);
    }
    event.stopPropagation();
  }

  showdropdownclose() {
    console.log(this.listshow)
    if (this.listshow) {
      this.showlist = false
      this.mobiledemo = false
    }
    else this.listshow = false
  }

  listshow1(event) {
    event.stopPropagation();
    this.listshow = true
    this.showlist = true
  }

  loadGoogleDrive() {
    gapi.load('auth', { 'callback': this.onAuthApiLoad.bind(this) });
  }

  //Gogole Drive Login
  onAuthApiLoad() {
    gapi.auth.authorize(
      {
        'client_id': this.clientId,
        'scope': this.scope,
        'immediate': false
      },
      this.handleAuthResult);
  }

  handleAuthResult = (authResult) => {
    console.log(authResult);
    if (authResult && authResult.access_token) this.pdfDownload(authResult)
  }

  ////////////////////////////////////////////////notification start///////////////////////////////////////////////////////////////////

  // getNotification() {
  //   this.generalservice.getnotification().subscribe((data: any) => {
  //     this.NotificationData = data;      
  //   })
  // }
  // gets all the notifcation of the user
  getOfflineNotification() {
    if ((this.sharedRecord.toid || this.sharedRecord.toemail)&& this.profiledata.email && this.loggedIn == 'true') {
      this.generalservice.getOfflinenotification().subscribe((data: any) => {
        this.notificationlogs = data
        console.log(this.notificationlogs)
        if (this.notificationlogs) this.Notificationscount = this.notificationlogs.filter(x => !x.read).length;
        else this.Notificationscount = 0;
        this.resultData = this.notificationlogs.find(x => x.created_at);
        if (this.resultData)
          this.notificationlogs.forEach(element => {
            element.created_at;
            element.fromEmail = (element.fromid && element.fromid.name) ? element.fromid.name : (element.fromemail).split('@')[0];
            // element.fromEmail = (element.fromemail).split('@')[0];
            element.diff = this.getDataDiff(new Date(element.created_at), new Date());
          });
      })
    }
  }

  // Get Time differnace for notifications
  getDataDiff(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return { day: days, hour: hours, minute: minutes, second: seconds };
  }

  // clears selected notification
  clearnotification(id) {
    id.active = false
    this.generalservice.markedread(id).subscribe(data => {
      this.getOfflineNotification()
    })
  }

  // clearing all the notification
  clearAllNotifications(data) {
    this.generalservice.clearAllNotifications(data).subscribe(data => {
      this.getOfflineNotification();
      this.notificationlogs = [];
    });
  }

  shownot() {
    // $("html").css("overflow-x", "hidden");
    this.shownoti = true
  }

  hidenot() {
    // $("html").css("overflow-x", "auto");
    this.shownoti = false
  }

  @HostListener('scroll')
  public asd(): void {
    this.shownoti = false
    console.log('scrolling');
  }

  enablenotificationlist: any
  //updates all unread notifications
  clearAllNotificationsactive(data) {
    if (this.enablenotificationlist) {
      this.enablenotificationlist = false
    }
    else { this.enablenotificationlist = true }
    if (this.Notificationscount) {
      this.Notificationscount = 0;
      var data1 = data.filter(x => !x.read);
      this.generalservice.clearAllNotificationsactive(data1).subscribe(data => {
        this.getOfflineNotification();
      });
    }
  }
  /////////////////////////////////////////////////notification end/////////////////////////////////////////////////////////////////
  //============================search countries=================================================
  searchcountry
  countrylist
  enteredvalue: any
  Searchcountries(searchcountry, e, id) {
    if (e.key != "ArrowDown") {
      if (e.key != "ArrowUp") {
        if (searchcountry.length > 0) this.userservice.getcountries({ searchcountry: searchcountry }).subscribe(data => {
          this.countrylist = data
        })
      }
    }
    if (e.key == "Enter") {
      this.addcountry(searchcountry, id);
    }
    if ((searchcountry.length == 0 && e.key == "Backspace") || (searchcountry.length == 0 && e.key == "Delete")) {
      this.added = null;
      this.selectimg = ''
    }
  }

  //==================================================================================================
  //=============================add country to field=================================================
  added: any
  selectimg: any
  addcountry(country, id) {
    this.req = false
    // document.getElementById(id).click()
    this.mobiledemo = false
    this.showlist = false
    this.added = null;
    setTimeout(() => {
      $("#" + id).focus();
      this.searchcountry = country.name;
      this.added = country.dial_code;
      this.selectimg = country.code
    }, 10);
  }

  checkisnum(event) {
    var number = event.srcElement.value.toString()
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39 || (event.ctrlKey == true && event.keyCode == 65)) { }
    else if (event.shiftKey == true && (key > 48 || key < 57)) event.preventDefault()
    else if ((key < 48 || key > 57) && (key < 96 || key > 105)) event.preventDefault()
    else if (number.length > 15) event.preventDefault()
  }

  displayFn(user): string | undefined {
    return user ? (user.name) : undefined;
  }

  confirmationdialog() {

    var sampledata=this.documentService.getStartUrl();
    if( sampledata &&  sampledata.split('/')[1]=='allowusers' )
    {if(this.loggedIn=='true'){
     this.router.navigate(['/home/myfiles'])
    }
    else {
      this.Locations.back();
    }
    }else {
      this.Locations.back();
    }
  }
  //===================================================================================================

// ============================================Change Password Start===============================================
  // check old passsword
  checkpassword(oldPassword) {
    this.samePassword = oldPassword;
    if (oldPassword != ''&& oldPassword!=undefined) {
      this.userservice.checkpassword(oldPassword).subscribe(data => {
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

  // check new password doesnot match to old password
  checkpassword1(oldPassword) {
    if (oldPassword == this.samePassword) {
      this.isOldPassword1 = true;
      this.errorres = "Old password mismatch";
    }
    this.validate(oldPassword)
  }

  cancel1(user) {
    if (user) { user.resetForm(); this.formSubmitted = false; this.isOldPassword = false; this.isOldPassword1 = false }
  }
  // ================ new password update ===============================================
  otpfun = function (user) {
    if(!this.locationdata)this.locationdata=JSON.parse(localStorage.getItem('myip'));
    this.errorres = ""
    this.displayerror = false
    this.formSubmitted = true
    if (user.valid && user.value.oldpass != user.value.newpass && user.value.newpass == user.value.pwd3 && !this.isOldPassword) {
      user.value.IpAddress=(this.locationdata)?this.locationdata.ip:' ';
      this.userservice.changePass(user.value).subscribe(data => {
        var res = data;
        user.resetForm();
        this.formSubmitted = false
        document.getElementById("changePassCloseBtn").click();
        if (res.result == "success") {
          // this.logout();
          this.documentService.openSnackBar("Password Changed Successfully", "X");
        }
      })
    }

  }
  // ==================================Change Password END==========================================================================

//ipad  popups open while double click
openmodels(e,id,fileid) {

  var time2 = e.timeStamp;
  var time1 = e.currentTarget.dataset.lastTouch || time2;
  var dt = time2 - time1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = time2;

  if (!dt || dt > 500 || fingers > 1) return; // not double-tap
  else
  {
this.openModel(id,fileid)
  } 
  e.preventDefault();
  e.target.click();
}

// Restrictspacekey in change password

Restrictspacekey(event) {
  
  if (event.keyCode == 32) {
  
      return false;
  }
}
//Field minlength checking
  checkingMinvalue(field) {
    console.log(field.value)
    if (( field.value!='' || field.value !=undefined) && (field.value && field.value.length < field.minlength) )
    {
      field.minlengtherror = true
    if(field.type == 'email' || field.type == 'mobilenumber') field.fieldvalidationCheck = true
    if (field.restrict == 'required' && (!field.people || field.people == this.sharedRecord.toemail)&& !this.requiredFieldsCount.some(x => x.id == field.id)) this.requiredFieldsCount.push(field);
    this.requiredFieldsCounts = this.requiredFieldsCount.length;
    }
    else
    {
      field.minlengtherror = false
  console.log(field)
    }
  }
  // for ie validaions for change passsword
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


}
showfinishbutton()
{
  this.finishbuttonmobile=true
}
hidefinishbutton(){
  this.finishbuttonmobile=false

}
}
