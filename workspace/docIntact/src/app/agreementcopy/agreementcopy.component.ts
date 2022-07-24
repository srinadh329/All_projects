import { Component, OnInit, Output, EventEmitter, OnDestroy, Input, HostListener, ɵConsole, Renderer2, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { DocFields } from './docfields';
import { CdkDragMove, CdkDragRelease, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Router } from "@angular/router";
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { takeUntil, sample } from 'rxjs/operators';
import { ResizeEvent } from 'angular-resizable-element';
import { MatDialog } from '@angular/material';
import { FormControl, EmailValidator } from '@angular/forms';
import { FrontEndConfig } from '../frontendConfig';
import { AdminService } from '../admin.service';
import { GeneralService } from '../general.service';
import { DataService } from '../core/data.service';
// import * as moment from 'moment';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
import { MatSelect } from '@angular/material';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { MatAutocomplete } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import * as _moment from 'moment';
import { FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { ColorPickerService } from 'ngx-color-picker';
import { DatePipe } from '@angular/common'
import { async } from 'q';
import libphonenumber from 'google-libphonenumber';
import { Location, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const moment = (_moment as any).default ? (_moment as any).default : _moment;
declare var H: any;
declare var $: any;
declare var w: any;
declare var p: any;
declare var document: any;
declare var gapi: any;

declare var documentElement: any;

interface countrycodes { name: string; }
export const Date_Format = { fullPickerInput: 'DD/MM/YYYY' };
@Component({
  selector: 'app-agreementcopy',
  templateUrl: './agreementcopy.component.html',
  styleUrls: ['./agreementcopy.component.css'],

})

export class AgreementcopyComponent implements OnInit, OnDestroy {
  // Decalare Variable / Constants
  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  formControl = new FormControl(); // Declaring Form Controlls
  filteredOptions: Observable<User[]>;
  public countryFilterCtrl: FormControl = new FormControl();
  public filteredBanks: ReplaySubject<countrycodes[]> = new ReplaySubject<countrycodes[]>(1);
  public countryCtrl: FormControl = new FormControl();
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('fruitInput') fruitInput: ElementRef;
  header_button: any = 'review'; // Header Button Style
  fontStyle; // Signature Font
  phone;
  disableShareButton = false;  // to disabe the share button
  templateMsg: any; // to display template msg(success or overrieded)
  //Decalre PDF top and left
  PdfHeight: any = 0; // OnLoad PDf get Height
  PdfWidth: any = 0; // OnLoad Pdf Get width;
  PdfTop: any = 0; // Pdf Top distance
  PdfTopScroll: any = 0; // Pdf Top distance + Scroll Distance
  PdfLeft: any = 0; // Pdf Left distance
  PdfLeftNosideBar: any = 0; // Pdf Without side bar left side distance
  pdfZoom: any = 0; //PDf Zoom Percentage
  endtime: any // Pdf Close time for Log
  serverurl = this.frontendconfig.getserverurl(); // Gettting Server URL from configuired file
  filesToUpload: Array<File> = []; // Uploaded Files info
  fields: any = []; // Configured fields
  Updatedfields = []; // While saving we will store fields to this array
  insertfield: Boolean = false; // Insert fields : Whenever click the new fild it will active as true
  setF = ''; // Set EditField
  imagedata: any // Image Data for upload 
  croppedImage: any = ''; // After Cropping Image
  cropimageData: any // After Cropping Image Data
  activeComment: any = []; // New Comment object will push on handleClick function
  commentedlines  //Comments lists 
  coordinatex // Comment / Click Coordinates X-axis
  coordinatey // Comment / Click Coordinates Y-axis
  coordinatewidth // Comment / Click Coordinates Width
  coordinatehight // Comment / Click Coordinates Height
  editCommsentSection = false // comment Editable 
  documentid // Current Document ID
  type: any // Ppup Tabs Type
  reply = false // Comment Reply
  parentcomment = [] // List of Parent Comments
  childcomments = []; // List of Child Comments
  notificationlogs = []; // Notification for Dpcument page
  emailarray = []; //Lists of People
  templates = []; // Lists of Templates
  PDFheights = [];// GEt Pdf Pages Hights
  overwritebtn = false // Template Overwrite button bydefault it's false
  tabactive // Acive Tab
  templatebtn = false //Save Template Button
  Timediffarance: any // Notifcations time diffarance
  NotificationData: any // Notifications data to clear notifications
  Notificationscount: any // Get Notifcations count
  templateedit = false // Template Edit Button
  preview // For Prview conetnt 
  isloading: boolean = true; // For loader Appearance
  alluseremails: any = [] // All User Emails 
  id: any; // Encryppted Docuemt Id
  _id: any; // Docuemt Id (Duplicated)
  editF: any; // Selected field for Edit
  fieldIndex: any; // Edit Field index for deleting
  selectedDoc: any; // Document Info from Docuemnt collection
  fontstyle //Selected Font Style
  fonttype = false; // Selected Font Type
  fontvalue: any; // Selected Forn Value
  commentsdata // List of comments 
  profiledata // User Info
  imageFile: any // Input Image
  allDocVersionsResult = [] // Get List of Versions
  currentVersionDocFieldsResult: any; // Updated Versions fields details
  fieldValues: any; // Field Values for Updateing
  curVerSharedPeopleList: any; // Current Version Shared People Lists
  SignatureList = []; // Get Existing signatures lists
  PhotoList = [] // Get Existing Phots lists
  StampList = [] // Get Existing Stamp lists
  onlineusers = []// Get List of Online Users 
  onlinedata // 
  zoomVal = 1; // PDF Zoom 
  zoomWidth  // Before zoom we will caliculate width
  zoomHeight  // Before zoom we will caliculate height
  initialList = []
  lastSelect;
  sharedemails: any //list of shared users
  auditlogs: any
  auditlogsResult: any
  editversion: any
  selectedVersion: any
  closeChat = false
  commentbtn = false
  favoritedoc: any
  removefav: boolean = false
  validemail: boolean = false
  watermarkLoading: Boolean = false;
  waterMark: any = { fontsize: '14px', content: '', fontfamily: 'Arial', color: '#201d1d', location: 'middle' };
  PDFLoading = true;
  countrycodes
  sharedusers = []
  options: User[] = []
  oldFieldData = []
  currentTab = 0;
  platform: any
  latitude: any
  longitude: any
  geocoder: any;
  Address: any
  modelshow = false;
  restorebtn: any;
  watermarkset: any
  shareform: boolean = true;
  resultData: any
  formSubmitted = false
  comment
  selectorid: any
  replyData: any
  clearselect = false
  editIcons = this.docFields.getEditIcon();
  ConfigFields = this.docFields.getConfigFields();
  _presetFonts = this.docFields.getPresetFonts();
  waterMarkFonts = this.docFields.getWaterMarkFonts();
  waterMarkSize = this.docFields.getWaterMarkSize();
  savebutton
  ReviewMode
  ver
  enablenotificationlist: Boolean = false
  // veriable declaration for pdf download
  downloadType;
  downloadFile;
  withlog;
  pdfPinSet;
  pdfPin;
  sharebutton: boolean = true
  recepients: boolean = true
  email
  callGlobalMouseMove: boolean = false;
  callGloablMouseDown: boolean = false
  callGloablMouseUp: boolean = true
  globalMouseMove: Function;
  globalMouseUp: Function;
  testVerify: Boolean = false
  mouseDownClass: any
  templatename: any;
  TemplateName
  buttonhide
  copdocument
  scrollHeight
  fieldHeight
  notificationshow: boolean = false
  resend = false
  mobiledemo: boolean
  showlist: boolean = false
  listshow: boolean = false
  // Change password start
  isOldPassword:boolean=false
  isOldPassword1:boolean=false
  samePassword
  passwordMinLength: Boolean = false;
  passwordupper: Boolean = false;
  passwordLower: Boolean = false;
  passwordNumber: Boolean = false;
  passwordSpecial: Boolean = false;
  errorres
  hide1 = true;
  displayerror
  oldpass
  newpass
  pwd3
  IpAddress
  selectRecord // slecting particular record for emails
  hideshareform:boolean=true
  windowwidth // for mobile click events
  hidesettings:boolean=false // for mobile double click to hide settigs form 
  focus
  printclose // close print iframe while click on browser back button press
  divsigpadWidth
  IframePrint: any = ''; // Iframe print for closing the print popup while clicking the back button
  search
  iebrowser // for prevalidations errors in ie only
  invalidoldpassword // for ie invalid old password
  invalidnewpas // for ie invalid new password
  invalidconfpas // for ie invalid new confirm  password
  clearintervaldata
  existingtemplate :boolean =false
  mobiletogglebutton  // enable toogle button when mobile mode ]
//change password end
  // ===================================== google drive ============================================
  // developerKey = 'AIzaSyDIakE88g3pgG36he3rlTInCxbieEfGHWE';
  // clientId = "776655235606-6cmql5v21klsgb0fanlog4qhai8v98pq.apps.googleusercontent.com"
  developerKey = 'AIzaSyB4L-PhNuvZHw4wbVOjS93VV0uCAgXHUc0';
  clientId = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
  scope = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file'
  ].join(' ');
  username: any;//to display username in navbar

  // this.editF.optionvalue
  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event) {
    this.ngOnDestroy();
  }
  @HostListener('window:popstate', ['$event'])
  async onPopState(event) {
    console.log('Back button pressed',history.length);
    // if (this.isloading) {
    //   // history.pushState(null, null, location.href);
    //   if (!this.isFirstClick) {
    //     this.isFirstClick = true
    //     this.Locations.back()
    //   }
    // }
    // else {
      if (document.getElementById('centralModallg').style && document.getElementById('centralModallg').style.display) document.getElementById('signatureModalCloseBtn').click()
      if (document.getElementById('stampModal').style && document.getElementById('stampModal').style.display) document.getElementById('stampModalCloseBtn').click()
      if (document.getElementById('photoModal').style && document.getElementById('photoModal').style.display) document.getElementById('photoModalCloseBtn').click()
      if (document.getElementById('initialModal').style && document.getElementById('initialModal').style.display) document.getElementById('initialModalCloseBtn').click()
      if (document.getElementById('messageModal').style && document.getElementById('messageModal').style.display) document.getElementById('modalClosBtn').click()
      // if(document.getElementById('savetemp').style && document.getElementById('savetemp').style.display) document.getElementById('savetempclose').click()
      // if(document.getElementById('downloadPdfModal').style && document.getElementById('downloadPdfModal').style.display) document.getElementById('downloadtmp').click()
      // if(document.getElementById('okpopup').style && document.getElementById('okpopup').style.display) document.getElementById('okpopupclose').click()
      if(!this.isFileSaved && this.isClickedOnSaveBtn){
        (!this.isFirstClick)? (this.isFirstClick = true,this.isClickedOnSaveBtn=false,console.log(1), this.Locations.back()):false
        this.isAlreadyOpened=true
        console.log(2)
      }
      else if (this.header_button == 'versions' && this.restorebtn) {
        if (!this.isFirstClick) {
          console.log(3)
          this.isFirstClick = true
          this.Locations.back()
        }
        console.log(4)
      }
      else if (!await this.isEqual(this.fields, this.oldFieldData) && !this.isAlreadyOpened) {
        if (this.youCanSave){
          await this.confirmationdialog()
          this.isFirstClick = true
          if(!this.isCalledngOnDestroy) this.Locations.back()
        }
        else {
          this.documentService.openSnackBar("You can't save the changes on this file because, some one already submited their details", "X")
          this.isAlreadyOpened = true
          this.Locations.back()
        }
        console.log(5)
      }
      else if (await this.isEqual(this.fields, this.oldFieldData) && !this.isFirstClick) {
        this.isFirstClick = true
        if (this.isAlreadyOpened) return true
        this.Locations.back()
        console.log(6)
      }

    // }
  }
  // @HostListener('document:mousedown', ['$event']) onMousedownHandler(event: any) {
  //   if(event.srcElement.id !='country_toggle' && document.getElementById('country_toggle')){
  //     if(this.mobiledemo){
  //        document.getElementById('country_toggle').click()
  //       }
  //   }
  // }

  @HostListener('window:load', ['$event'])
  onLoad(event) {
    //console.log("called")
    var s = window,
      d = document,

      x = s.innerWidth,
      y = s.innerHeight;

this.windowwidth=x
    this.scrollHeight = y - 125;
    this.fieldHeight = this.scrollHeight - 180;





    if ((x <= 1300) && (x >=1920)){
      this.divsigpadWidth=530   
    
      console.log(this.divsigpadWidth)
    }
    else if ((x <= 1300) && (x >= 1024)) {
      this.divsigpadWidth=600   
    
      console.log(this.divsigpadWidth)
    }
    else if ((x <= 1024) && (x >= 600)) {
      this.divsigpadWidth=320    
    
      console.log(this.divsigpadWidth)    
    }

    else if ((x <= 600) && (x >= 320)) {
      this.divsigpadWidth=280     
      console.log(this.divsigpadWidth)   
    
     
    }
    else{
    
      this.divsigpadWidth=600
    }

  // 
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











  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    var s = window,
      d = document,

      x = s.innerWidth,
      y = s.innerHeight;
this.windowwidth=x


    this.scrollHeight = y - 125;
    this.fieldHeight = this.scrollHeight - 180;
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
  else{
    this.divsigpadWidth=600
  }
  }
  private _onDestroy = new Subject<void>();

  public filteredEntities: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect') singleSelect: MatSelect;

  @Input() set dataa(dataa: any[]) {
    this._data = dataa;
    // load the initial entity list

    this.filteredEntities.next(this.dataa.slice());
  }

  get dataa(): any[] {
    return this._data;
  }
  private _data: any[];
  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('form') form;
  isAlreadyOpened: boolean = false
  isFirstClick: boolean = false
  constructor(private _ngZone: NgZone, private generalservice: GeneralService, private adminService: AdminService, public cookieService: ColorPickerService, public dataService: DataService,
    public dataservice: DataService, private router: Router, public activatedroute: ActivatedRoute, private frontendconfig: FrontEndConfig, private docFields: DocFields,
    private documentService: DocumentService, private userService: UserService, public dialog: MatDialog, public datepipe: DatePipe, private renderer: Renderer2, private locationStrategy: LocationStrategy, private Locations: Location,private http: HttpClient) {
    var sub = this.dataservice.Connectsocket({ type: "connect" }).subscribe(quote => { var stockQuote = quote });
    if (this.documentService.getStartUrl() != '/' || (this.documentService.getStartUrl() == '/' && history.length==1))
      history.pushState(null, null, location.href);
    this.mobiledemo = false
  }

  ngOnInit() {
    this.windowwidth=window.innerWidth
this.divsigpadWidth=600

  
  
    this.scrollHeight = window.innerHeight - 125;
    this.fieldHeight = this.scrollHeight - 180;
    this.templatename = "";
    this.getTemplate();
    // $(window).width()
    this.globalMouseMove = this.renderer.listen('document', 'mousemove', e => {
      if (this.callGloablMouseDown && this.callGlobalMouseMove && !this.callGloablMouseUp) {
        this.onWindowPress(e, this.mouseDownClass.id, this.mouseDownClass)
      }
    });
    this.globalMouseUp = this.renderer.listen('document', 'mouseup', e => {
      this.callGloablMouseDown = false;
      this.callGlobalMouseMove = false
      this.callGloablMouseUp = true
    });

    // Filter Emails lists by autocomplete 
    this.filteredOptions = this.formControl.valueChanges.pipe(startWith(''), map(value => this._filteremailcheck(value)));
    ////////////////    Get User GEO Locations        ////////////////
    this.platform = new H.service.Platform({
      "app_id": 'xeeSniVGFJguQieOyDvg',
      "app_code": 'CYXw3RyDsetaa5pSVf3EAw'
    });

    window.onbeforeunload = function (e) {
      // alert('onBefore')
      return "Do you want to exit this page?";
    };

    this.geocoder = this.platform.getGeocodingService();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        var query = this.latitude + ',' + this.longitude
      }, error => {
        this.documentService.openSnackBar("Your Location is Blocked please Allow for security reasons", "X")
        // var locationdata = JSON.parse(localStorage.getItem('mylocation'));
        this.latitude =  undefined;
        this.longitude = undefined;
      });
    }
    // this.id = this.activatedroute.snapshot.queryParams.id;
    // this._id= this.activatedroute.snapshot.queryParams._id;
    console.log(this.router.url.substring(this.router.url.lastIndexOf('/')  + 1))
    var data={
      fileid:this.router.url.substring(this.router.url.lastIndexOf('/')  + 1)
    }
  
    this.documentService.decryptedvalues(data).subscribe((data:any)=>{
      console.log(data)
      this._id=data.decryptdata;
    // Get  Document
    this.documentService.getSelectedDoc(this._id).subscribe(data => {
      console.log(data)
      this.selectedDoc = data
      if (this.selectedDoc.waterMark) {
        this.waterMark = this.selectedDoc.waterMark;
        setTimeout(() => {
          this.loadWaterMark();
        }, 1000);
      }
      this.documentService.getparticularfavorite(this._id).subscribe(data => {
        this.favoritedoc = data
        if (this.favoritedoc.length > 0) this.removefav = true;
      });
    });
    this.documentFieldDataGetting();
    this.sharedpeoples(this._id)
  
  });
    


    // Get Login User Details (Profiel Info)
    this.adminService.getProfile().subscribe(data => {
      this.profiledata = data
     if(this.profiledata.type=="organisation") this.username=this.profiledata.companyname
     else this.username=this.profiledata.name
      this.createonlineUsers()
      // Store Doc Opened Info on Audit log file
      // this.auditlog(this.profiledata._id);
      // Get Notifications
      this.getOfflineNotification();
      this.getmodeldata();
    })
    this.GetListOftemplates()
    this.IpAddress=JSON.parse(localStorage.getItem('mylocation'));
    var ipdata=localStorage.getItem('ipaddress')
    if(!this.IpAddress) this.IpAddress=this.userService.decryptData(ipdata)
      //Internet explorer header fix
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

  callMouseDown(className) {
    this.callGloablMouseDown = true
    this.callGlobalMouseMove = true
    this.callGloablMouseUp = false
    this.mouseDownClass = className
  }

  callMouseOut(className) {
    this.callGlobalMouseMove = true;
    this.callGloablMouseDown = true
  }

  createonlineUsers() {
    var log = {
      fileid: this._id,
      uid: this.profiledata._id,
      viewStatus: true,
      email: this.profiledata.email
    }
    this.generalservice.onlineuser(log).subscribe(data => {
      this.onlinedata = data
      this.getonlineusers()
    })
  }

  LoadData() {
    this.dataService.newNotificationReceived().subscribe(data => {
      this.getOfflineNotification();
    })

    this.dataservice.onlineusers().subscribe(data => {
      console.log(data)
      // this.getonlineusers()
      if(data.fileid==this.selectedDoc._id){
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
    })

    this.dataservice.mobilelinkupdate().subscribe(data => {
      this.updateFromMobile(data);
    })

    this.endtime = moment().format()
    // Get Updated Comments lists
    this.dataservice.newCommentReceived().subscribe(data => {
      this.getComments()
    })

    this.dataservice.newChatReceived().subscribe(data => {
      this.openChat = true;
    })

    this.dataservice.FieldsValueUpdate().subscribe(data => {
      if(data.documentid == this.selectedDoc._id){
        this.documentFieldDataGetting()
        this.youCanSave=false
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

    this.dataservice.documentUpdate().subscribe(data=>{
      if(data._id == this.selectedDoc._id)
      this.selectedDoc = data
    });

    this.dataService.documentLogsUpdate().subscribe(data => {
      console.log(data)
      if (data.documentid == this.selectedDoc._id && this.header_button == 'heatmaps') {
        this.heatMaps();
        // this.sharingpeoplesview()
      }
    })

    // GET comments lists
    this.getComments()
    this.getAlreadySharedPersons()
  }

  getAlreadySharedPersons() {
    // List of shared Emails
    this.documentService.getSharePeopleEmails().subscribe((data: any) => {
      this.sharedusers = data
      this.sharedusers.forEach(element => {
        this.options.push(element.email)
        if (element.toid) {
          if (this.alluseremails.length > 0) {
            var shared = (this.alluseremails.some(element1 => element1 == element.toid.email))
            if (!shared) {
              this.alluseremails.push(element.toid.email)
            }
          }
          if (this.alluseremails.length == 0) {
            this.alluseremails.push(element.toid.email)
          }
        }
        if (!element.toid) {
          if (this.alluseremails.length > 0) {
            var shared = (this.alluseremails.some(element1 => element1 == element.toemail))
            if (!shared) {

              this.alluseremails.push(element.toemail)
            }
          }
          if (this.alluseremails.length == 0) {
            this.alluseremails.push(element.toemail)
          }
        }
      });
    })
  }

  // Gettiong Document fields Data
  documentFieldDataGetting() {
    return new Promise(async (resolve, reject) => {
      await this.documentService.getSelectedDoc(this._id).subscribe(data => {
        console.log(data)
        this.selectedDoc = data
        this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.selectedDoc._id, versionid: this.selectedDoc.versionid ? this.selectedDoc.versionid : null }).subscribe(currentVersionDocFieldOptions => {
          this.fields = currentVersionDocFieldOptions;
          console.log(this.fields)
          this.oldFieldData = JSON.parse(JSON.stringify(this.fields))
          for (let field of this.fields) {
            // if(field.type == 'text') field.width = Number(field.width) - 2           
            //   field.height = Number(field.height) + (2 * parseInt($("#" + field.id + "-input").css('borderWidth'))) +parseInt( $("#" + field.id + "-input").css('padding-top'))+ parseInt($("#" + field.id + "-input").css('padding-bottom'))
            
           
            if (field.type == 'date' && field.value) field.value = new Date(field.value);
            setTimeout(() => { this.updateFieldCss(field); }) //After Div insert in html then only it needs to be call
            setTimeout(() => {
              if(this.header_button == 'insertField' || this.header_button == 'saveFile') $("#" + field.id+ "-input" ).resizable();
              if( ((field.type == 'signature' || field.type == 'initial' || field.type == 'Photo' || field.type == 'Stamp') && ( field.insertedemail || field.signatureId || field.photoId || field.stampId )))
               $("#" + field.id+ "-input").attr("contenteditable1",false)                
             
              
            },10)
          } // Update Css Fields
          resolve(true)
        }, error => { resolve(false) });
      });
    })
  }

  //GET pdf empty left space
  
  getpdfSizes() {
    if(!(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)))
    $("#staticbar-top").addClass('statusbarCrossBrowser')
    else if ($("#staticbar-top").is('.statusbarCrossBrowser') )
    $("#staticbar-top").removeClass('statusbarCrossBrowser')
    this.PdfTop = document.getElementById('docheader').offsetHeight   +   document.getElementById('progress_bar').offsetHeight + document.getElementById('topbar').offsetHeight +($('#staticbar-top').outerHeight(true)-$('#blog-post').outerHeight(true)) ;
    this.PdfTopScroll = $("#doc-view").scrollTop();
    this.PdfLeft = $('#docsidebar').outerWidth(true) + (($("#doc-view").width() - $('#blog-post').width()) / 2);
    //this.PdfLeftNosideBar = ($('#blog-post').outerWidth(true) - $('#blog-post').width()) / 2;
    this.PdfLeftNosideBar = ($("#doc-view").width() - $('#blog-post').width()) / 2;
    console.log($("#doc-view").width() , $('#blog-post').width(),$('#docsidebar').outerWidth(true))
    console.log(this.PdfLeft,this.PdfLeftNosideBar)
  }

  sharedpeoples(id) {
    this.documentService.getsharingpeople(id).subscribe(data => {
      this.sharedemails = data;
      console.log(this.sharedemails)
    })
  }

  getFieldLeft(field, t) {
    var left = 0;
    if ((field.left || field.coordinatey) && this.zoomVal != 1) {
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      if (field.left) {
        // console.log(perc)
        var l = (field.left / 100) * perc;
        left = field.left - l;
      }
      else {
        var l = (field.coordinatey / 100) * perc;
        left = (field.coordinatey - l) - ((this.zoomVal * 10) - 10);
      }
    }
    else if (field.left) left = field.left;
    else if (field.coordinatey) left = field.coordinatey; // only comments section
    var sidebar = 0;
    if (this.PdfLeftNosideBar > 0) sidebar = this.PdfLeftNosideBar;
    // console.log(field.left,sidebar)
    return left + sidebar;
  }

  // Get Field Top as per zoom Level
  getFieldTop(field) {
    var top = 0;
    if ((field.top || field.coordinatex) && this.zoomVal != 1) { //Only zoom section
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      if (!field.selectText && field.top) {
        var l = (field.top / 100) * perc;
        top = field.top - l;
      } else if (field.coordinatex) {
        var l = ((field.coordinatex )/ 100) * perc;
        top = field.coordinatex +  (document.getElementById('progress_bar').offsetHeight + ($('#staticbar-top').outerHeight(true)-$('#blog-post').outerHeight(true))) - l;
      }
      else if (field.selectText) {
        var l = (field.top / 100) * perc;
        top = field.top - l;
      }
    }
    else if (field.top) { top = field.top; }
    else if (field.coordinatex) { top = field.coordinatex +  document.getElementById('progress_bar').offsetHeight +($('#staticbar-top').outerHeight(true)-$('#blog-post').outerHeight(true))}
    return top;
  }

  // Get Field Height as per zoom Level
  getFieldHeight(field) {
    if (field.height && this.zoomVal != 1) {
      $("#"+field.id+"-input").parents('div.ui-wrapper').height($("#"+field.id+"-input").height())
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      var l = (field.height / 100) * perc;
      return field.height - l ;
    }
    else 
    {
      $("#"+field.id+"-input").parents('div.ui-wrapper').height($("#"+field.id+"-input").height())
      return field.height ;
    }
  }

  // Get Field width as per zoom Level
  getFieldWidth(field) {
    if (field.width && this.zoomVal != 1) {
      $("#"+field.id+"-input").parents('div.ui-wrapper').width($("#"+field.id+"-input").width())
      var perc = this.getPercentageChange(parseInt(this.PdfWidth), parseInt($(".page:first").width()));
      var l = (field.width / 100) * perc;
      return field.width - l;
    }
     else 
     {
      $("#"+field.id+"-input").parents('div.ui-wrapper').width($("#"+field.id+"-input").width())
       return field.width  ;
     }
  }

  // Resize fields on window resize
  onWindowResize() {
    this.getpdfSizes();
  }

  // Caliculate distance percentage
  getPercentageChange(oldNumber, newNumber) {
    // console.log(oldNumber,newNumber)
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
  }

  drag(event: CdkDragMove, id, field) {
    // Getting screen sizes from getPDFsizes function
    // console.log("dragggggggg",id)
    // this.getpdfSizes();
    /*  var w = $("#" + id + "-input").width();
      var PW = $(".page:first").width();
      var l = field.left + w;
      // if(l>PW){
      //   var diff=l-PW;
      //   l=l-diff;
      //   console.log("diff",diff,l)
      // }
      console.log("left",field.left,"width",w,"Total",l)
      console.log("page width",PW)
      console.log(event.pointerPosition.x + w);
      console.log(event.pointerPosition.x);
      console.log(this.PdfLeftNosideBar)
      console.log(w);
      console.log(this.PdfLeft + $('#blog-post').width());
      console.log(this.PdfLeft);
      console.log($('#blog-post').width())
      //validating corrdinates 
      if ((this.PdfLeft > event.pointerPosition.x || this.PdfTop > event.pointerPosition.y || this.PdfLeft + $('#blog-post').width() < (event.pointerPosition.x  + w-25)) ) {
        //If validation pass revert back field to same position
        event['source']['element']['nativeElement']['style']['transform'] = 'translate3d(0,0,0)';
        event['source']['_dragRef']['_activeTransform'] = { x: 0, y: 0 };
        event['source']['_dragRef']['_passiveTransform'] = { x: 0, y: 0 };
      }
      */
  }

  // Update field values after draging
  drop(event: CdkDragEnd, field) {
    console.log((2 * parseInt($("#" + field.id + "-input").css('border-left-width'))) +parseInt( $("#" + field.id + "-input").css('padding-top'))+ parseInt($("#" + field.id + "-input").css('padding-bottom')));
    console.log((2 * parseInt($("#" + field.id + "-input").css('border-left-width')))+ +parseInt( $("#" + field.id + "-input").css('padding-left'))+ parseInt($("#" + field.id + "-input").css('padding-right')));
   if(parseInt($("#" + field.id + "-input").css('border-left-width')))
   {
    field.height = $("#" + field.id + '-input').height() +(2 * parseInt($("#" + field.id + "-input").css('border-left-width'))) +parseInt( $("#" + field.id + "-input").css('padding-top'))+ parseInt($("#" + field.id + "-input").css('padding-bottom'));
    field.width = $("#" + field.id + '-input').width() + (2 * parseInt($("#" + field.id + "-input").css('border-left-width')))+ +parseInt( $("#" + field.id + "-input").css('padding-left'))+ parseInt($("#" + field.id + "-input").css('padding-right'));
   }
 

    if (event['source']['_dragRef']['_passiveTransform']) {
      var t = field.top + event['source']['_dragRef']['_passiveTransform']['y'];
      var l = field.left + event['source']['_dragRef']['_passiveTransform']['x']
      console.log(l)
      console.log($('#blog-post').width())
      if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
      var PdfWidth =$('#blog-post').width()-8
      else
      var PdfWidth =$('#blog-post').width()-0
      if (l > 0 && PdfWidth > l + field.width && t > 0 && $('#blog-post').height() > t + field.height) {
        field.top = field.top + event['source']['_dragRef']['_passiveTransform']['y']
        field.left = field.left + event['source']['_dragRef']['_passiveTransform']['x']
      
        console.log("out of field")
      }
      event['source']['element']['nativeElement']['style']['transform'] = 'translate3d(0,0,0)';
      event['source']['_dragRef']['_activeTransform'] = { x: 0, y: 0 };
      event['source']['_dragRef']['_passiveTransform'] = { x: 0, y: 0 };
    }
  }

  // Load PDF Content 
  loadPDF(pdf) {
    $(".blog-post").width($(".page").width());
    $(".textLayer").css("border", '1px solid #000');
    this.onWindowResize();
    // this.LoadData();
  }

  youCanSave: boolean = true
  //After Loading PDf 
  async afterLoadComplete(pdf) {
    this.pdf = pdf;
    //this.getpdfSizes();
    this.loadOutline();
    this.onWindowResize();
    this.loadWaterMark();
    this.LoadData();
    this.isloading = false;
    setTimeout(() => {
      this.PdfHeight = $(".page:first").height();
      this.PdfWidth = $(".page:first").width();
    }, 100)
    this.youCanSave=await this.canSave()?true:false// For the reason of decreasing confirmation dialog box loading 
  }

  // PDf Zoom Functions
  pdfZoomIn() {
    this.zoomWidth = $(".page").width()
    if (this.zoomVal <= 1.5) {
      // for (let field of this.fields) {
      //  console.log($("#"+field.id+"-input").width(),$("#"+field.id+"-input").parents('div.ui-wrapper').width())
      //  if($("#"+field.id+"-input").width() != $("#"+field.id+"-input").parents('div.ui-wrapper').width())
      //  {
      //  }
      // }
      this.zoomVal += 0.1
    }
  }

  pdfZoomOut() {
    console.log(this.zoomVal)
    this.zoomWidth = $(".page").width()
    if (this.zoomVal > 1) {
      this.zoomVal -= 0.1
    }
    else if(this.zoomVal == 1  )
    {
       for (let field of this.fields) {
       console.log($("#"+field.id+"-input").width(),$("#"+field.id+"-input").parents('div.ui-wrapper').width())
       if($("#"+field.id+"-input").width() != $("#"+field.id+"-input").parents('div.ui-wrapper').width() || $("#"+field.id+"-input").height() != $("#"+field.id+"-input").parents('div.ui-wrapper').height())
       {
      $("#"+field.id+"-input").parents('div.ui-wrapper').height($("#"+field.id+"-input").height())
      $("#"+field.id+"-input").parents('div.ui-wrapper').width($("#"+field.id+"-input").width())
       }
      }
    }
  }

  pdfZoomreset() {
    this.zoomWidth = $(".page").width()
    for (let field of this.fields) {
      console.log($("#"+field.id+"-input").width(),$("#"+field.id+"-input").parents('div.ui-wrapper').width())
      if($("#"+field.id+"-input").width() != $("#"+field.id+"-input").parents('div.ui-wrapper').width() || $("#"+field.id+"-input").height() != $("#"+field.id+"-input").parents('div.ui-wrapper').height())
      {
     $("#"+field.id+"-input").parents('div.ui-wrapper').height($("#"+field.id+"-input").height())
     $("#"+field.id+"-input").parents('div.ui-wrapper').width($("#"+field.id+"-input").width())
      }
     }
    this.zoomVal = 1
   
  }

  // Update Css As per field configuaration
  updateFieldCss(field) {
    //  alert("ok")
    var css = "#" + field.id + "{ ";
    for (let prop in field) {
      if (prop.substring(0, 4) == 'css-') {
        console.log(field[prop])
        console.log(field.height)
        if (prop.substring(4) == 'transform') {
          $("#" + field.id).css(prop.substring(4), "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('msTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('MozTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css('OTransform', "rotate(" + field[prop] + "deg)");
          $("#" + field.id).css(prop.substring(4), "rotate(" + field[prop] + "deg)");
        }
        else if (field[prop] != false) $("#" + field.id + '-input').css(prop.substring(4), field[prop]);
        else $("#" + field.id + '-input').css(prop.substring(4), '');
        console.log(field)
      }
    }
    if (field.people) this.RecipientMails();
    if (field.type == 'radiobutton' && field['css-font-size']) { // Update radio button size
      var w = field['css-font-size'].substring(0, field['css-font-size'].length - 2)
      if (w > 20) $("#" + field.id + '-input').find('input').css('width', w / 2 + 'px');
    }
    if (field.type == 'radiobutton' || field.type == 'dropdown' && field.opt != undefined && !field.radiobuttondisplay) {
      var options = []
      options = field.optionvalue ? field.optionvalue : []
      field.optionvalue = field.opt.split(',')
    }
    if (field.restrict == "required") field.required = true;
    else if (field.restrict == "hidden") field.hidden = true;
    else if (field.restrict == "readonly") field.readonly = true;
    console.log(field)
    this.onWindowPress(false, field.id, field)
  }

  // Update Font Size dipandance up on the field
  ResetFieldFonts(field) {
    if(this.windowwidth > 750 )
    {
      if (field && field.type && (field.type == 'signature' || field.type == 'initial' || field.type == 'Photo' || field.type == 'Stamp' || (field.type == 'label' && field.placeholder == "label" && !field.value))) {
        {
          var div = $("#" + field.id + '-input');
          // console.log(div.height() )
          var fontsizeInvw = div.width() / 90
          var fontsizeInvh = div.height() / 90
          if (div.width() == 15) div.css('font-size', 0.56 + 'vw');
          else if (div.width() == div.height())
            div.css('font-size', (fontsizeInvh + fontsizeInvw) + 'vmin');
          else if (div.width() > div.height())
            div.css('font-size', fontsizeInvh + 0.5 + 'vw');
          else {
            // fontsizeInvw = div.width() / 90
            // fontsizeInvh = div.height() / 90
            div.css('font-size', (fontsizeInvw) + 'vw');
          }
         
        }
        if (field && field.type && field.type == 'date') {
          // this.assignRadio(field, 'pickerType');
        }
    }
  
    }
  }
  //Update Date format as per date settings

  UpdateDateFormat(field) {
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

  // Fields Emails will push to recipnt emails lists
  RecipientMails() {
    this.emailarray = []
    var uniqueEmails = [];
    this.fields.forEach(element => {
      if (element.people) {
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var x = regexp.test(element.people)
        if (x) {
          var present = (uniqueEmails.some(element1 => element1 == element.people))
          if (!present) {
            uniqueEmails.push(element.people)
            this.emailarray.push({ "email": (element.people).trim() })
          }
        }
      }
    });
  }

  // Logout by clicking logout button
  logout() {
    this.dataService.Connectsocket({ type: "disconnect" }).subscribe(quote => { });
    this.adminService.logout();
  }

  accessbutton = false
  /// Getting Comments
  getComments() {
    var id = { id: this._id }
    this.documentService.getcomments(id).subscribe(data => {
      this.commentsdata = data
      this.childcomments = []
      this.parentcomment = []
      console.log(this.commentsdata)
      this.commentsdata.forEach(element => {
        if (element.uid._id != this.profiledata._id) { element.coordinatey += 15; }
        if (element.parentcommentid) {
          if (element.uid) {
            if (element.uid._id == this.profiledata._id) element.isreply = true
          }
          else {
            if (element.email == this.profiledata.email) element.isreply = true
          }
          this.childcomments.push(element)
        }
        else {
          if (element.uid) {
            if (element.uid._id == this.profiledata._id) element.isreply = true; this.accessbutton = true;
          }
          else {
            if (element.email == this.profiledata.email) element.isreply = true
          }
          this.parentcomment.push(element)
        }
      })
    })
  }

  // to get template of particular document
  getTemplate() {
    if (this._id && this.selectedTemplateId) {
      this.documentService.gettempltes().subscribe((data: any) => {
        this.templates = data
      });
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

  add(item) {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!(regexp.test(item.people)) && item.people != undefined && item.people != "") item.emailvalid = false
    else item.emailvalid = true
    if(item.people == '' ) delete item.people
    if(item.people == undefined ) delete item.people
    this.updateFieldCss(item)
  }

  private _filteremailcheck(value: string): User[] {
    if (value != undefined && value.length) {
      const filterValue = value.toLowerCase();
      return this.alluseremails.filter(option => option.toLowerCase().includes(filterValue));
    }
    else return []
  }

  private filterCountries() {
    if (!this.dataa) {
      return;
    }
    // get the search keyword
    let search = this.countryFilterCtrl.value;
    if (!search) {
      this.filteredEntities.next(this.dataa.slice());
      return;
    } else search = search.toLowerCase();
    // filter the Countries
    this.filteredEntities.next(
      this.dataa.filter(country => country.name.toLowerCase().indexOf(search) > -1)
    );
  }

  closeEditform = function () {
    this.editF = null;
    this.shareform = true;
    this.fieldIndex = false;
    this.setF = '';
    $(".page").css("z-index", 8);
  }

  // Get Lists of Intial field documents 
  GetInitialDocumentList(taboption) {
    this.documentService.ListOfInitials(this.profiledata.email).subscribe((res: any) => {
      console.log(res)
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
        if (taboption && this.initialList.length > 0) this.tabactive = 'tab1';

        console.log(this.initialList)
      } else if (taboption && this.initialList.length == 0) {
        this.tabactive = taboption;
        this.signature()
      }
    });
  }

  //Get List of intails from server by clicking the button
  setInitialDefaultSettings(sign) {
    console.log(sign)
    if (sign.setDelete) {
      var index = this.initialList.findIndex(x => x._id == sign._id)
      console.log(index)
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

  // Get List of signattues 
  //Parameter taboption : If ivalue is there it will check count if count 0 then it will navigate to that tab 
  GetSignatureDocumentList(taboption) {
    console.log(taboption)
    this.documentService.ListOfSignatures(this.profiledata.email).subscribe((res: any) => {
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
        if (taboption && this.SignatureList.length > 0) this.tabactive = 'tab1';
      } else if (taboption && this.SignatureList.length == 0) {
        this.tabactive = taboption;
        this.signature()
      }
    });
  }

  //Get List of Singnatures from server by clicking the button
  setSignatureDefaultSettings(sign) {
    if (sign.setDelete) {
      var index = this.SignatureList.findIndex(x => x._id == sign._id)
      console.log(index)
      if (index >= 0) {
        this.SignatureList.splice(index, 1)
      }
      console.log(this.SignatureList)
      if (this.SignatureList.length == 0)
        this.tabactive = 'tab3'
    }
    this.documentService.setSignatureDefaultSettings(sign).subscribe(data => {
      // this.GetSignatureDocumentList(false);
    })
  }

  //Get List of Photos from server by clicking the button
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

  //Get List of Stamp from server by clicking the button
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

  signature() {
    // alert("ok")
    window.dispatchEvent(new Event('resize'));
  }

  //Calling api to get List of Photos from server
  GetPhotoDocumentList(taboption) {
    this.documentService.ListOfPhotos(this.profiledata.email).subscribe((res: any) => {
      if (res.length > 0)
        this.PhotoList = res;
    });
    if (taboption && this.PhotoList.length > 0) this.tabactive = 'tab1';
    else if (taboption && this.PhotoList.length == 0) this.tabactive = taboption;
  }

  //Calling api to get List of stamps from server
  GetStampDocumentList(taboption) {
    this.documentService.ListOfStamps(this.profiledata.email).subscribe((res: any) => {
      if (res.length > 0)
        this.StampList = res;
    });
    if (taboption && this.StampList.length > 0) this.tabactive = 'tab1';
    else if (taboption && this.StampList.length == 0) this.tabactive = taboption;
  }

  selectSignature = function (data, title) {
    if(this.editF) $("#" + this.editF.id+ "-input").attr("contenteditable1",false)
    console.log(data)
    if (data._id) this.editF.signatureId = data._id;
    if (data.type) this.editF.signatureType = data.type
    if (data.signaturebaseData) this.editF.signaturebaseData = data.signaturebaseData
    if (data.path) this.editF.path = data.path
    if (data.size) this.editF.size = data.size
    if (data.name) this.editF.name = data.name
    if (data.link) this.editF.link = data.link
    if (data.encryptedid) this.editF.encryptedid = data.encryptedid
    if (data.fontStyle) this.editF.fontStyle = data.fontStyle
    if (data.fontText) this.editF.fontText = data.fontText
    // this.saveDocLogs(data, title);
  }

  selectPhoto(data) {
    if(this.editF) $("#" + this.editF.id+ "-input").attr("contenteditable1",false) 
    if (data.bottlenecksCreated == false && this.editF.authentication == true) {
      this.documentService.bottlenecksCreationForPhoto(data).subscribe((result: any) => {
        console.log(result);
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
      this.setPhoto()
    }
  }

  //============================search countries=================================================
  searchcountry
  countrylist
  Searchcountries(searchcountry, e, id) {
    if (e.key != "ArrowDown") {
      if (e.key != "ArrowUp") {
        if (searchcountry.length > 0) this.userService.getcountries({ searchcountry: searchcountry }).subscribe(data => {
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
  enteredvalue: any
  selectimg: any
  addcountry(country, id) {
    this.showlist = false
    this.mobiledemo = false
    // document.getElementById(id).click()
    this.req = false
    this.added = null;
    setTimeout(() => {
      $("#" + id).focus();
      this.searchcountry = country.name;
      this.added = country.dial_code;
      this.selectimg = country.code
    }, 10);
  }
  // keycode=['+','-','.','e','E','ArrowDown','ArrowUp','!','@','#','$','%','^','&','*','(',')','/']
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

  //===================================================================================================
  selectStamp = function (data) {
    if(this.editF) $("#" + this.editF.id+ "-input").attr("contenteditable1",false) 
    if (data._id) this.editF.stampId = data._id
    if (data.type) this.editF.stampType = data.type
    if (data.path) this.editF.path = data.path
    if (data.size) this.editF.size = data.size
    if (data.name) this.editF.name = data.name
    if (data.link) this.editF.link = data.link
    if (data.encryptedid) this.editF.encryptedid = data.encryptedid
    // this.saveDocLogs(data, "Stamp")
  }

  getAllDocVersions = function () {
    this.documentService.getAllDocVersions(this._id).subscribe(allDocVersions => {
      this.allDocVersionsResult = allDocVersions
    })
  };

  GetListOftemplates() {
    this.overwritebtn = false
    this.existingtemplate=false
    this.documentService.gettempltes().subscribe((data: any) => {
      this.templates = data;
      console.log(this.templates)
    })
  }

  getSelectedTemplate(data) {
    if (data == undefined) this.documentService.openSnackBar("Select Template", 'X')
    else {
      this.documentService.getSelectedTemplate(data).subscribe((templatedata: any) => {
        this.fields = templatedata.fields;
        for (let field of this.fields) {
          if (field.type == 'date' && field.value) field.value = new Date(field.value);
          setTimeout(() => { this.updateFieldCss(field); }) //After Div insert in html then only it needs to be call
        } // Update Css Fields
        this.isTemplateSelected = true;
        document.getElementById("templatemodelclose").click()
      });
    }
  }

  isTemplateSelected = false
  async backToOriginal() {
    this.isloading = true
    await this.documentFieldDataGetting()
    this.isTemplateSelected = false
    this.isloading = false
  }

  editField = function (item: any, index: number, data) {
    console.log('editField', item)
    if (item.type) {
      $("#" + item.id + "-input").attr("tabindex", 1).focus();
      $("#" + item.id + "-input").addClass("focuscolor");
    }
    if (this.header_button == 'insertField' || this.header_button == 'saveFile') {
      if (this.editF) {
        console.log("editfield")
        $("#" + this.editF.id + "-input").attr("tabindex", 1).focus();
        $("#" + this.editF.id + "-input").resizable();
      }
      this.openChat = false
      // this.shareform = false;
      this.editF = item;
      this.fieldIndex = index;
      var f = item;
      if (this.editF.type == 'date') {
        setTimeout(() => {
          $(".date-clear").hide();
          $("." + f.pickerType + "-picker-dropdown").show();
          // alert($("." + f.pickerType + "-picker-dropdown").atr('class'));
          if (f.pickerType == 'date') {
            f.pickerT = 'calendar';
            f.dateformats = 'dd/MM/yyyy';
            f.timeformats, f.dateTimeformats = '';
          }
          else if (f.pickerType == 'time') {
            f.pickerT = 'timer';
            f.timeformats = 'hh:mm a';
            f.dateformats, f.dateTimeformats = '';
          }
          else {
            f.pickerT = 'both';
            f.dateTimeformats = 'dd/MM/yyyy hh:mm';
            f.dateformats, f.timeformats = '';
          }
          console.log(f)
        }, 10);
      }
      this.RecipientMails();
    }
  };
//field highlight on focusing
focusfield(item)
{
  console.log("ok")
  if(item.type &&  item.restrict != 'readonly' && !item.insertedemail && (!item.people || item.people == this.profiledata.email))
    {
    $("#" + item.id+ "-input").attr("tabindex", 1).focus();
    
      $("#" + item.id+ "-input").addClass("focuscolor");
    }
}
  deleteField = function (editF) {
    this.fields.forEach((element,index) => {
      if(element.id == editF.id)
      this.fields.splice(index,1)
     console.log(this.fields)
    });
    
    console.log(this.fields)
    this.closeEditform()
  };

  clearOptionsArray(data, index) {
    this.editF.optionvalue.splice(index, 1)
  }

  // Save Field Settings By clicking the save changes
  saveFieldSettings = function (configField, editF) {
    console.log(editF)
    if (editF.type == 'radiobutton' || editF.type == 'dropdown' && editF.opt != undefined && !editF.radiobuttondisplay) {
      var options = []
      options = this.editF.optionvalue ? this.editF.optionvalue : []
      editF.opt = editF.opt.split(',')
      this.editF.optionvalue = editF.opt
    }
    if (editF.restrict == "required") editF.required = true;
    else if (editF.restrict == "hidden") editF.hidden = true;
    else if (editF.restrict == "readonly") editF.readonly = true;
    this.documentService.openSnackBar("Saved Changes!", 'X')
  };

  isFileSaved=true  
  isClickedOnSaveBtn=false
  saveFile = async function (title) {
    return new Promise(async (resolve, reject) => {
      this.isloading = true
      this.isFileSaved=false
      if (this.zoomVal != 1) this.pdfZoomreset();
       for (let field of this.fields) {
        if(parseInt($("#" + field.id + "-input").css('border-left-width')))
        {
        field.height = $("#" + field.id + '-input').height() +(2 * parseInt($("#" + field.id + "-input").css('border-left-width'))) +parseInt( $("#" + field.id + "-input").css('padding-top'))+ parseInt($("#" + field.id + "-input").css('padding-bottom'));
        field.width = $("#" + field.id + '-input').width() + (2 * parseInt($("#" + field.id + "-input").css('border-left-width')))+ +parseInt( $("#" + field.id + "-input").css('padding-left'))+ parseInt($("#" + field.id + "-input").css('padding-right'));
        }
        else if( parseInt($("#" + field.id + "-input").css('border-left-width')) && (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode))) 
        {
          field.height = $("#" + field.id + '-input').height() 
          field.width = $("#" + field.id + '-input').width() 
        }  
      }
      if (!await this.isEqual(this.fields, this.oldFieldData)) {
        var saveRes = await this.canSave();
        if (saveRes) {
          console.log(saveRes)
          this.LoadFieldConfig()
          await this.savefileFun();
          this.isloading = true;
          await this.documentFieldDataGetting();
          this.isloading = false;
          this.isFileSaved=true
          resolve(true)
        }
        else {
          this.documentService.openSnackBar("You can't save the changes on this file because, some one already submited their details", "X")
          this.isloading = false;
          this.isFileSaved=true
          resolve(true)
        }
      }
      else {
        this.isloading = false;
        this.isFileSaved=true
        resolve(true)
        if(title == 'fromsave')
        this.documentService.openSnackBar("No changes found to save the file.", "X")
      }
      this.closeEditform();
    });
  }
  // ipad model open when double click
  openmodels(e,id,fileid) {
    var time2 = e.timeStamp;
    var time1 = e.currentTarget.dataset.lastTouch || time2;
    var dt = time2 - time1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = time2;
  this.hidesettings=true
    if (!dt || dt > 500 || fingers > 1) return; // not double-tap
    else

    {
 
   this.hidesettings=false
   this.openModel(id,fileid) 
    } 
    e.preventDefault();
    e.target.click();
  }
  showpanel()
  {
  this.hidesettings=true

  }
  // ipad select versions while double click
  selectversions(e,versionData) {
    var time2 = e.timeStamp;
    var time1 = e.currentTarget.dataset.lastTouch || time2;
    var dt = time2 - time1;
    var fingers = e.touches.length;
    e.currentTarget.dataset.lastTouch = time2;
  
    if (!dt || dt > 500 || fingers > 1) return; // not double-tap
    else
    {
      this.currentVersionDoc(versionData)

    } 
    e.preventDefault();
    e.target.click();
  }
  addFieldwidthHeight = true
  // Update filed hight, width, top, left  to validate 
  LoadFieldConfig() {  
    var i = 0;
    console.log(this.fields)
    this.Updatedfields = JSON.parse(JSON.stringify(this.fields));
    console.log(this.Updatedfields)
    var h = 0;
    var PDFheights = [];
    $("div.pdfViewer").find("div.page").each(function () {
      PDFheights.push({ start: h, end: h + $(this).height() })
      h = h + $(this).height();
    })
    for (let field of this.Updatedfields) {
     console.log(field)
        var m = 0;
      PDFheights.forEach(page => {
        m++;
        if (page.start <= field.top && page.end >= field.top) {
          field.pageNo = m++;
          field.pageHeight = page.end - page.start;
          field.pageFieldHeight = field.top - page.start;
          field.pageWidth = $(".page:first").width();
        }
      });
      // if (field['css-transform'] && field['css-transform'] > 0) {
      //   var m = Math.sin(field['css-transform'] * Math.PI / 180) / 2;
      //   var val = Math.abs(field.width * m);
      //   field.top = field.top + val;
      // }
      if (field && field.type && (field.type == 'signature' || field.type == 'initial' || field.type == 'Photo' || field.type == 'Stamp' || (field.type == 'label' && field.placeholder == "label"))) {
        var div = $("#" + field.id + '-input');
        field['css-font-size'] = div.css('font-size')
      } 
      $("#" + field.id).parent(".editMode").css("transform", '');
      i++;
    }
    return this.Updatedfields;
  }

  templateShowbtn = false
  savefileFun = function () {
    return new Promise(async (resolve, reject) => {
      var webDocWidth = document.getElementById('blog-post').offsetWidth;
      if (!this.Updatedfields.find(x => x.emailvalid == false)) {
        // Adding new Version
        await this.documentService.saveVersion({ documentid: this._id ,versionname :new Date().toLocaleString([], { hour12: true})}).subscribe(async versionData => {
          if (this.selectedDoc) {
            //Update Version ID on Document File
            var newDoc = JSON.parse(JSON.stringify(this.selectedDoc))
            newDoc.versionid = versionData._id;
            this.documentService.updatefolder(newDoc).subscribe(async data => {
              // Insert Fields on field options 
              var finalData = { fields: this.Updatedfields, webDocWidth: webDocWidth, documentid: this._id, versionid: versionData._id }
              await this.documentService.saveFieldOptions(finalData).subscribe(async data => {
                this.documentService.openSnackBar("Saved Successfully", "X")
                this.isloading = false
                this.isTemplateSelected = false
                resolve(true);
              });
            })
          }
          else {
            console.log("Can't do")
            this.documentService.openSnackBar("Not Saved", "X")
            this.isloading = false
            this.isTemplateSelected = false
          }
        })
      }
      else {
        this.isloading = false
        this.isTemplateSelected = false
        resolve(true)
      }
    })
  }

  // Save as new template =====================================================================
  savetemplate = function (templatename) {
    if (templatename) {
      if (this.selectedDoc.versionid) var version = this.selectedDoc.versionid
      var finalData = { istemplate: true, templatename: templatename, fields: this.fields, encryptedid: this.selectedDoc.encryptedid, documentid: this._id, versionid: version }
      this.documentService.saveFieldOptions(finalData).subscribe(data => {
        this.templatebtn = false
        this.templateShowbtn = false
        this.templatename = null;
        this.templateMsg = "Template Saved Successfully";
        this.GetListOftemplates()
        document.getElementById('savetempclose').click()
        document.getElementById('callpopup').click()
      });
    } else this.documentService.openSnackBar("Enter Template name", "X")
  }

  // overriding the template ====================================================================
  overridetemplate(data) {
    console.log(data)
    data.fields = this.fields
    var datas = { fields: this.fields, _id: data._id }
    this.documentService.overridetemplate(datas).subscribe((data: any) => {
      if (data) {
        this.overwritebtn = false
        this.templateMsg = "Template Overrided Successfully";
        document.getElementById("templatemodel").click();
        document.getElementById("savetempclose").click();
        document.getElementById('callpopup').click();
        document.getElementById("templatemodelclose").click();

      }
    });
  }

  // editing /deleting the template ===========================================================
  edittemplate(data, title) {
    if (title == 'delete') {
      if (this.buttonhide != data._id) this.templateedit = false;
      this.selectedTemplateId = data._id;
      data.istemplate = false
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'DeleteTemplate',content:"You want to delete the Template." }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        if (res == 'DeletedTemplate') {
          var index = this.templates.findIndex(x => x._id == data._id)
          console.log(index)
          if (index >= 0) {
            this.templates.splice(index, 1)
            this.documentService.edittemplate(data).subscribe((data: any) => {
              this.templateedit = false;
              this.getTemplate();
            });
            this.documentService.openSnackBar("Template has been deleted Successfully.", "X");
          }
        }
      });
    }
    if (data.templatename == "") this.documentService.openSnackBar("Enter Template Name", "X")
    if (data.templatename != "" && title == 'edit') {
      this.isloading = true;
      this.templateedit = false
      this.documentService.edittemplate(data).subscribe((data: any) => {
        this.documentService.gettempltes().subscribe((data: any) => {
          this.templates = data
          this.templateedit = false
        });
        this.documentService.openSnackBar("Template Updated Successfully", "X");
        // document.getElementById("templatemodelclose").click()
      });
    }
  }


  canSave() {
    return new Promise(async (resolve, reject) => {
      if(this.selectedDoc.status == 'Completed') resolve(false)
      this.documentService.getCurVerSharedPeopleList({ documentid: this.selectedDoc._id }).subscribe(async (sharedPeopleList: any) => {
        if (sharedPeopleList.length) {
          await this.documentService.getCurrentVersionDocFieldValues({ documentid: this.selectedDoc._id }).subscribe(async (currentFieldVal: any) => {
            if (currentFieldVal.length) resolve(false)
            else resolve(true)
          })
        }
        else resolve(true)
      });
    })
  }

  shareFile = async function () {
    this.isloading = true;
    this.disableShareButton = true;
    this.RecipientMails()
    // if (this.zoomVal != 1) this.pdfZoomreset();
    // var saveRes = await this.canSave()
    // if (saveRes) {
    //   await this.LoadFieldConfig(this.fields)
    //   if (!await this.isEqual(this.fields, this.oldFieldData)) {
    //     await this.savefileFun()
    //     this.isloading = false
    //     this.sharingDialog()
    //   }
    //   else {
    //     this.isloading = false
    //     this.sharingDialog()
    //   }
    // }
    // else {
    //   this.documentService.openSnackBar("You can only share, can't save the file", "X")
    //   this.isloading = false
    //   this.sharingDialog()
    // }
    await this.saveFile('fromshare')
    this.isloading = false
    this.sharingDialog()
  }

  EditSharedEmail(sharingrecord) {
    if (this.profiledata.type == 'individual' || (sharingrecord && sharingrecord.toid && sharingrecord.toid.type == 'individual')) {
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '900px',
        height:'630px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'test',
        data: { content: this.selectedDoc, emails: [], text: 'owner', title: "Signature", SharedRecordEdit: sharingrecord }
      });
      filedialog.afterClosed().subscribe(async result => {
        if (result == true || result == false || result) {
          this.recepients = true
          this.sharebutton = true
          this.isloading = true
          // await this.documentFieldDataGetting();
          this.sharedpeoples(this._id)
          if (result) {
            this.isloading = false
            // this.documentService.openSnackBar("Shared Successfully", "X")
            // this.header_button = 'review'
          }
          else {
            this.isloading = false;
          }
        }
      });
    }
    else {
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: true,
        autoFocus: false,
        panelClass: 'orgn',
        data: { content: this.selectedDoc, emails: [], text: 'owner', title: "Signature", SharedRecordEdit: sharingrecord }
      });
      filedialog.afterClosed().subscribe(async result => {
        if (result == true || result == false || result) {
          this.recepients = true
          this.sharebutton = true
          this.isloading = true
          // await this.documentFieldDataGetting();
          this.sharedpeoples(this._id)
          if (result) {
            this.isloading = false
            // this.documentService.openSnackBar("Shared Successfully", "X")
            this.header_button = 'review'
          }
          else {
            this.isloading = false;
          }
        }
      });
    }
  }

  // Revoke the shared email
  revokeFun(i) {
   
    console.log()
    if (i.revoke) 
    {
      var revokeStatus = 'Un Revoke'
      i.revokeStatus = 'Un Revoke'
    }
    else 
    {
      var revokeStatus = 'Revoke'
      i.revokeStatus = 'Revoke'
    }
    var content = 'Are you sure?, You want to ' + revokeStatus + ' the Sharing.' 
    if(content) {
      console.log(content)
      var contentdata=[]
      contentdata =content.split(',')
      console.log(contentdata)
    }
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: contentdata[0],data:contentdata[1]}, width: '500px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        i.revoke = !i.revoke
       
        this.documentService.sharingupdate(i).subscribe(data => {
          this.documentService.openSnackBar("Changes are updated", "X");
        })
      }
    });
  }

  //Remove the Shared file
  RemoveShareduser(doc) {
    var deleteDoc = true;
    if (this.oldFieldData.some(x => x.people == doc.toemail)) deleteDoc = false;
    if (deleteDoc) {
      const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
        { data: { name: 'delete1' }, width: '500px', panelClass: 'deletemod' });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        if (result) {
          this.documentService.RemoveShareduser(doc).subscribe(data => {
            this.documentService.openSnackBar("Shared email removed the access on document", "X");
          });
          this.sharedemails.splice(this.sharedemails.indexOf(doc), 1);
          if (this.sharedemails.length==0) {
            this.selectedDoc.isSent = false
            // this.selectedDoc.status = 'upload'
            this.documentService.updatefolder(this.selectedDoc).subscribe(resp => {
              console.log(resp)
            })
          }
        }
      });
    }
    else {
      let username = doc.toemail
      if (doc.toid && doc.toid.type && doc.toid.type == "individual") username = doc.toid.name;
      else if (doc.toid && doc.toid.type && doc.toid.type == 'organisation') username = doc.toid.companyname;
      else if (doc.toid && doc.toid.type && doc.toid.type == 'employee') username = doc.toid.fname + ' ' + doc.toid.lname;
      else { username = doc.toemail.split('@')[0]; }
      let dialogRef22 = this.dialog.open(CommonDialogComponent,
        { data: { name: 'fields', cancel: false, content: username + " has assigned with field, you can't delete it." }, width: '500px', panelClass: "deletemod" });
      dialogRef22.afterClosed().subscribe(res1 => {
        dialogRef22.close();
      });
    }
  }

  sharingDialog() {
    this.documentService.getSelectedDoc(this._id).subscribe((data: any) => {
      var doc = data
      this.selectedDoc = data
      console.log(this.selectedDoc,"ooooooooooooo")
      this.disableShareButton = false;
      if (doc && doc._id) {
        if (this.profiledata.type == 'individual') {
          const filedialog = this.dialog.open(SharepopupComponent, {
            width: '900px',
            height:'630px',
            disableClose: true,
            autoFocus: true,
            panelClass: 'test',
            data: { content: this.selectedDoc, emails: this.emailarray, text: 'owner', title: "Signature" }
          });
          filedialog.afterClosed().subscribe(async result => {
            if (result == true || result == false || result) {
              this.recepients = true
              this.sharebutton = true
              this.isloading = true
              await this.documentFieldDataGetting();
              this.sharedpeoples(this._id)
              if (result) {
                this.isloading = false
                // this.documentService.openSnackBar("Shared Successfully", "X")
                this.header_button = 'review'
              }
              else {
                this.isloading = false;
              }
            }
          });
        }
        else {
          const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
            width: '900px',
            disableClose: true,
            autoFocus: false,
            panelClass: 'orgn',
            data: { content: this.selectedDoc, emails: this.emailarray, text: 'owner', title: "Signature" }
          });
          filedialog.afterClosed().subscribe(async result => {
            if (result == true || result == false || result) {
              this.recepients = true
              this.sharebutton = true
              this.isloading = true
              await this.documentFieldDataGetting();
              this.sharedpeoples(this._id)
              if (result) {
                this.isloading = false
                // this.documentService.openSnackBar("Shared Successfully", "X")
                this.header_button = 'review'
              }
              else {
                this.isloading = false;
              }
            }
          });
        }
      }
      else {
        this.recepients = true
        this.sharebutton = true
        this.documentService.openSnackBar("Not shared", "X")
      }
    });
  }

  //Drag functions 
  bindFunction() {
    setTimeout(function () {
      $(".field").unbind('mouseover');
      $(".field").unbind('mouseout');
      $(".field").bind('mouseover', function () {
        $(this).find("img.drag-icon").show();
      });
      $(".field").bind('mouseout', function () {
        $(this).find("img.drag-icon").hide();
      });
    }, 1000)
  }

  val(e) {
    this.getpdfSizes();
    console.log($("#doc-view").scrollLeft(),this.PdfLeftNosideBar,this.PdfLeft)
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filteremailcheck(value))
    );
    if (this.setF != '') {
      var left
      var pattern, fieldvalidationCheck
      if (this.setF == 'email') {
        pattern = "([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})"
        fieldvalidationCheck = true
      }
      else if (this.setF == 'mobilenumber') {
        pattern = "[0-9]{10}"
        fieldvalidationCheck = true
      }
      else
        pattern = null
        if(this.PdfLeft <0  && this.PdfLeftNosideBar < 0)  
          left = e.pageX  + $("#doc-view").scrollLeft()-$('#docsidebar').outerWidth(true);
        else if(this.PdfLeft >0 && this.PdfLeftNosideBar < 0)
            left = e.pageX - this.PdfLeft + $("#doc-view").scrollLeft()+this.PdfLeftNosideBar 
         else if(this.PdfLeftNosideBar > 0) 
           left = e.pageX - this.PdfLeft + $("#doc-view").scrollLeft()-0;
         else
          left = e.pageX  + $("#doc-view").scrollLeft()-$('#docsidebar').outerWidth(true)+this.PdfLeftNosideBar;

         
       
        
      var top = e.pageY - this.PdfTop + this.PdfTopScroll;
      console.log(e.pageY , this.PdfTop , this.PdfTopScroll)
      if (this.zoomVal != 1) {
        var l = 0;
        var NH = $(".page:first").height();
        var NW = $(".page:first").width() ;
        var heightPercentage = top / (NH / 100);
        top = (this.PdfHeight / 100) * heightPercentage;
        var widthPercentage = left / (NW / 100);
        left = (this.PdfWidth / 100) * widthPercentage;
        top = (this.PdfHeight / 100) * heightPercentage;
      }
      console.log(e.pageX)
      console.log(left)
      var originalLeft = left;//e.pageX - this.PdfLeft;
      console.log(this.PdfLeft,this.PdfLeftNosideBar);
      console.log(originalLeft);

      // var pw = $(".page:first").width()-8
       var pw = $(".page:first").width()-8
      
      if (this.setF == 'signature' || this.setF == 'initial' || this.setF == 'Stamp') {
        if ((originalLeft + 155) > pw) {
          console.log( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)) )
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode))) var diff = originalLeft + 155 - $(".page:first").width()+8.5;
          else var diff = originalLeft + 155 - $(".page:first").width()+4;
          left = left - diff ;
        }
        var field = { type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 155, height: 55 };
        this.fields.push(field);
      }
      else if (this.setF == 'Photo') {
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode))) var diff = originalLeft + 150 - $(".page:first").width()+8.5
          else var diff = originalLeft + 150 - $(".page:first").width()+4
          left = left - diff;
        }
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 150, height: 150 });
      } else if (this.setF == 'radiobutton' || this.setF == 'dropdown') {
        if(this.setF == 'dropdown') var height = 34
        else if(this.setF == 'radiobutton') var height = 24
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode))) var diff = originalLeft + 150 - $(".page:first").width()+8.5
          else var diff = originalLeft + 150 - $(".page:first").width()+4
          left = left - diff;
        }
        var option = 'first,second'
        var optionvalue = option.split(',')
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, opt: 'first,second', optionvalue: optionvalue, width: 150, height: height, 'css-font-size': '16px', 'css-font-family': 'Arial' });
        if(this.setF == 'radiobutton') this.fields[this.fields.length-1].radiobuttondisplay='side by side'
      }
      else if (this.setF == 'date') {
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode))) var diff = originalLeft + 200 - $(".page:first").width()+8.5
          else var diff = originalLeft + 200 - $(".page:first").width()+4
          left = left - diff;
        }
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 175, height: 24, pickerType: 'date', pickerT: 'calendar', dateacess: 'Edit', dateformats: 'dd/MM/yyyy', timeformats: 'hh:mm:ss', dateTimeformats: 'dd/MM/yyyy hh:mm', 'css-font-family': 'Arial', 'css-font-size': '16px', 'css-color': '#201d1d' });
      }
      else if (this.setF == 'checkbox') {
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
          var diff = originalLeft + 103 - $(".page:first").width()+8.5
          else
          var diff = originalLeft + 103 - $(".page:first").width()+4
          left = left - diff;
        }
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 103, height: 24 });
      }
      else if (this.setF == 'label') {
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
          var diff = originalLeft + 155 - $(".page:first").width()+8.5
          else
          var diff = originalLeft + 155 - $(".page:first").width()+4
          left = left - diff;
        }
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 155, height: 34, valueDecr: false, 'css-font-family': 'Arial', 'css-font-size': '16px', 'css-color': '#201d1d', placeholder: this.setF, pattern: pattern, fieldvalidationCheck: fieldvalidationCheck });
      }
      else {
        if ((originalLeft + 155) > pw) {
          if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
          var diff = originalLeft + 155 - $(".page:first").width()+8.5
          else
          var diff = originalLeft + 155 - $(".page:first").width()+4
          left = left - diff;
        }
        this.fields.push({ type: this.setF, id: this._id + '-' + Math.floor(100000 + Math.random() * 900000), left: left, top: top, class: 'field', emailvalid: true, width: 155, height: 32, valueDecr: false, 'css-font-family': 'Arial', 'css-font-size': '16px', 'css-color': '#201d1d', placeholder: this.setF, pattern: pattern, fieldvalidationCheck: fieldvalidationCheck ,minlengtherror :false,heightincrease:true});
      }
      this.bindFunction();
      this.setF = '';
      field = this.fields[this.fields.length - 1]
      setTimeout(() => {
        if (field.type) {
          this.editF = field
          console.log(this.editF)
          $("#" + field.id + "-input").attr("tabindex", 1).focus();
          $("#" + field.id + "-input").addClass("focuscolor");
          
        }
        this.onWindowPress(false, field.id, field)
        console.log("Timeout")
        if (field.type == 'date') this.assignRadio(field, 'pickerType')
      }, 10);
      $(".page").css("z-index", 8);
    }
    else {
      this.handleClick(e)
    }
  }
  

  updateNumber(key, type) {
    if (typeof this.editF[key] == "undefined") this.editF[key] = 0;

    if (type == "plus") this.editF[key] = this.editF[key] + 1;
    else if (this.editF[key] > 0) this.editF[key] = this.editF[key] - 1;
  }

  setPosition(e, field) {
    document.getElementById(field.id).onmousedown = function (event) {
      let shiftX = event.clientX - document.getElementById(field.id).getBoundingClientRect().left;
      let shiftY = event.clientY - document.getElementById(field.id).getBoundingClientRect().top;
      moveAt(event.pageX, event.pageY);
      // centers the field at (pageX, pageY) coordinates
      function moveAt(pageX, pageY) {
        field.left = pageX - shiftX
        field.top = pageY - shiftY
      }
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
      // (3) move the field on mousemove
      document.addEventListener('mousemove', onMouseMove);
      // (4) drop the field, remove unneeded handlers
      document.getElementById(field.id).onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.getElementById(field.id).onmouseup = null;
        field.left -= document.getElementById('docsidebar').offsetWidth;
        field.top -= document.getElementById('docheader').offsetHeight;
      };
    };
  }
  setField(f) {
    console.log(f)
    this.setF = f;
    this.hideshareform=false
    $(".page").css("z-index", -1);
  }

  assignRadio(f, key) {
    if (f.type == 'date' && key == 'pickerType') {
      setTimeout(() => {
        $(".date-clear").hide();
        $("." + f.pickerType + "-picker-dropdown").show();
        // alert($("." + f.pickerType + "-picker-dropdown").atr('class'));
        if (f.pickerType == 'date') {
          f.pickerT = 'calendar';
          f.dateformats = 'dd/MM/yyyy';
          f.timeformats, f.dateTimeformats = '';
        }
        else if (f.pickerType == 'time') {
          f.pickerT = 'timer';
          f.timeformats = 'hh:mm a';
          f.dateformats, f.dateTimeformats = '';
        }
        else {
          f.pickerT = 'both';
          f.dateTimeformats = 'dd/MM/yyyy hh:mm';
          f.dateformats, f.timeformats = '';
        }
      }, 10);
    }
  }

  interval
  onWindowPress(e, id, field) {
    if(this.header_button == 'insertField' || this.header_button == 'saveFile' )  
      $("#" + field.id+ "-input").resizable(); 
    var w = $("#" + id + "-input").width() ;
    var h =$("#" + id + "-input").height() 
    console.log(h, $("#" + id + "-input").parents("div.field").height())
    if (w != $("#" + id + "-input").parents("div.field").width() || h!= $("#" + id + "-input").parents("div.field").height() ) {
      var h = $("#" + id + "-input").height()
      var dw = $("#" + id).width() ;
      var dh = $("#" + id).height();
      if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
      var PW = $(".page:first").width() - 12;
      else
      var PW = $(".page:first").width() - 8;
      var l = field.left + w;
      $("#" + id).width(w).height(h);
      // $("#" + id + "-input" ).width(w).height(h);
    
      clearInterval(this.interval);
      console.log(this.interval)
      console.log(l, PW)
      if (l > PW) {
        if (field.type == 'label' || field.type == 'signature' || field.type == 'initial' || field.type == 'Photo' || field.type == 'Stamp' || field.type == 'radiobutton' || field.type == 'dropdown' || field.type == 'checkbox') {
         $('#'+id + "-input").addClass('disableresize')   
         if($("#" + field.id+ "-input").is('.ui-resizable') )
          $("#" + field.id+ "-input").resizable('destroy');                          
          setTimeout(() => {
            this.ResetFieldFonts(field)
            if(field.type == 'checkbox')      
              $("#" + field.id + "-input").children("input").width(dw).height(dh);            
          }, 100);
          $('body').css('cursor', 'auto');
          $("#" + id + "-input").width(dw).height(dh);
          $("#" + id).width(dw).height(dh);
        }
        else if (field.type == 'text' || (field.type == 'name') || field.type == 'mobilenumber' || field.type == 'email' || field.type == 'company' || field.type == 'date' ) {
          console.log($('#'+id + "-input").css('border-width'))
          if($("#" + field.id+ "-input").is('.ui-resizable') )
          $("#" + field.id+ "-input").resizable('destroy');
          $("#" + id + "-input").parents("div.field").width(dw);
          $("#" + id + "-input").parents("div.field").find("span.resizable-input").width(dw)
          $('body').css('cursor', 'auto');
          setTimeout(() => {
          $("#" + id + "-input").parent("span").width(dw).height(dh);  
          $("#" + id + "-input").width(dw).height(dh); 
          $("#" + id).width(dw).height(dh);
          }, 10);
          this.interval = setInterval(() => { $("#" + id + "-input").parent("span").width(dw); }, 1000)
        }
      } else {
        clearInterval(this.interval);
        console.log(this.interval)
      }
      if (field.type == 'checkbox') $("#" + id + "-input").find("input").width(w).height(h)
      // else if (field.type == 'radiobutton') {
      //   field.spanWidth = $("#" + id).find("span").width();

      // }
    }
    else{
      $('#'+id + "-input").removeClass('disableresize')
      // $('#'+id + "-input").parents("div.field").find("span.resizable-input").removeClass('disableresize')
    }
    this.callGlobalMouseMove = true;
    this.callGloablMouseDown = true
    this.ResetFieldFonts(field);
  }


  signatureValidation: any
  signatureImage;
  showImage(data) {
    if (this.signatureValidation && this.signatureValidation.length > 0) this.signatureImage = data;
    // this.signatureImage = data;
    this.type = "signaturepad"
  }

  isDisabled1(): boolean {
    return true;
  }

  isDisabled2(): boolean {
    return true;
  }

  pencolor = '#000000'
  isOpenPad = true
  colorcodefun(x) {
    this.pencolor = x
    this.isOpenPad = false;
    this.croppedImage = null
    this.cropimageData = null
    this.signatureValidation = null
    this.signatureImage = null
    setTimeout(() => {
      this.isOpenPad = true;
    }, 10);
    this.signature()
     this.signature()		
    this.signature()
  }

  // sendImage(data) {
  //   this.signatureImage = data;
  // }

  clearsign() {
    this.signatureImage = null;
    this.cropimageData = null;
    this.croppedImage = null;
    this.signatureValidation = false
  }

  signtype: any
  onFileSelected(fileInput: any, title: any, signtype) {
    console.log(fileInput, title)
    this.modelshow = true
    this.imageFile = fileInput
    if (title == "signature") {
      this.type = "fileupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      this.signtype = signtype
    }
    else if (title == "photo") {
      this.type = "photoupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
    }
    else if (title == "stamp") {
      this.type = "stampupload"
      this.filesToUpload = <Array<File>>this.imageFile.target.files;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
    this.modelshow = true
    this.cropimageData = event
    this.croppedImage = event.base64;
  }

  onPhotoSelected(fileInput: any, title: any) {
    this.imageFile = fileInput
    this.type = "photoupload"
  }

  onStampSelected(fileInput: any, title: any) {
    this.imageFile = fileInput
    this.type = "stampupload"
  }

  selectFont(font, preview) {
    this.fonttype = preview;
    this.fontstyle = font;
    this.type = "font"
  }

  save(preview) {
    this.fontvalue = preview;
  }

  // saveDocLogs(data, title) {

  //     var locationdata 
  //   // var locationdata = JSON.parse(localStorage.getItem('mylocation'));
  //   this.latitude = this.latitude ? this.latitude : (locationdata) ? locationdata.latitude : undefined;
  //   this.longitude = this.longitude ? this.longitude : (locationdata) ? locationdata.longitude : undefined;
  //   var sigdata = {
  //     signatureId: (title == 'signature' || title == 'initial') ? data._id : undefined,
  //     photoId: (title == 'Photo') ? data._id : undefined,
  //     stampId: (title == 'Stamp') ? data._id : undefined,
  //     uid: this.profiledata._id,
  //     email: this.profiledata.email,
  //     latitude: this.latitude,
  //     longitude: this.longitude,
  //     documentid: this._id,
  //     path: data.pemFilePath,
  //     message: title,
  //     created_at :data.created_at,
  //     IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
  //   };
  //   this.documentService.createfieldlogs(sigdata).subscribe(res => {
  
  //   })
 
  // }

  signatureSubmit = function (title) {
    if(this.editF)  $("#" + this.editF.id+ "-input").attr("contenteditable1",false)
    if (this.type == "signaturepad" && this.cropimageData && this.croppedImage) {
      var n = this.cropimageData.file.size
      var v = (n + 2 - ((n + 2) % 3)) / 3 * 4
      if (title == 'signature') document.getElementById("signatureModalBtn").click();
      else if (title == 'initial') document.getElementById("initialModalBtn").click();
      this.isloading = true
      var signatureData = { signdata: this.cropimageData, type: "signaturepad", signtype: title, uid: this.profiledata._id ? this.profiledata._id : null, email: this.profiledata.email ? this.profiledata.email : null }
      this.documentService.saveSignatureimages(signatureData).subscribe(data => {
        this.signData = data

        // this.saveDocLogs(this.signData, title);
        if (data) {
          this.editF.signatureId = data._id;
          this.editF.signaturebaseData = data.signaturebaseData
          this.editF.signatureType = data.type
          this.signatureImage = {}
          if (this.signtype == 'signature') $("#uploadCaptureInputFileSignature").val('');
          if (this.signtype == 'initial') $("#uploadCaptureInputFileInitial").val('');
          this.isloading = false
          this.type = null;
          this.signatureImage = null;
          this.cropimageData = null;
          this.signatureValidation = null;
        }
      })
    }
    else if (this.type == "fileupload" && this.imageFile) {
      this.cropimageData.file.name = this.filesToUpload[0].name
      this.cropimageData.uid = this.selectedDoc.uid
      this.filesToUpload = this.cropimageData;
      const formData: any = new FormData();
      const files = this.filesToUpload;
      this.cropimageData.file.name='signature.png'
      formData.append("uploads", this.filesToUpload.file, this.cropimageData.file.name);
      formData.append("type", "fileupload")
      formData.append("signtype", this.signtype)
      if (this.profiledata) formData.append("email", this.profiledata.email)
      if (this.profiledata) formData.append("uid", this.profiledata._id)
      if (title == 'signature') document.getElementById("signatureModalBtn").click();
      else if (title == 'initial') document.getElementById("initialModalBtn").click();
      this.isloading = true
      this.documentService.saveSignatureimages(formData).subscribe(data => {
        // this.saveDocLogs(data, title);
        this.imageFile = null
        this.croppedImage = null
        if (data) {
          this.editF.signatureId = data._id
          this.editF.path = data.path
          this.editF.size = data.size
          this.editF.signatureType = data.type
          this.editF.name = data.name
          this.editF.link = data.link
          this.editF.encryptedid = data.encryptedid
          $("#uploadCaptureInputFile").val('');
          this.isloading = false
          this.type = null;
          this.imagedata = null
        }
      });
    }
    else if (this.type == "font" && this.fonttype && this.fontstyle) {
      var fontSignatureData = { fonttype: this.fonttype, fontstyle: this.fontstyle, type: "font", signtype: title, uid: this.profiledata._id ? this.profiledata._id : null, email: this.profiledata.email ? this.profiledata.email : null }
      if (title == 'signature')
        document.getElementById("signatureModalBtn").click();
      else if (title == 'initial')
        document.getElementById("initialModalBtn").click();
      this.isloading = true
      this.documentService.saveSignatureimages(fontSignatureData).subscribe(data => {
        // this.saveDocLogs(data, title);
        if (data) {
          this.editF.signatureId = data._id
          this.editF.fontStyle = data.fontStyle
          this.editF.fontText = data.fontText
          this.editF.signatureType = data.type
          $("#uploadCaptureInputFile").val('');
          this.isloading = false

          this.type = null;
          this.preview = this.fonttype = this.fontstyle = null;
        }
      })
    }
    else this.documentService.openSnackBar("Select/Draw/Type/Choose " + title, 'X')
  }

  photoSubmit = function () {
    if(this.editF) $("#" + this.editF.id+ "-input").attr("contenteditable1",false) 
    if (this.cropimageData && (this.webcamImage || this.filesToUpload[0])) {
      var files = []
      if (this.type == "photoupload") {
        this.isloading = true
        document.getElementById("photoModalCloseBtn").click();
        files.push(this.filesToUpload[0]);
      }
      else {
        var blob = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
        files.push(blob);
        this.isloading = true
        document.getElementById("photoModalCloseBtn").click();
      }
      files.push(this.cropimageData.file)
      const formData: any = new FormData();
      files.forEach(element => {
        formData.append("uploads", element, element.name ? element.name : 'photo.png');
      })
      formData.append("type", this.type ? this.type : "captured")
      formData.append("authentication", this.editF.authentication == true ? true : false)
      if (this.profiledata) formData.append("email", this.profiledata.email)
      if (this.profiledata) formData.append("uid", this.profiledata._id)
      this.documentService.savePhotoimages(formData).subscribe(data => {
        this.isloading = false
        // this.saveDocLogs(data, "Photo")
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
          this.setPhoto()
        }
        else if (data.message)
          this.documentService.openSnackBar('Choose other photo', "X")
      }, error => {
        this.documentService.openSnackBar(error, "X")
      })
    }
  }

  stampSubmit = function () {
    if(this.editF) $("#" + this.editF.id+ "-input").attr("contenteditable1",false) 
    if (this.type == "stampupload") {
      this.isloading = true
      document.getElementById("stampModalBtn").click();
      this.cropimageData.file.name = this.filesToUpload[0].name
      this.cropimageData.uid = this.selectedDoc.uid
      this.filesToUpload = this.cropimageData;
      const formData: any = new FormData();
      const files = this.filesToUpload;
      this.cropimageData.file.name='stamp.png'
      formData.append("uploads", this.filesToUpload.file, this.cropimageData.file.name);
      formData.append("type", "stampupload")
      if (this.profiledata) formData.append("email", this.profiledata.email)
      if (this.profiledata) formData.append("uid", this.profiledata._id)
      this.documentService.saveStampimages(formData).subscribe(data => {
        // this.saveDocLogs(data, "Stamp")
        this.imageFile = null
        this.croppedImage = null
        this.imagedata = data
        if (data) {
          this.editF.stampId = data._id
          this.editF.path = data.path
          this.editF.size = data.size
          this.editF.name = data.name
          this.editF.link = data.link
          this.editF.encryptedid = data.encryptedid
          this.editF.stampType = data.type
          $("#uploadCaptureInputFileStamp").val('');
          this.isloading = false
        }
      });

    }
    else this.documentService.openSnackBar("Select/Choose Stamp", 'X')
    this.type = null;
    this.imagedata = null
  }

  // Resize event script
  public style: object = {};
  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }

  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }

  openModel = function (id, field) {
   
    
    this.signmodalopen = true
    this.req = false
    this.selectimg = null
    this.added = null
    this.countrylist = []
    this.showlist = false
    // this.tabactive = 'tab1'
    // if (this.profiledata.name)
    //   this.preview = this.userService.decryptData(this.profiledata.name)
    if (id == 'signatureModalBtn') {
      // setTimeout(() => {
      //   this.divsigpadWidth = $("#signaturrepadwidth").width();
      // }, 1000);
      // console.log(this.divsigpadWidth)

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
    //   setTimeout(() => {
    // this.divintpadWidth=$("#initialpadwidth").width();
    //   }, 1000);
    //   console.log(this.divintpadWidth)

      if (this.initialList.length > 0) this.tabactive = 'tab1';
      else this.tabactive = 'tab3'
    }
    if (!field.people || field.people == this.profiledata.email) {
      this.editF = field
      document.getElementById(id).click();
      if ((this.SignatureList.length == 0 && id == 'signatureModalBtn') || (this.initialList.length == 0 && id == 'initialModalBtn')) {
        setTimeout(() => {
          this.signature()
        }, 1000);
      }
    }
  }

  pdf;
  outline;
  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  onError(event) {

  }

  loadWaterMarks(title) {
    if (title == "Boldv") this.waterMark.weight = true
    if (title == "Italicv") this.waterMark.style = true
    if (title == "underlinev") this.waterMark.decoration = true
    this.loadWaterMark()
  }

  loadWaterMark() {
    let text: any = this.waterMark;
    //  var css ='';
    var fontSize = text.fontsize.substring(0, 2);
    // var contentL = text.content.length;
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

  saveWatermark(message) {
    if(message == 'save')
    {
      this.selectedDoc.waterMark = this.waterMark
      this.documentService.updatefolder(this.selectedDoc).subscribe(res => {
        this.documentService.openSnackBar("Water Mark Saved Successfully", "X")
      })
    }
    else if(message == 'delete')
    {
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'DeleteTemplate' ,content:"Are you sure you want to delete the Watermark?" }, width: '500px', panelClass: "deletemod", disableClose: true });
      dialogRef.afterClosed().subscribe(res => {
        if(res)
        {
          this.waterMark={ fontsize: '14px', content: '', fontfamily: 'Arial', color: '#201d1d', location: 'middle' };
          this.selectedDoc.waterMark = null
          this.documentService.updatefolder(this.selectedDoc).subscribe(res => {
            this.loadWaterMark()
            this.documentService.openSnackBar("Water Mark Deleted Successfully", "X")
          })
        }
      });
    }
  }

  handleClick(e) {
    this.clearselect = false
    var selection = window.getSelection();
    var oRange = selection.getRangeAt(0); //get the text range
    var oRect = oRange.getBoundingClientRect();
    this.getpdfSizes();
    //return false;
    this.commentedlines = selection.toString()
    console.log(selection.toString())
    var docwidth = document.getElementById('blog-post').offsetWidth;
    var top = oRect.top - this.PdfTop + this.PdfTopScroll;
    var left = oRect.left - this.PdfLeft

    if(this.PdfLeft <0  && this.PdfLeftNosideBar < 0)  
    left = oRect.left - this.PdfLeft;
  else if(this.PdfLeft >0 && this.PdfLeftNosideBar < 0)
      left = oRect.left - this.PdfLeft+this.PdfLeftNosideBar 
   else if(this.PdfLeftNosideBar > 0) 
     left = oRect.left - this.PdfLeft;
   else
    left = oRect.left - this.PdfLeft+this.PdfLeftNosideBar;


    // console.log(document.getElementById('docheader').offsetHeight , document.getElementById('progress_bar').offsetHeight,oRect.top,this.PdfTop,this.PdfTopScroll,top)
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
    if (selection.toString().length > 0) {
      var mousedata = {
        coordinatex: top,
        coordinatey: left,
        width: oRect.width,
        height: oRect.height,
        text: selection.toString(),
        message: 'selected',
        documentid: this._id,
        isFile: true,
        latitude: this.latitude,
        longitude: this.longitude,
        Address: this.Address,
        uid: this.profiledata._id,
        email: this.profiledata.email,
        IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
      }
    }
    // alert(top)
    this.coordinatex = top;
    this.coordinatey = left;
    this.coordinatewidth = oRect.width;
    this.coordinatehight = oRect.height;
    this.activeComment = [];
    console.log(oRect.height + "||||||||" + oRect.width)
    if (selection.toString().length > 0) {
    console.log(($('#staticbar-top').outerHeight(true)-$('#blog-post').outerHeight(true)))
      if(oRect.height <= 50)
      this.activeComment.push({ top: top - 2 +  (document.getElementById('progress_bar').offsetHeight + ($('#staticbar-top').outerHeight(true)-$('#blog-post').outerHeight(true))) , docwidth: docwidth, left: left, selectText: selection.toString(), comment: '', active: true, height: oRect.height, width: oRect.width, commentbtn: false })
    else
    this.documentService.openSnackBar("comments are not allowed for this text", "X");
    }
  }

  //clear text selection on doubleclick
  clearSelection() {
    console.log(document.selection)
    console.log(window.getSelection)
    if (document.selection && document.selection.empty) {
      document.selection.empty();
    } else if (window.getSelection) {
      var sel = window.getSelection();
      console.log(sel.toString())
      sel.removeAllRanges();
      console.log(sel.toString())
    }
  }

  commentfield(data) {
    data.commentbtn = !data.commentbtn
  }

  // Insert / add New comment on server
  addComment(val, commentdata) {
    this.comment = val.comment
    this.documentid = val._id
    this.editCommsentSection = true
    this.formSubmitted = true
    val.value.documentid = this._id,
      val.value.commentedlines = this.commentedlines,
      val.value.coordinatex = this.coordinatex,
      val.value.height = this.coordinatehight,
      val.value.width = this.coordinatewidth,
      val.value.coordinatey = this.coordinatey
    val.value.showComment = true
    val.value.uid = this.profiledata._id
    val.value.email = this.profiledata.email
    val.value.name = this.profiledata.name
    if (val.value.comment && val.value.comment.length) {
      this.formSubmitted = false
      this.documentService.postcomments(val.value).subscribe((data: any) => {
        commentdata.commentbtn = false
        this.activeComment = []
      })
    }
  }

  replyForm
  replycomment(data) {
    console.log("oklll")
    this.selectorid = data._id
    // this.editCommsentSection = false
  }

  replycommentdata(val, commentForm) {
    this.formSubmitted = true
    if (commentForm.value.replyField && commentForm.value.replyField.length) {
      this.replyData = {
        documentid: val.documentid,
        commentedlines: val.commentedlines,
        coordinatex: val.coordinatex,
        coordinatey: val.coordinatey,
        parentcommentid: val._id,
        comment: commentForm.value.replyField,
        uid: this.profiledata._id,
        email: this.profiledata.email,
        name: this.profiledata.name
      }
      this.documentService.replycomments(this.replyData).subscribe(data => {
        this.formSubmitted = false
        commentForm.resetForm()
      })
    }
  }

  commetClose(data) {
    data.commentbtn = false
  }

  opening(val) {
    if (this.profiledata._id == val.uid._id || this.profiledata.email == val.uid.email) {
      this.reply = false
    }
    if (this.profiledata._id != val.uid._id || this.profiledata.email != val.uid.email) {
      this.reply = true
    }
  }

  comment1(val) {
    this.editCommsentSection = true
    this.comment = val.comment
    this.documentid = val._id
  }

  editcomment(val) {
    if (val.value.comment && val.value.comment.length)
      this.documentService.editcomments(val.value).subscribe(data => {
        this.editCommsentSection = false
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
    this.editCommsentSection = false
  }

  //Chat function
  chatOpen() {
    // this.shareform = !this.shareform
    // this.closeChat = !this.closeChat
    this.openChat = !this.openChat
    if (this.openChat) {
      this.shareform = false
      // this.watermarkset = false;
    }
    else {
      this.shareform = true
      // this.openChat = false;
      // this.watermarkset = false;
    }
    this.closeEditform()
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

  isCalledngOnDestroy=false
  ngOnDestroy() {
    this.isCalledngOnDestroy=true
    if (this.onlinedata)
      this.generalservice.offline(this.onlinedata).subscribe(data => { })
    if (this.auditlogs)
      this.generalservice.updatetime(this.auditlogs, this.endtime).subscribe(data => {
        this.auditlogsResult = data
      });
      if(this.IframePrint !==  '') this.IframePrint.parentNode.removeChild(this.IframePrint); 
    this.socketDisconnect()
    this.globalMouseMove();
    this.globalMouseUp();
    clearInterval(this.clearintervaldata);
  }

  getonlineusers() {
    this.generalservice.GetonlineUsers(this._id).subscribe((data:any) => {
      console.log(this.onlineusers)
      this.onlineusers = data
    })
  }

  socketDisconnect() {
    //console.log("share view disconnect")
    let type = { type: "disconnect" }
    this.dataservice.Connectsocket(type).subscribe(quote => { });
  }



  showeditbtn() {
    this.editversion = true
  }

  selectversion(version) {
    this.selectedVersion = version;
  }

  canedit = false;
  hideedit = true;
  hidesave = false;
  selectedTemplateId: any;

  editTemplatename(t) {
    this.copdocument = Object.assign({}, t)
    this.templateid = t._id;
    this.TemplateName = t.templatename;
    if (this.templateid == t._id) {
      this.templateedit = true;
      this.selectedTemplateId = t._id;
      this.buttonhide = t._id;
      this.lastSelect = t._id;
    }
  }

  Selected(t) {
    console.log("ff",t)
    if (this.lastSelect != t._id) this.templateedit = false;
  }

  cancelButton(data) {
    this.templateid = data._id;
    data.templatename = this.TemplateName;
    this.templateedit = false;
  }

  editVersionName(field) {
    this.copdocument = Object.assign({}, field)
    this.canedit = true;
    this.selectedVersion = field._id;
    this.hidesave = true;
    this.hideedit = false;
  }

  versionNameRequired: any = false;
  saveversionfield(field) {
    this.versionNameRequired = false;
    if (field.versionname != '') {
      this.documentService.editVersionName(field).subscribe(currentVersionDocFields => {
        this.getAllDocVersions()
        this.editversion = false
      });
      this.canedit = false;
      this.hideedit = true;
      this.hidesave = false;
    }
    else this.versionNameRequired = true;
  }

  async restoreVesrion(versionid) {
    if (await this.canSave()) {
      var newDoc = JSON.parse(JSON.stringify(this.selectedDoc))
      newDoc.versionid = versionid;
      this.documentService.updatefolder(newDoc).subscribe(data => {
        this.back()
      });
    }
    else this.documentService.openSnackBar("You can't save the changes on this file because, some one already submited their details", "X");
  }

  async back() {
    this.restorebtn = false
    this.selectedversionid = null
    this.restoreVersionId = null;
    this.canedit = false;
    this.hideedit = true;
    this.hidesave = false;
    this.versionNameRequired = false;
    this.buttonActive('review');
    this.shareform = true
    this.isloading = true;
    this.copdocument = null
    await this.documentFieldDataGetting();
    this.isloading = false;
    this.editF = null
  }

  auditlog(uid) {
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    var mousedata = {
      message: 'Viewed',
      documentid: this._id,
      isFile: true,
      latitude: this.latitude,
      longitude: this.longitude,
      Address: this.Address,
      uid: this.profiledata._id,
      email: this.profiledata.email,
      IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
    }
    this.documentService.savemousemovement(mousedata).subscribe(data => {
      this.auditlogs = data
    });
  }

  restoreVersionId: any;
  currentVersionDoc = function (version) {
    this.restorebtn = true;
    this.restoreVersionId = version._id;
    this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this._id, versionid: version._id }).subscribe(currentVersionDocFieldOptions => {
      this.fields = currentVersionDocFieldOptions;
      // document.getElementById("versionModal").click()
    });
  }

  selectedversionid
  templateid
  choosedversion(id) {
    if (this.selectedversionid != id) {
      this.canedit = false;
      this.hideedit = true;
      this.hidesave = false;
    }
    // if (!this.hidesave) {
    this.selectedversionid = id;
    // }
  }

  removefavorite() {
    this.favoritedoc.forEach(element => {
      var data = { _id: element._id }
      this.removefav = false
      this.documentService.removefavorite(data).subscribe(data => {
        this.documentService.openSnackBar("Removed from favorite Successfully", "X")
      });
    })
  }

  favorite() {
    var data = { name: this.selectedDoc.name, fileid: this._id, isFile: this.selectedDoc.isFile }
    this.removefav = true
    this.documentService.createfavorite(data).subscribe(data => {
      this.documentService.openSnackBar("Added to favorite Successfully", "X")
    })
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

  ShowCfield(Cfield, fType) {
    if (this.editF.type = Cfield.fType && Cfield.type == fType) return true;
    else return false;
  }

  selectOption(f) {
    console.log(f)
    if (f.assingto) {
      console.log(this.editF[f.assingto])
      if (this.editF[f.assingto] != f.value) this.editF[f.assingto] = f.value;
      else this.editF[f.assingto] = false;
    }
    console.log(this.editF)
    this.updateFieldCss(this.editF)
  }

  /// Lable Field Settings //
  lableKeyUp(event, field) {
    if (field.type == 'label') {
     
      $('#' + field.id + '-input').css('font-size', field['css-font-size']);
    }
    else {
      var fontsize = $('#' + field.id + '-input').css('font-size');
      //if (event.target.value.length > 30) field.width = event.target.value.length * fontsize.substring(0, fontsize.length - 2) / 2;
      field.value = event.target.value;
    }
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    // if (value <= 360) {
    //   return Math.round((value * 100) / 360) + '%';
    // }
    return value
  }

  // End
  updateFromMobile(newContent) {
    if (this.selectedDoc._id == newContent.documentid) {
      if ((newContent.type == 'signature' || newContent.type == 'initial') && newContent.signatureId && newContent.signaturebaseData && newContent.signatureType) {

        if (newContent.type == 'signature') document.getElementById("signatureModalCloseBtn").click();
        else if (newContent.type == 'initial') document.getElementById("initialModalCloseBtn").click();
        this.fields.forEach(field => {
          if(field) $("#" + field.id+ "-input").attr("contenteditable1",false)  
          if (field.id != newContent.fieldid) return;
          field.signatureId = newContent.signatureId;
          field.signaturebaseData = newContent.signaturebaseData;
          field.signatureType = newContent.signatureType;
          field.path = newContent.path
          field.size = newContent.size
          field.name = newContent.name
          field.link = newContent.link
          field.encryptedid = newContent.encryptedid
          field.created_at = newContent.created_at
        })
      }
      else if (newContent.type == 'photo' && newContent.photoId && newContent.photoType) {
        document.getElementById("photoModalCloseBtn").click();
        // uploadlinkForm.resetForm()
        // this.selectimg=null
        // this.countrylist=[]
        this.fields.forEach(field => {
          if(field) $("#" + field.id+ "-input").attr("contenteditable1",false)  
          if (field.id != newContent.fieldid) return;
          field.photoId = newContent.photoId;
          field.photoType = newContent.photoType;
          field.photobaseData = newContent.photobaseData
          field.path = newContent.path
          field.size = newContent.size
          field.name = newContent.name
          field.link = newContent.link
          field.encryptedid = newContent.encryptedid
          field.created_at = newContent.created_at
        })
      }
      else if (newContent.type == 'stamp' && newContent.stampId && newContent.stampType) {
        document.getElementById("stampModalCloseBtn").click();
        this.fields.forEach(field => {
          if(field) $("#" + field.id+ "-input").attr("contenteditable1",false)  
          if (field.id != newContent.fieldid) return;
          field.stampId = newContent.stampId;
          field.stampType = newContent.stampType;
          field.path = newContent.path
          field.size = newContent.size
          field.name = newContent.name
          field.link = newContent.link
          field.encryptedid = newContent.encryptedid
          field.created_at = newContent.created_at
        })
      }
    }
  }

  req: boolean = false
  mobileNumberValidation(form, fromsendlink) {
    this.req = false
    if (!fromsendlink) this.resend = false
    if (form.value.enteredvalue != null && this.added != null) {
      var phnnumber = this.added + String(form.value.enteredvalue)
      var number = form.value.enteredvalue.toString()
      if (number.length > 4) {
        var c = phoneUtil.parse(phnnumber);//It should works and give you some output
        var isValid = phoneUtil.isValidNumber(c); // returns true
        // this.req = !isValid
        if (isValid) return phnnumber
        else return false
      }
      else return false
    }
    else return false

  }

  sendLink = function (uploadlinkForm, valid, type) {
    this.req = false
    if (this.added != null && uploadlinkForm.value.enteredvalue) {
      var val = this.mobileNumberValidation(uploadlinkForm, true)
      this.req = val ? false : true
      if (valid == true && val) {
        uploadlinkForm.value.added = this.added
        uploadlinkForm.value.phNumber = val
        uploadlinkForm.value.type = type;
        uploadlinkForm.value.documentid = this.selectedDoc._id;
        uploadlinkForm.value.fieldid = this.editF.id;
        uploadlinkForm.value.uid = this.profiledata._id;
        uploadlinkForm.value.email = this.profiledata.email;
        uploadlinkForm.value.fromIP=(this.IpAddress)? this.IpAddress.ip : 'not avilable'
        if (this.editF.authentication) uploadlinkForm.value.authentication = this.editF.authentication;
        this.documentService.sendingLink(uploadlinkForm.value).subscribe(data => {
          this.resend = true
          // uploadlinkForm.resetForm()
          // this.selectimg=null
          // this.countrylist=[]

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
  css(a) {
    var sheets: any = document.styleSheets, o = {};
    for (var i in sheets) {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        if (a.is(rules[r].selectorText)) {
          o = $.extend(o, this.css2json(rules[r].style), this.css2json(a.attr('style')));
        }
      }
    }
    return o;
  }

  css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
      for (var i in css) {
        if ((css[i]).toLowerCase) {
          s[(css[i]).toLowerCase()] = (css[css[i]]);
        }
      }
    } else if (typeof css == "string") {
      css = css.split("; ");
      for (var i in css) {
        var l = css[i].split(": ");
        s[l[0].toLowerCase()] = (l[1]);
      }
    }
    return s;
  }





  isEqual(value, other) {
    var type = Object.prototype.toString.call(value);
    // If the two objects are not the same type, return false
    if (type !== Object.prototype.toString.call(other)) return false;
    // If items are not an object or array, return false
    if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
    // Compare the length of the length of the two items
    var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
    var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
    if (valueLen !== otherLen) return false;
    // Compare properties
    if (type === '[object Array]') {
      for (var i = 0; i < valueLen; i++) {
        if (this.compare(value[i], other[i]) === false) return false;
      }
    } else {
      for (var key in value) {
        if (value.hasOwnProperty(key) && other.hasOwnProperty(key)) {
          if (this.compare(value[key], other[key]) === false) return false;
        }
      }
    }
    // If nothing failed, return true
    return true;
  };
  // Compare two items
  compare(item1, item2) {
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!this.isEqual(item1, item2)) return false;
    }
    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
    }
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
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }

  dataURItoBlob(dataURI) {
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

  savePhoto() {
    if (this.webcamImage) {
      var blob = this.dataURItoBlob(this.webcamImage.imageAsDataUrl);
      var fd = new FormData(document.forms[0]);
      fd.append("canvasImage", blob, 'photo.png');
      fd.append("type", "captured");
      var data = { photobaseData: this.webcamImage.imageAsDataUrl, type: "captured" }
      this.documentService.savePhotoimages(fd).subscribe((data: any) => {
        if (data && this.editF) {
          this.editF.photoId = data._id
          this.editF.photobaseData = data.photobaseData
          this.editF.photoType = data.type
          this.webcamImage = null;
          this.showWebcam = false;
          this.errors = null;
          $("#uploadCaptureInputFile").val('');
          this.isloading = false
        }
      });
    }
    else {
      this.documentService.openSnackBar("First Capture the photo", "X");
    }
  }

  //// Authentication
  authenticate: Boolean = false
  authIput
  camLoaderSuccess: Boolean = false
  camLoaderFail: Boolean = false
  mediaConstraints: any = {
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    }, audio: true
  };
  authenticateFun = async function  (id) {
    if(navigator.mediaDevices) navigator.mediaDevices.getUserMedia(this.mediaConstraints).then(this.authenticateCheck.bind(this,id), this.cameraErrorCallback.bind(this));
    else this.cameraErrorCallback({name:'Mediainterface does not support'})
   }
   authenticateCheck(id)
   {
     this.authIput = id
     this.authenticate = true;
   }
   cameraErrorCallback(error) {
     let str = String(error)
     let err
     if (str.includes('Requested device not found') || error.name.includes('NotFoundError') || error.message.includes('Invalid constraint')) err = 'Camera not found'
     else if (str.includes('Permission dismissed')) err = 'Camera Permission dismissed'
     else if (str.includes('Permission denied') || error.name.includes('NotAllowedError' || error.message.includes('The request is not allowed by the user agent or the platform in the current context, possibly because the user denied permission.')) || error.name.includes('PermissionDeniedError')) err = 'Camera Permission denied'
     else if (str.includes('Could not start video source') || error.name.includes('AbortError')) err = 'Already camera running for other purpose'
     else if (error.name.includes('Mediainterface does not support') || !navigator.mediaDevices) err = "Your browser doesn't support MediaInterface to acces webcam"
     else err = error.message | error.name
     this.showWebcam = false
     console.log(err,error)
     let dialogRef22 = this.dialog.open(CommonDialogComponent,
       { data: { name: 'videorecord', cancel: false, content: err }, width: '500px', panelClass: "deletemod" ,disableClose:true});
     dialogRef22.afterClosed().subscribe(res1 => {
       // this.router.navigate(['//Sharereview/'+this.sharedid+'/'+this.fileid]);
     });
     // this.documentService.openSnackBar(err,"X")
   }
  modelClosing(event: any) {
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
  setPhoto() {
    var data = this.savedPhoto
    if (data && this.editF) {
      if (data._id) this.editF.photoId = data._id
      if (data.type) this.editF.photoType = data.type
      if (data.path) this.editF.path = data.path
      if (data.size) this.editF.size = data.size
      if (data.name) this.editF.name = data.name
      if (data.link) this.editF.link = data.link
      if (data.encryptedid) this.editF.encryptedid = data.encryptedid
      if (data.photobaseData) this.editF.photobaseData = data.photobaseData
      this.imageFile = null
      this.croppedImage = null
      this.type = null;
      this.imagedata = null
      $("#uploadCaptureInputFile").val('');
      // this.saveDocLogs(data, 'Photo');
      document.getElementById("photoModalCloseBtn").click();
    }
  }

  Cancel() {
    this.webcamImage = null;
  }


  tabOpen(title) {
    this.tabactive = title;
    this.croppedImage = this.imageFile = null;
    this.showlist = false
  }

  // versions1 = false
  showversion() {
    // this.versions1 = true
    this.getAllDocVersions();
    // this.header_button = 'versions';
  }

  public cameraWasSwitched(deviceId: string): void {
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
        } else {
        }
      } else {
      }
    }, error => {
    })
  }

  inc(field) {
    this.editF[field]++
    // =field+1
  }

  dec(field) {
    this.editF[field]--
    // field=field-1
  }

  commentid
  openSpecificComment(data) {
    console.log('comment')
    // if(this.header_button != 'review')
    {
      this.comment = null
      this.commentid = data._id
      data.showComment = !data.showComment
    }
  }

  //Check page number while pdf scrolling
  onPdfScroll(e) {
    var scroll = $("#doc-view").scrollTop();

    //CHECK PDF heights LOADED OR NOT
    var h = 0;
    var PDFheights = [];
    var i = 0;
    $("div.pdfViewer").find("div.page").each(function () {
      PDFheights.push({ start: h, end: h + $(this).height() })
      h = h + $(this).height();
    })
    PDFheights.forEach(page => {
      i++;
      if (page.start <= scroll && page.end >= scroll) this.pageNo = i++;
    });
  }
  pageNo: any = 1;

  ///// Heat maps start
  //heat maps 
  viewedcount = 0;
  selectedcount = 0
  name: any = [];
  heatmaps
  heatMaps() {
    this.header_button = 'heatmaps'; // Declare button Active
    var doc = { _id: this._id }
    this.selectedcount = 0; this.viewedcount = 0;
    this.documentService.getDocumentLogs(doc).subscribe(data => {
      console.log(data)
      this.heatmaps = data;

      if (this._id) {
        for (var i = 0; i < this.heatmaps.length; i++) {
          if (this.heatmaps[i].message == 'Viewed') {
            this.viewedcount += 1;
          }
          else if (this.heatmaps[i].message == 'selected') {
            this.heatmaps[i].top = this.heatmaps[i].coordinatex - 17;


    if(this.PdfLeft <0  && this.PdfLeftNosideBar < 0)  
    this.heatmaps[i].left = this.heatmaps[i].coordinatey - 2 ;
  else if(this.PdfLeft >0 && this.PdfLeftNosideBar < 0)
  this.heatmaps[i].left = this.heatmaps[i].coordinatey - 2+this.PdfLeftNosideBar 
   else if(this.PdfLeftNosideBar > 0) 
   this.heatmaps[i].left = this.heatmaps[i].coordinatey - 2;
    else
      this.heatmaps[i].left = this.heatmaps[i].coordinatey - 2+this.PdfLeftNosideBar;

            this.heatmaps[i].left = this.heatmaps[i].coordinatey - 5;
            this.heatmaps[i].tooltipleft = (this.heatmaps[i].width / 2) - 75;
            console.log("top", this.heatmaps[i].top);
            console.log("left", this.heatmaps[i].left)
            this.heatmaps[i].diff = this.getDataDiff(new Date(this.heatmaps[i].createdAt), new Date(this.heatmaps[i].updatedAt));            
            this.selectedcount = 1;
            console.log(this.heatmaps[i])
          }
        }
      }
    });
  }

  mouseentered(data) {
    // return false;
    console.log(data)
    var heat = this.heatmaps.filter(x => x.message == 'selected');
    this.selectedcount = 0, this.name = [];
    for (var i = 0; i < this.heatmaps.length; i++) {
      if (this.heatmaps[i].message == 'selected' && Math.round(this.heatmaps[i].coordinatex) == Math.round(data.coordinatex)
        && Math.round(this.heatmaps[i].coordinatey) >= Math.round(data.coordinatey) && 
        Math.round(this.heatmaps[i].coordinatey) < Math.round(data.coordinatey + data.width)) {
        if (this.heatmaps[i].uid.name) { this.name.push({ name: this.heatmaps[i].uid.name, date: this.heatmaps[i].created_at,diff : this.heatmaps[i].diff }); }
        else { this.name.push({ name: this.heatmaps[i].email.split('@')[0], date: this.heatmaps[i].created_at ,diff : this.heatmaps[i].diff}); }
        this.selectedcount += 1;
        // this.heatmaps[i].diff = this.getDataDiff(new Date(this.heatmaps[i].createdAt), new Date(this.heatmaps[i].updatedAt));            

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

  // PdfGet Pdf Download URL
  pdfDownload(token) {
    if (this.downloadFile == 'withoutchanges') this.withlog = undefined;
    var downloaddata = {
      id: this.selectedDoc._id,
      name: this.selectedDoc.name,
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
      document.getElementById('downloadtmp').click()
      this.isloading = true;
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
          document.getElementById('downloadtmp').click()
          this.isloading = true;
          this.documentService.pdfDownload(downloaddata).subscribe((data: any) => {
            if (downloaddata.email && downloaddata.downloadType == "attachment") {
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

  //Header Button Make Active, We will assign value ti header_button field
  buttonActive(value) {
    console.log(value)
    this.header_button = value;
    for (let field of this.fields) {
      console.log($("#" + field.id+ "-input").is('.ui-resizable')      )
        if(this.header_button == 'insertField' || this.header_button == 'saveFile')
        {
          $(".ui-resizable-se").addClass("ui-icon")
          $("#" + field.id+ "-input").resizable();
        
        // this.getFieldHeight(field)
        }  
     
        else 
        {
          $(".ui-resizable-se").removeClass("ui-icon")

        }
     
    }
  }

  printpdfDoc() {
    this.isloading = true;
    this.documentService.pdfPrint(this.selectedDoc).subscribe((data: any) => {
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
        iframe.contentWindow.print();
        this.IframePrint = iframe;
        /*iframe.contentWindow.close()
        document.close();
        iframe.document.close()
        iframe.parentNode.removeChild(iframe); 
        alert('sdfsdf')
        
        setTimeout(() => {
          //iframe.contentWindow.close()
          iframe.parentNode.removeChild(iframe); 
          
        }, 6000);*/
        
      }
      xhr.send()
    })
  }

  validateemail(field) {
    console.log(field)
    var pattern = field.pattern
    if (field.value && field.value != '') {
      var regexp = new RegExp(pattern)
      field.fieldvalidationCheck = false;
      console.log(regexp.test(field.value))
      if (regexp.test(field.value))
        field.fieldvalidationCheck = true;
    }
  }

  ////////////////////////////////////////////////notification start///////////////////////////////////////////////////////////////////
  // getNotification() {
  //   this.generalservice.getnotification().subscribe((data: any) => {
  //     this.NotificationData = data;      
  //   })
  // }

  // gets all the notifcation of the user
  getOfflineNotification() {
    this.generalservice.getOfflinenotification().subscribe((data: any) => {
      this.notificationlogs = data
      if (this.notificationlogs) this.Notificationscount = this.notificationlogs.filter(x => !x.read).length;
      console.log(this.notificationlogs, this.Notificationscount);
      this.resultData = this.notificationlogs.find(x => x.created_at);
      if (this.resultData)
        this.notificationlogs.forEach(element => {
          element.created_at;
          element.fromEmail = (element.fromid && element.fromid.name) ? element.fromid.name : (element.fromemail).split('@')[0];
          // element.fromEmail = (element.fromemail).split('@')[0];
          element.diff = this.getDataDiff(new Date(element.created_at), new Date());
        });
    });
  }

  // clears selected notification
  clearnotification(id) {
    id.active = false
    this.generalservice.markedread(id).subscribe(data => {
      this.getOfflineNotification()
    })
  }


  shownofication() {
    // $("html").css("overflow-x", "hidden");
    this.notificationshow = true
  }

  hide() {
    console.log("calllll")
    // $("html").css("overflow-x", "auto");
    this.notificationshow = false
    this.hideshareform=false
    this.mobiletogglebutton=false

 
  }
  hideinsertfields(){
    this.hideshareform=false
  }

  @HostListener('scroll')
  public asd(): void {
    this.notificationshow = false
    console.log('scrolling');
  }

  // clearing all the notification
  clearAllNotifications(data) {
    this.generalservice.clearAllNotifications(data).subscribe(data => {
      this.getOfflineNotification();
      this.notificationlogs = [];
    });
  }

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

  async confirmationdialog() {
    return new Promise(async (resolve, reject) => {
    if (!this.isloading) {
      // if (!await this.isEqual(this.fields, this.oldFieldData)) {
        this.isAlreadyOpened = true
        let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'exitdialog' }, disableClose: true, width: '500px', panelClass: "deletemod" });
        console.log("dialog called")
        dialogRef.afterClosed().subscribe(async res => {
          console.log(res)
          if (res) {
            await this.saveFile('fromsave')
            // return this.Locations.back();
            resolve()
          }
          else if (res == false)
            // return this.Locations.back();
            resolve()
        });
      // }
      // else
        // return this.Locations.back();
        // return
    }
    else {
      // return this.Locations.back();
      resolve()
    }
  })
  }

  navigationBackButton() {
    this.Locations.back()
  }

  showdropdown(event, title) {
    console.log(title)
    this.showlist = true
    this.listshow = false
    this.mobiledemo = !this.mobiledemo

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

  sharethisdocument() {
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'sharetonew' }, width: '500px', panelClass: "deletemod", disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'newfilename' }, width: '500px', panelClass: "deletemod", disableClose: true });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
            this.isloading = true
            this.documentService.pdfDownload({ id: this.selectedDoc._id, sharethisdocument: true, filename: res }).subscribe((data: any) => {
              if (data.encryptedid) {
                // this.selectedDoc = null
                // this.fields = []
                // this.oldFieldData = []
                this.isloading = false
                // this._id = data._id
                // this.id = data.encryptedid
                // this.sharedpeoples(this._id)
                // this.router.navigate(['filecont/:id'], { queryParams: { id: data.encryptedid, _id: data._id } });
                // this.ngOnInit()
                var filedata={
                  fileid:data._id
                }
                this.documentService.encryptedvalues(filedata).subscribe((newdata:any)=>{
                  window.open(this.frontendconfig.frontendurl + '/filecont/' + newdata.encryptdata, '_blank');

                })

              }
              else {
                this.isloading = false
              }
            },error => {
              this.isloading=false
              console.log(error)
            })
          }
          else console.log("No File Name")
        });
      }
      else console.log("No sharing")
    }
    );
  }










// ============================================Change Password Start===============================================
  // check old passsword
  checkpassword(oldPassword) {
    this.samePassword = oldPassword;
    if (oldPassword != '' && oldPassword!=undefined) {
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

  validate1(password) {
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
    this.validate1(oldPassword)
  }

  cancel1(user) {
    if (user) { user.resetForm(); this.formSubmitted = false; this.isOldPassword = false; this.isOldPassword1 = false }
  }
  // ================ new password update ===============================================
  otpfun = function (user) {
    this.errorres = ""
    this.displayerror = false
    this.formSubmitted = true
    if (user.valid && user.value.oldpass != user.value.newpass && user.value.newpass == user.value.pwd3 && !this.isOldPassword) {
      user.value.IpAddress=(this.IpAddress)? this.IpAddress.ip :  'not avilable'
      this.userService.changePass(user.value).subscribe(data => {
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
  //field focusing on selecting properties
fieldfocusing(field)
{
  if(field.type  )
    {
   
    $("#" + field.id+ "-input").attr("tabindex", 1).focus();
      $("#" + field.id+ "-input").addClass("focuscolor");
    }
}
// Restrictspacekey in change password
Restrictspacekey(event) {
  
  if (event.keyCode == 32) {
  
      return false;
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


}

hidetemplatemodel(){
  document.getElementById("savetempclose").click();
  this.existingtemplate = true
  
}
showmobiletoggle(data){
  if(data=='show'){
    this.mobiletogglebutton=true

  }
  else if(data=='hide'){
  this.mobiletogglebutton=false

  }
}
}
export interface User { email: string; }
