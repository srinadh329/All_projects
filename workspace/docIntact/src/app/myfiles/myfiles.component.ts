import { Component, Input, SimpleChanges, ViewChild, Output, EventEmitter, OnInit, AfterViewInit, ChangeDetectorRef, AfterViewChecked, ViewEncapsulation, HostListener,NgZone, ɵConsole, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';
import { Subject } from 'rxjs/Subject';
import { MovetoComponent } from '../moveto/moveto.component';
import { ModalDirective } from 'angular-bootstrap-md';
import { DocumentService } from '../document.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from "@angular/router";
import { ActivatedRoute ,Params} from '@angular/router';
import { FileQueueObject, FileuploadService } from '../fileupload.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general.service';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { fromEvent, Subscription } from 'rxjs';
import { take, filter, count } from 'rxjs/operators';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { NearMapsPopupComponent } from '../near-maps-popup/near-maps-popup.component'
import { SignupdialogboxComponent } from '../signupdialogbox/signupdialogbox.component';
import { THIS_EXPR, IfStmt } from '@angular/compiler/src/output/output_ast';
import { DataService } from '../core/data.service';
import { browser } from 'protractor';
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'

declare var gapi: any; //google-drive
declare var google: any; //google-drive
declare var Dropbox: any; //drop box
declare var OneDrive: any; //onedrive 
declare var $: any; //jquery variable+

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css'],
  // encapsulation: ViewEncapsulation.None,

})

export class MyfilesComponent implements OnInit {
  totalfilelength:number=0
  sub: Subscription;
  message: any;
  subscription: Subscription
  windowWidth: any
  verificationdata: any;
  passwordVerifications: any = false;
  testuingnew;
  count = 0;
  folderdataid:any;
  sclickdata:any=[];
  Excecuted: Boolean = false;
  isSocialLoading:boolean=true;
  isloading
  getUploadSuccess:any
  oncomplete_Singlefile:Subscription
  @HostListener('window:resize', ['$event'])
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode==65) {
      this.filearr = this.fileData;
      this.folderarr = this.fileElements;
      event.preventDefault();
    }
    if(event.keyCode==46){
      if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){
        this.deleteSlectedElement()
      }
      else if((this.filearr.length || this.folderarr.length)){
        this.deleteElement(this.filearr[0] || this.folderarr[0])
      }

    }
  }
  @HostListener('document:click', ['$event']) onClickHandler(event: MouseEvent) {
    var value:any = event.srcElement;
    if(value.id!="foldersList" && value.id!="filesList" && (!(this.contextMenu && this.contextMenu.menuOpened.closed) || !(this.contextMenu1 &&this.contextMenu1.menuOpened.closed))) {
      this.filearr = []
      this.folderarr = []
    this.sample2=false
    this.EnableDelete=false
    }
  }

  getScreenSize(event?) {
    this.windowWidth = window.innerWidth;

  }
  constructor(public overlay: Overlay, private cdRef: ChangeDetectorRef, public viewContainerRef: ViewContainerRef,
    private adminService: AdminService, private documentservice: DocumentService, private generalservice: GeneralService,
    public userService: UserService, private http: HttpClient, private router: Router, public dialog: MatDialog, public snackBar: MatSnackBar,
    private frontendconfig: FrontEndConfig, public routes: ActivatedRoute, private dataservice:DataService,
    public uploader: FileuploadService,private _ngZone: NgZone) {
      this.adminService.getProfile().subscribe(data => {
        this.profiledata = data
      })
     this.dataservice.documentUpdate().subscribe(data=>{
      if(data && this.profiledata && data.uid==this.profiledata._id){
        let isNewFile=true
        if(this.fileData && this.fileData.length){
          this.fileData.forEach((element,index)=>{
            if(element._id==data._id){
              this.fileData[index]=data
              isNewFile=false
            }
          })
        }
        if(isNewFile && ((this.currentRoot && this.currentRoot._id==data.folderid) || (!data.folderid && !this.currentRoot))){
          this.fileData.push(data);
          this.fileData.sort(function (a, b) {
            var nameA = a.created_at;
            var nameB = b.created_at;
            if (nameA < nameB) { return 1; }
            if (nameA > nameB) { return -1; }
            return 0;
          })
        }
      }
    })
    this.dataservice.folderUpdate().subscribe(data=>{
      if(data && this.profiledata && data.userid==this.profiledata._id){
        let isNewFolder=true
        if(this.fileElements && this.fileElements.length){
          this.fileElements.forEach((element,index)=>{
            if(element._id==data._id){
              this.fileElements[index]=data
              isNewFolder=false
            }
          })
        }
        if(isNewFolder && ((this.currentRoot && this.currentRoot._id==data.parentid) || (!data.parentid && !this.currentRoot))){
          this.fileElements.push(data);
          this.fileElements.sort(function (a, b) {
            var nameA = a.createdAt;
            var nameB = b.createdAt;
            if (nameA < nameB) { return 1; }
            if (nameA > nameB) { return -1; }
            return 0;
          })
        }
      }
    })
    this.subscription = this.documentservice.getFileData().subscribe(message => {
      this.message = message;
      this.fileAdded.emit(this.message);
      if(!NgZone.isInAngularZone()){this._ngZone.run(() => {
        this.documentservice.openSnackBar("File added from google drive ", "X");
      }); }
      //  this.refreshPage.emit();
    });
    this.getUploadSuccess = this.uploader.getUploadSuccess().subscribe((message: any) => {
      this.count = 0;
      this.message = message;
      this.totalfilelength=0
          // this.fileAdded.emit()
                this.fileAdded.emit(this.message);

          this.uploadCompleted = true;
          this.uploader.clearQueue();
      
    });
    this.testuingnew = this.uploader.getUploadResponse().subscribe((message: any) => {
      this.verificationdata = message;
      if (message.responsedata == 'PDF is password protected, please enter password'||message.responsedata =='Please check your password') {
        // this.uploader.clearQueue()
        // this.uploadCompleted=true
        this.passwordVerification(message);
      }
    });
   this.oncomplete_Singlefile= this.uploader.oncomplete_Singlefile().subscribe((data: any) => {
      // if(data.response.folderid==undefined){
      //   // this.fileData.push(data.response)
      //   this.fileData.sort(function (a, b) {
      //     var nameA = a.updatedAt;
      //     var nameB = b.updatedAt;
      //     if (nameA < nameB) { return 1; }
      //     if (nameA > nameB) { return -1; }
      //     return 0;
    
      //   })      }
      // if(data.response.folderid!=undefined && this.currentRoot!=undefined){
      //   if(this.currentRoot._id==data.response.folderid){
      //     // this.fileData.push(data.response)
      //     this.fileData.sort(function (a, b) {
      //       var nameA = a.updatedAt;
      //       var nameB = b.updatedAt;
      //       if (nameA < nameB) { return 1; }
      //       if (nameA > nameB) { return -1; }
      //       return 0;
      
      //     })  
      //   }}

    })
    

    
    this.getScreenSize();
  }


  serverurl = this.frontendconfig.getserverurl();
  @ViewChild('userMenu') userMenu: TemplateRef<any>; //usermenu
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger; //context menu
  @ViewChild(MatMenuTrigger) contextMenu1: MatMenuTrigger; //context menu

  @ViewChild('userMenu1') userMenu1: TemplateRef<any>; //usermenu
  overlayRef: OverlayRef | null;
  @Input() fileElements: FileElement[];  //file data
  @Input() fileData: FileData[];  //folder data
  @Input() canNavigateUp: string; // navigate 
  @Input() path: string; //path
  @Input() currentRoot: any;  //current path
  @Output() removefavorite = new EventEmitter<FileElement>(); //remove favorite
  @Output() elementRemoved = new EventEmitter<FileElement>(); //remove element 
  @Output() elementRenamed = new EventEmitter<FileElement>(); //rename element
  @Output() elementShared = new EventEmitter<{ element: FileElement, title: any }>(); //share element
  @Output() elementfavorite = new EventEmitter<FileElement>(); //make favorite
  @Output() navigatedDown = new EventEmitter<FileElement>(); //navigate back
  @Output() elementMoved = new EventEmitter<{ element: FileElement; moveTo: FileElement }>(); //element moved
  @Output() fileMoved = new EventEmitter<{ element: FileData; moveTo: FileElement }>(); //file move 
  @Output() navigatedUp = new EventEmitter(); //navigate up
  @Output() folderAdded = new EventEmitter<{ name: string }>(); // folder adding
  @Output() fileAdded = new EventEmitter<{ data: string }>(); //file adding
  @Output() refreshPage = new EventEmitter(); //send to File.Document
  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput1') fileInput1;
  @Output() modalnavigate = new EventEmitter<FileElement>();//modal data navigation
  @Input() modalElement = []
  @Input() Myfiles
  @Output() modalPath = new EventEmitter
  @Input() LoadingUpdate: Subject<boolean>;
  // public files: Observable<FileQueueObject[]>;
  queue: Observable<FileQueueObject[]>;
  dragfiles: Observable<FileQueueObject[]>;
  foldervalue
  folderid
  copyfile: any
  documentLogs: any
  parent
  sampledata: any
  sampledata1: any
  shows = false
  shows1 = true
  document = true;
  folder = false;
  file = true;
  url = false;
  access: any
  sample2 = false
  element: any
  selectedName: any;
  uploadCompleted: Boolean = false;
  shw: boolean = true
  shw1: boolean = false
  btn1: boolean = false
  view: boolean = false;
  view2: boolean = true;
  view3: boolean = false;
  view4: boolean = false;
  foldershow1: boolean = false;
  selectedName1: any;
  selectedName2: any;
  recentfiles: any;
  aboutdetails: any
  backbuttonenable:boolean=false
  matmenu: any
  btn2
  dialogopen = false
  profiledata: any;
  urlshow: any
  firstuser: boolean = false;
  checkuploadlength
  btn4
  btn3
  btn5
  title
  uploading: boolean = true
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  BackButton:Boolean=false;
  EnableDelete:Boolean=false;
triggervalue:boolean=true 
email
currentelement:any
browserpath:any
checkid:any
IpAddress
isSharePopUpOpened = false
matttoltip
  //================ recent files data ==================
  recentFiles() {
    // this.isSocialLoading = true
    this.documentservice.recentfiles().subscribe(data => {
      this.recentfiles = data
      this.isSocialLoading = false
    })
  }

  loadingDone() {
    this.isSocialLoading = false;
  }

  //================ recent files data ends ==================
  //================ all folders data ==================
  getAllFolders() {
    // this.isSocialLoading = true
    this.documentservice.getallfolders().subscribe(data => {
      this.parent = data
      // this.isSocialLoading = false
    })
  }

  //================ all folders data ends ==================
  newelement: any

  //================= current user profile ===================
  getProfiles() {
    this.newelement = JSON.parse(localStorage.getItem('currentUser'))
    var checknewVariable = this.userService.decryptData(this.newelement.new)
    var checknewVariable1 = this.userService.decryptData(this.newelement.type)
    this.newelement.type = checknewVariable1
 //   var stringValue = "true";
   var boolValue = JSON.parse(checknewVariable);
    this.firstuser = checknewVariable
    if (boolValue) {
      document.getElementById("welcome").click();
    }
  }
  value:any
  iebrowser
  //================= current user profile ends ===================

  ngOnInit() {
    this.getProfiles();
    this.routes.queryParams.subscribe((queryParams: Params) => {
      this.router.url
    })
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
   this.iebrowser=true
     }
     else   this.iebrowser=false 
    //   var id = this.routes.snapshot.queryParams.id;
    var routerid = {
      fileid: this.router.url.substring(this.router.url.lastIndexOf('/') + 1)
    }
    console.log(routerid)
    if (routerid.fileid != 'myfiles' && routerid.fileid != ':id') {
      this.documentservice.decryptedvalues(routerid).subscribe((data: any) => {
        var id = data.decryptdata
        console.log(id)
        if (id != undefined) {
          this.documentservice.getfolder().subscribe(data => {
            this.checkid = data;
            this.checkid.forEach(element => {
              if (element._id == id) {
                console.log(element)
                this.currentelement = element
                this.LoadingUpdate.subscribe(v => {
                  this.isSocialLoading = false
                });
              }
            });
            if(!this.currentelement){
              console.log('URL not found (404)')
              this.router.navigate(['home/myfiles'])
            }
          })
        }
        //  if(id==undefined){
        //   if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
        //   { 
        //      $(".ietop").css("margin-top","100px");
        //    }
        //   this.dialogopen = true;
        //   // this.recentFiles();
        //   this.getProfiles();
        //   this.LoadingUpdate.subscribe(v => {
        //     this.isSocialLoading = false
        //   });
        //   this.selectedName1 = 'about'
        //  }
      },error => {
        console.log(error)
        this.router.navigate(['home/myfiles'])
      })
    }
    else {
      if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
        // $(".ietop").css("margin-top", "100px");
        $(".main-nav-position").css("margin-top", "0px");

      }
      this.dialogopen = true;
      // this.recentFiles();
      this.LoadingUpdate.subscribe(v => {
        this.isSocialLoading = false
      });
      this.selectedName1 = 'about'
    }
    this.getAllFolders();
    this.IpAddress = JSON.parse(localStorage.getItem('mylocation'));
    var folderdata=localStorage.getItem('folder')
    if(folderdata) localStorage.removeItem('folder')
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
        document.getElementById('modelclose').click()
        document.getElementById('fileselect123').click()

        
    if( this.currentelement && this.currentelement.parentid){
      this.documentservice.getnavigationfolder(this.currentelement.parentid).subscribe(data=>{
        this.browserpath=data
        this.currentelement=data
        this.navigateUp(this.browserpath)
      })
    }
    else{
      console.log(this.browserpath)
       this.browserpath='root'
      //  this.navigateUp(this.browserpath)
       setTimeout(() => {
        // this.router.navigate(['home/myfiles']); 
      }, 1000);
    }
  
  }
  ngOnDestroy() {
    this.testuingnew.unsubscribe();
    this.getUploadSuccess.unsubscribe();
    this.oncomplete_Singlefile.unsubscribe()
    document.getElementById('closewelcome').click()
    if (this.firstuser) {
    var newelement;
    newelement = JSON.parse(localStorage.getItem('currentUser'))
    newelement.new = this.userService.encryptData(false);
    localStorage.setItem('currentUser', JSON.stringify(newelement));
    this.adminService.updatenewuser().subscribe(data => {});
    }
  }
@HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
    if(this.contextMenu) this.contextMenu.closeMenu()
    this.matttoltip=true
setTimeout(() => {
  this.matttoltip=false
}, 1);
}
 
  clientid = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
  scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file'
  ].join(' ');
  navigatemodal(element) {
    console.log(element)
    this.backbuttonenable=true
    this.modalnavigate.emit(element)
    this.folderarr=[]
    this.filearr=[]
  }

  modalback() {
    this.modalPath.emit()
  }

  open({ x, y }: MouseEvent, user) {
    this.close();
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        }
      ]);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close()
    });
    this.overlayRef.attach(new TemplatePortal(this.userMenu, this.viewContainerRef, {
      $implicit: user
    }));
    this.sub = fromEvent<MouseEvent>(document, 'click')
      .pipe(
        filter(event => {
          const clickTarget = event.target as HTMLElement;
          return !!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget);
        }),
        take(1)
      ).subscribe(() => this.close())
  }

  //password verification for password protected file 
  passwordVerification(message) {
    var resultdata
    setTimeout(() => {
      $('body').css("overflow", "hidden");

   
    }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'protection', content: message },disableClose: true, width: '570px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
  
     
      }, 10);
      if (res) {
        var data = {
          file: this.verificationdata,
          password: res
        }
        resultdata=this.uploader.passwordremover(data)
        // console.log(resultdata.responsedata=="Please check your password")
      //  if(resultdata.responsedata!=undefined &&resultdata.responsedata=="Please check your password"){
        // this.passwordVerification(data)
        // }
        // else{

        // }
        // .subscribe((data: any) => {
        //   if (!data.Message) {
        //     this.uploadCompleted = true;
        //     this.uploader.clearQueue();
        //     this.fileAdded.emit(data)
        //     this.documentservice.openSnackBar("File Decrypted sucessfully", "X")
        //   }
        //   else this.passwordVerification(data)
        // })
      }
      else {
        this.uploadCompleted = false;
        this.uploader.continueQueue();
        // this.documentservice.openSnackBar("File Removed", "X")
        this.Excecuted = false;
      }
    });
  }

  //============ sort data in ascending order =====================
  sortDataAsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
    this.fileData.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }
  //============ sort data in ascending order ends=====================

   //============ sort data in ascending order =====================

   sortDatamodalAsc() {
    this.modalElement.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
    this.Myfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  sortDatamodalDsc() {
    this.modalElement.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
    this.Myfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
  }

  sortByModifiedmodalAsc() {
    this.modalElement.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
    this.Myfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  sortByModifiedmodalDsc() {
    this.modalElement.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
    this.Myfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return -1; }
      if (nameA < nameB) { return 1; }
      return 0;
    })
  }
  //============ sort data in ascending order ends=====================

  //============ sort data in descending order =====================
  sortDataDsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
    this.fileData.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }
  //============ sort data in descending order ends=====================

  //============ sort data in ascending order by updatedat ===============
  sortByModifiedAsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;

    })
    this.fileData.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;

    })
  }
  //============ sort data in ascending order by updatedat ends===============

  //============ sort data in descending order by updatedat ===============
  sortByModifiedDsc() {

    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;

    })
    this.fileData.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;

    })
  }
  //============ sort data in descending order by updatedat ends===============

  //============= sort recent data ascending order================
  sortRecentDataAsc() {
    this.recentfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }
  //============= sort recent data ascending order ends ================

  //============= sort recent data descending order================
  sortRecentDataDsc() {
    this.recentfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }
  //============= sort recent data descending order ends ================

  //============ sort recent data in ascending order by updatedat===============
  sortRecentByModifiedAsc() {
    this.recentfiles.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }
  //============ sort recent data in ascending order by updatedat ends===============

  //============ sort recent data in descending order by updatedat ===============
  sortRecentByModifiedDsc() {
    this.recentfiles.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }
  //============ sort recent data in descending order by updatedat ends===============



  highlightRow(element) {

    this.view = false
    this.selectedName = element._id;
    this.sample2 = true
    this.element = element;
  }

  highlightRow1(element) {
    this.selectedName2 = element._id;
    this.element = element;
  }


  gridshow1() {
    this.sample2 = false

  }

  show4() {
    this.selectedName = null;
    this.sample2 = false
  }

  sample() {
    this.shows = true;
    this.shows1 = false
    this.shw = false
    this.shw1 = true
    this.sample2 = false
    this.selectedName = null;
  }

  sample1() {
    this.shows = false;
    this.shows1 = true;
    this.shw = true
    this.shw1 = false
    this.sample2 = false
    this.selectedName = null;
  }

  smp(url) {
    document.getElementById("url123").click();
  }

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
    // $('.modal-auto-clear').on('shown.bs.modal', function () {
    // $(this).delay(7000).fadeOut(200, function () {
    // $(this).modal('hide');
    // });
    // })
  }

  uploadUrl(parentid) {
    this.file = false;
    this.url = true;
    this.document = false;
    this.folder = false;
    this.sampledata1 = parentid;
    this.recentFiles();
  }

  openUrlDialog() {
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'url' } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        // this.ngOnInit()
        this.folderAdded.emit({ name: res });
      }
    });
  }

  UrlfileDialog(parentid) {
    this.sampledata1 = parentid;
    // document.getElementById("openModalButton3").click();
  }

  FolderUploadDialog1(parentid) {
    // const dialogConfig = new MatDialogConfig();
    // let dialogRef = this.dialog.open(CommonDialogComponent,{data: { name: 'Folderupload',parentid:parentid }});
    // dialogRef.afterClosed().subscribe(res => {
    // if (res) {
    // this.folderAdded.emit({ name: res });
    // }
    // });
    this.sampledata = parentid;
    document.getElementById("openModalButtonn").click();
    this.btn1 = true
  }

  urlcontent(urldata) {
    //  if(urldata.value.value == undefined)
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    // var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/([-a-zA-Z0-9@:%_\+.~#?&//=]*).pdf
    if (urldata.value.value == undefined||urldata.value.value=='') {
      this.urlshow = true
      // this.documentservice.openSnackBar("Enter URL ", "X")
    }
    else {
      document.getElementById('fileselect123').click()
      this.isSocialLoading=true
      urldata.value.parentid = this.sampledata1;
      this.uploader.urlcontent(urldata.value).subscribe(data => {
        this.isSocialLoading=false; 
        
        urldata.resetForm();
        this.uploadFile('document')
        document.getElementById('fileselect123').click()
        this.documentservice.openSnackBar("File added from URL", "X")
        this.fileAdded.emit();
       
        
      }, error => {
        urldata.resetForm()
        if (error == "Invalid")
          this.documentservice.openSnackBar("Unable to find pdf ", "X")
          this.isSocialLoading=false;
        //  document.getElementById('urlbtn').click()
      })
    }
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(url, { headers: headers, responseType: 'blob' as 'json' });
  }
 


  openNewFolderDialog() {
    setTimeout(() => {
      $('body').css("overflow","hidden");
  
      }, 10);

    // const dialogConfig = new MatDialogConfig();
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'create' }, width: '500px', height: '200px', panelClass: "rename", disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow","auto");
    
        }, 10);
      this.btn2 = false
      if (res) { 
        if (this.firstuser) {
          var newelement;
          newelement = JSON.parse(localStorage.getItem('currentUser'))
          newelement.new = this.userService.encryptData(false);
          localStorage.setItem('currentUser', JSON.stringify(newelement));
          this.adminService.updatenewuser().subscribe(data => { })
        }
        this.folderAdded.emit({ name: res });
      }
    });
    
  }
  FolderUploadDialog(parentid) {
    // const dialogConfig = new MatDialogConfig();
    // let dialogRef = this.dialog.open(CommonDialogComponent,{data: { name: 'Folderupload',parentid:parentid }});
    // dialogRef.afterClosed().subscribe(res => {
    // if (res) {
    // this.folderAdded.emit({ name: res });
    // }
    // });

    this.sampledata = parentid;
    this.uploadCompleted = false;

    document.getElementById("openModalButton2").click();
    this.btn1 = true
  }
  uploadfiles(parentid) {
    // alert(this.currentRoot ? this.currentRoot._id :false)
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'fileupload', folder: parentid } });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fileAdded.emit(res);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void { }


  deleteElement(element: FileElement) {
    setTimeout(() => {
      $('body').css("overflow","hidden");
  
      }, 10);
    if (element.isFolder) {
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deletefolder' }, width: '500px', panelClass: "deletemod" ,hasBackdrop: false,disableClose:true});
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow","auto");
      
          }, 10);
        if (res) {
          var index = this.fileElements.findIndex(x => x._id == element._id)
          if (index >= 0) {
            this.fileElements.splice(index, 1)
          }
          if (res == true) {
            this.sample2 = false
          }
          if (element.favoriteid) {
            this.Removefavorite(element)

          }
          this.elementRemoved.emit(element);
          this.sample2 = false
        }
        this.documentservice.openSnackBar("Folder(s) deleted successfully" ,"X")
      });
    }
    else {
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'delete' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow","auto");
      
          }, 10);
        if (res) {
          var index = this.fileData.findIndex(x => x._id == element._id)
          if (index >= 0) {
            this.fileData.splice(index, 1)
          }
          if (element.favoriteid) {
            this.Removefavorite(element)

          }
          this.elementRemoved.emit(element);
          this.sample2 = false
        }
        this.documentservice.openSnackBar("File(s) deleted successfully" ,"X")
      });
    }
  }
  // OpenLocation(log){
  //   this.documentservice.sendFileData(log)

  //   // console.log(log)
  //   // const filedialog = this.dialog.open(NearMapsPopupComponent, {
  //   //   width: '848px',
  //   //   disableClose: false,
  //   //   autoFocus: false,
  //   //   panelClass: "orgn",
  //   //   data: {lattitude:log.latitude,longitude:log.longitude}

  //   // }); 
  // }
  logid
  OpenLocation(id) {
    this.logid = id
    const filedialog = this.dialog.open(NearMapsPopupComponent, {
      width: '848px',
      disableClose: false,
      autoFocus: false,
      panelClass: "orgn",
      data: id
    });
  }
  //To get index of array's of Documents and folders 
  findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }
  Favorite(element: FileElement) {
    this.elementfavorite.emit(element);
    this.documentservice.openSnackBar("Added to Favorites" ,"X")
  }

  navigate(element: FileElement) {
    this.filearr=[];
    this.folderarr=[]
    this.sample2 = false
    this.RecentlyUploadedFilesList=[]
    this.currentelement=element
       this.currentelement=element
    if (element.isFolder) {
      this.foldervalue = element;
      var data={
        fileid:this.foldervalue._id
      }
       this.documentservice.encryptedvalues(data).subscribe((data:any)=>{
         console.log(data)
        this.router.navigate(['/home/myfiles/'+data.encryptdata]);
        // this.router.navigate(['/home/myfiles/:id'], { queryParams: { id: this.foldervalue.encryptedId } });
        this.navigatedDown.emit(element);
       })
      
    }
  }

  navigateUp(path) {
    this.navigatedUp.emit(path);
  }

  moveElement(element, moveTo) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
    this.documentservice.openSnackBar("Moved Successfully!", "X");

  }

  transferElement(element, moveTo) {
    this.fileMoved.emit({ element: element, moveTo: moveTo });
  }

  move = async function (element) {
    this.dialogopen = false
    this.sample2 = false
    setTimeout(() => {
    $('body').css("overflow","hidden");

    }, 10);
    let dialogRef = this.dialog.open(MovetoComponent,
      {
        width: '500px',
        panelClass: "withoutpadding",
        data: { move: element, Allfolder: this.parent,multi:false },
        disableClose: true,
      });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow","auto");
    
        }, 10);

      if (res!='CloseButton') {
        this.elementMoved.emit({ element: element, moveTo: res });
        this.documentservice.openSnackBar("Moved Successfully!", "X");
      }
    });
  }

  shareElementWithMultiple(title:any){
    console.log(this.filearr,this.filearr.length)
    if(this.filearr.length || this.folderarr.length){
      if (title == 'Signature' && this.folderarr.length) return this.documentservice.openActionSnackBar(' Folders are not shared for signature', 'x');
      if (title == 'Signature' && this.folderarr.length==0 && this.filearr.length==1){
        // document.getElementById('modelclose').click()
        console.log(this.filearr,this.filearr[0])
        return this.getUserDocList(this.filearr[0]);
      }
      if(title == 'Signature' && this.filearr.length>1) this.documentservice.openActionSnackBar('Multiple files are shared in Review mode only.', 'x');
      this.multishareElement();
      this.isSharePopUpOpened=false
      document.getElementById('modelclose').click()

    }
    else {
      this.documentservice.openActionSnackBar(' Please Select File', 'x')
    }
  }

  shareElement(element: FileElement, title: any) {
    console.log(element)
    if(element)
    {
      if (title == 'Signature' && element.isFolder) this.documentservice.openActionSnackBar(' Folders are not shared for signature', 'x')
      else {
        if (element) {
          // || title == 'Signature'
          if (title == 'share' || title == 'Review') document.getElementById('modelclose').click()
          if (title == 'Signature') this.getUserDocList(element)
          else this.elementShared.emit({ element: element, title: title });
        }
      }
    }
    else if(element == undefined || element == null)
    this.documentservice.openActionSnackBar(' Please Select File', 'x')
   

  }

  // to get the userlist from the doc based upon the feilds for (SIGNATURE)
  userDoc: any;
  getUserDocList(element) {
    if (element.isFile) {
      this.documentservice.getCurrentVersionDocFieldOptions({ documentid: element._id, versionid: element.versionid }).subscribe(response => {
        this.userDoc = response;
        if ((this.userDoc && !this.userDoc.fields.length) || !this.userDoc) this.addFeildsPopUp(element);
        else {
          this.isSharePopUpOpened=false
          document.getElementById('modelclose').click();
          this.elementShared.emit({ element: element, title: 'Signature' });
        }
      });
    }
    if (element.isFolder) { document.getElementById("modelclose").click(); this.elementShared.emit({ element: element, title: 'Review' }); }
  }

  addFeildsPopUp(element) {
    let dialogRef22 = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
    dialogRef22.afterClosed().subscribe(res1 => {
      if (res1) {
        dialogRef22.close();
        this.getFileContent(element);
        document.getElementById('modelclose').click()
      }
      else dialogRef22.close();
    });
    
  }

  Removefavorite(element: FileElement) {
    this.removefavorite.emit(element);
    this.documentservice.openSnackBar("Removed from Favorites" ,"X")
  }
  // openNewFolderDialog() {
  // let dialogRef = this.dialog.open(NewFolderDialogComponent);
  // dialogRef.afterClosed().subscribe(res => {
  // if (res) {
  // this.folderAdded.emit({ name: res });
  // }
  // });
  // }element: FileElement

  openRenameDialog(element: FileElement) {
    setTimeout(() => {
      $('body').css("overflow","hidden");
  
      }, 10);
    var Rename = element.name.split('.')
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'Rename', folder: element }, width: '500px', panelClass: "rename",disableClose:true  });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow","auto");
    
        }, 10);

      if (res) {
        var changed = res.split('.')
        if (changed[1] && changed[1] != 'pdf') { this.documentservice.openActionSnackBar('. ' + changed[1] + ' Extensions is not Allowed', 'x') }
        else {
          if (element.isFile) {
           var name = changed[0] + '.' + Rename[1]
           if(this.fileData.some(x=>x.name==name &&x._id!=element._id))
           {
            this.documentservice.openActionSnackBar(  name + ' File Already Exits', 'x')
           }
           else if(this.fileData.some(x=>x.name==name &&x._id==element._id)){}//same namw without changes
           else 
            { element.name=name
            this.documentservice.openSnackBar(" Renamed  Successfully" ,"X")
            this.elementRenamed.emit(element);
            }
          }
          if (element.isFolder){
             var name1 = changed[0]
            if(this.fileElements.some(x=>x.name==name1 &&x._id!=element._id))
            {
             this.documentservice.openActionSnackBar(  name1 + ' File Already Exits', 'x')
            }
            else if(this.fileElements.some(x=>x.name==name1 &&x._id==element._id)){}//same namw without changes
              else
            {
              element.name=name1
             this.documentservice.openSnackBar(" Renamed Successfully" ,"X")
             this.elementRenamed.emit(element);
            }
          }
         
        }
      }
     
    });
   
  }

  FileMenu = false;
  contextMenuPosition = { x: '0px', y: '0px' };


  openMenufolder(event: MouseEvent, element: FileElement) {
   this.element=element
    if(!this.filearr.some(element1 => element1._id == element._id) && !this.folderarr.some(element1 => element1._id == element._id)){
      if(element.isFile){
        this.filearr=[element]
        this.folderarr=[]
       }
       else if(element.isFolder){
        this.folderarr=[element]
        this.filearr=[]
       }
    }
    this.matmenu = element
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
     if(((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)))this.contextMenu1.openMenu();
     else this.contextMenu.openMenu()
  }

  openMenufolder1(event:TouchEvent, element: FileElement) {
   
    if(!this.filearr.some(element1 => element1._id == element._id) && !this.folderarr.some(element1 => element1._id == element._id)){
      if(element.isFile){
        this.filearr=[element]
        this.folderarr=[]
       }
       else if(element.isFolder){
        this.folderarr=[element]
        this.filearr=[]
       }
    }
    this.matmenu = element
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.changedTouches[0].clientX + 'px';
    this.contextMenuPosition.y = event.changedTouches[0].clientY + 'px';
     if(((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)))this.contextMenu1.openMenu();
     else this.contextMenu.openMenu()
  }

  menuclose()
  {
  }
  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }


  mouseclick = function () { this.FileMenu = false }

  openNewMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    if (!this.FileMenu) {
      event.preventDefault();
      viewChild.openMenu();
    }
  }

  //drag and drop folders and files
  onDrop(event, element) {
    if (element._id != event.data._id) {
      this.moveElement(event.data, element)
    }
  }

  //======================== drag and drop function =====================
  public dropped = async function (event: UploadEvent) {
    console.log("In dropped")
    this.uploadCompleted = false;
    let parentResult = 0;
    var fileindex = 0

    document.getElementById('fileselect123').click()
    document.getElementById("modelclose").click();
    // if(!this.totalfilelength)
    if (!this.totalfilelength) document.getElementById("openModalButton").click();
    var files
    files = event.files;
    //------------------- Duplicate folder code
    this.checkuploadlength = event.files.length;
    this.totalfilelength = this.totalfilelength + this.checkuploadlength
    this.uploader.array1 = this.totalfilelength;

    //------------------------------------------------ end
    var foldersNameList = []
    for (const file of files) {
      fileindex++
      if (!parentResult) {
        if (this.currentRoot) parentResult = this.currentRoot._id
        else parentResult = 0
      }
      const filePathArray = file.relativePath.split('/');
      let folderName
      let duplicatefolderName = []
      if (filePathArray.length > 1) {
        if ((foldersNameList.filter(name => name.originalName == filePathArray[0])).length == 0) {
          duplicatefolderName = this.fileElements.filter((folderdata: any) => (folderdata.isFolder && folderdata.name == file.relativePath.split('/')[0])?(folderdata.parentid?folderdata.parentid==parentResult:true):false);
          if(duplicatefolderName.length==0)
          duplicatefolderName = duplicatefolderName.concat(
            this.RecentlyUploadedFoldersList.filter((folderdata: any) => (folderdata.isFolder && folderdata.name == file.relativePath.split('/')[0])?(folderdata.parentid?folderdata.parentid==parentResult:true):false)
          );

          if (duplicatefolderName.length) {
            let count = 0
            do {
              count++;
              folderName = file.relativePath.split('/')[0] + " (" + count + ")"
              let isMatch = false
              for (let i = 0; (i < this.fileElements.length || i < this.RecentlyUploadedFoldersList.length); i++) {
                if ((this.fileElements[i] && (this.fileElements[i].name == folderName) && ((this.fileElements[i].parentid!=undefined)?this.fileElements[i].parentid==parentResult:true)) || 
                (this.RecentlyUploadedFoldersList[i] && (this.RecentlyUploadedFoldersList[i].name == folderName) && ((this.RecentlyUploadedFoldersList[i].parentid!=undefined)?this.RecentlyUploadedFoldersList[i].parentid==parentResult:true))) {
                  isMatch = true;
                  break;
                }
              }
              if (!isMatch)
                break;
            } while (this.fileElements.length >= count || this.RecentlyUploadedFoldersList.length >= count)
            foldersNameList.push({originalName:filePathArray[0],newName:folderName});
          }
          else
            foldersNameList.push({originalName:filePathArray[0],newName:filePathArray[0]});
        }
      }

      let checkFolder=foldersNameList.filter(name => name.originalName == filePathArray[0])
      if(checkFolder && checkFolder.length)
        filePathArray[0] = checkFolder[checkFolder.length-1].newName;

      var index = 0
      for (const filePathArrayData of filePathArray) {
        if (index == filePathArray.length - 1 && file.fileEntry.isFile) {

          //<---Code for the Duplicate file Names-->
          let duplicatefileName = []
          let resultFileName

          duplicatefileName = this.fileData.filter((filedata: any) => {
            if (!filedata.isFile) return false;
            let FN1 = this.fileNameSplit({ name: filedata.name });
            let FN2 = this.fileNameSplit(file);
            if (filedata.folderid)
              return filedata.folderid == parentResult && FN1 && FN2 && FN1.name == FN2.name
            else if(!filedata.folderid && !parentResult)
              return FN1 && FN2 && FN1.name == FN2.name;
            else return false
          });

          if (this.RecentlyUploadedFilesList.length) {
            duplicatefileName = duplicatefileName.concat(this.RecentlyUploadedFilesList.filter((data: any) => {
              // if (!filedata.isFile) return false;
              let FN1 = this.fileNameSplit({ name: data.resultFileName ? data.resultFileName : data.name });
              let FN2 = this.fileNameSplit(file);
              if (data.folderid)
                return data.folderid == parentResult && FN1 && FN2 && FN1.name == FN2.name
              else if(!data.folderid && !parentResult)
                return FN1 && FN2 && FN1.name == FN2.name;
              else return false
            }))
          }

          if (duplicatefileName.length) {
            let count = 0
            do {
              count++;
              let fileNameRes = this.fileNameSplit(file);
              if (fileNameRes && fileNameRes.name && fileNameRes.extention)
                resultFileName = fileNameRes.name + " (" + count + ")" + ".pdf"
              let isMatch = false
              for (let j = 0; (j < this.fileData.length || j < this.RecentlyUploadedFilesList.length); j++) {
                if ((this.fileData[j] && (this.fileData[j].name == resultFileName) && ((this.fileData[j].folderid!=undefined) ? this.fileData[j].folderid == parentResult : true)) ||
                  (this.RecentlyUploadedFilesList[j] && ((this.RecentlyUploadedFilesList[j].folderid!=undefined) ? this.RecentlyUploadedFilesList[j].folderid == parentResult : true) && ((this.RecentlyUploadedFilesList[j].resultFileName!=undefined)?(this.RecentlyUploadedFilesList[j].resultFileName == resultFileName):(this.RecentlyUploadedFilesList[j].name == resultFileName)))) {
                  isMatch = true;
                  break;
                }
              }
              if (!isMatch)
                break;
            } while (this.fileData.length >= count || this.RecentlyUploadedFilesList.length >= count)
          }

          if (resultFileName) file.fileEntry.resultFileName = resultFileName
          await this.uploadDragedFile(file, parentResult, filePathArray.length)
        }

        if (index != filePathArray.length - 1) {
          let folderDetails = { name: filePathArrayData, parentid: parentResult };
          parentResult = await this.backendres(folderDetails);
        }
        index++;
      }
      parentResult = 0
      if (fileindex == files.length) this.uploader.uploadAll()
    }
    this.fileAdded.emit();
  }
  //========================================================

  //====================== upload drag files =========================
  uploadDragedFile (file, parentResult, filePathArrayLength) {
    this.queue = this.uploader.queue;
    return new Promise(async (resolve, reject) => {
      const fileEntry = file.fileEntry as FileSystemFileEntry;
      await fileEntry.file((resfile: any) => {
        if (!(filePathArrayLength == 1 && parentResult == 0)){
          if (parentResult) { resfile.folderid = parentResult }
        }
        if (file.fileEntry && file.fileEntry.resultFileName) { resfile.resultFileName = file.fileEntry.resultFileName }
        this.uploader._addToQueue(resfile);
        this.RecentlyUploadedFilesList.push(resfile)
        // this.uploader.uploadAll()
         resolve(resfile)
      });
    })
    // this.onFileSelected2(file, parentResult)
  }
  //===============================================================
  filesPicked = async function (files) {
    console.log("In filesPicked")
    this.foldweshow1 = false
    document.getElementById('fileselect123').click()
    document.getElementById("modelclose").click();
    
    var fileindex = 0
    //------------------- Duplicate folder code

    var folderName
    var duplicatefolderName
    if (files.length) {
      
      // this.fileElements.subscribe(folders => {
      duplicatefolderName = this.fileElements.filter((folderdata: any) => (folderdata.isFolder && folderdata.name == files[0].webkitRelativePath.split('/')[0])?(folderdata.parentid?folderdata.parentid==this.sampledata:true):false);
      if (duplicatefolderName.length == 0)
        duplicatefolderName = duplicatefolderName.concat(
          this.RecentlyUploadedFoldersList.filter((folderdata: any) => (folderdata.isFolder && folderdata.name == files[0].webkitRelativePath.split('/')[0]) ? (folderdata.parentid ? folderdata.parentid == this.sampledata : true) : false)
        );
      if (duplicatefolderName.length) {
        let count = 0
        do {
          count++;
          folderName = files[0].webkitRelativePath.split('/')[0] + " (" + count + ")"
          let isMatch = false
          for (let i = 0; (i < this.fileElements.length || i < this.RecentlyUploadedFoldersList.length); i++) {
            if ((this.fileElements[i] && (this.fileElements[i].name == folderName) && ((this.fileElements[i].parentid!=undefined)?this.fileElements[i].parentid==this.sampledata:true)) || 
            (this.RecentlyUploadedFoldersList[i] && (this.RecentlyUploadedFoldersList[i].name == folderName) && ((this.RecentlyUploadedFoldersList[i].parentid!=undefined)?this.RecentlyUploadedFoldersList[i].parentid==this.sampledata:true))) {
              isMatch = true;
              break;
            }
          }
          if (!isMatch)
            break;
        } while (this.fileElements.length  >= count || this.RecentlyUploadedFoldersList.length >= count)
      }
      //   })
      // if (duplicatefolderName.length > 0) {
      //   duplicatefolderName[0].nameCount = Number(duplicatefolderName[0].nameCount) + 1
      //   this.documentservice.updatefolder(duplicatefolderName[0]).subscribe(data => {
      //   });
      // }
      // if (duplicatefolderName.length > 0) folderName = files[0].webkitRelativePath.split('/')[0] + "(" + duplicatefolderName[0].nameCount + ")"
    }
    if(!this.totalfilelength)document.getElementById("openModalButton").click();
    this.uploader.array1 = files.length;
    this.checkuploadlength = files.length
    this.totalfilelength=this.totalfilelength+this.checkuploadlength

    //------------------------------------------------ end
    for (const file of files) {
      fileindex++;
      const filePathArray = file.webkitRelativePath.split('/');
      filePathArray[0] = folderName ? folderName : filePathArray[0]
      this.folderdata = file.webkitRelativePath;
      var parentResult = 0;
      if (this.sampledata) {
        parentResult = this.sampledata;
        // this.sampledata=false
      }
      var index = 0
      for (const filePathArrayData of filePathArray) {
        if (index == filePathArray.length - 1) { await this.onFileSelected1(file, parentResult) }
        if (index != filePathArray.length - 1) {
          let folderDetails = { name: filePathArrayData, parentid: parentResult };
          parentResult = await this.backendres(folderDetails);
        }
        index++;
      }
      this.fileAdded.emit();
      if(fileindex == files.length) this.uploader.uploadAll()
    }
    //alert("Uploaded Successfully")
  }

  onFileSelected1 = function (files: any, parentid: any) {
    this.queue = this.uploader.queue;
    if (parentid) files.parentid = parentid
    this.uploader._addToQueue(files);
    return true
  }

  // folderfiles = false

  // onItemClick(element) {
  //   this.folderfiles = true
  //   this.upfiles = false
  //   this.folderid = element
  //   this.fileInput.nativeElement.value = "";
  //   document.getElementById('fileselect11').click()
  // }

  // upfiles = false

  fileInputclick(element) {
    // this.upfiles = true
    // this.folderfiles = false
    this.uploadCompleted = false;
    if(element) this.folderid = element
    this.fileInput1.nativeElement.value = "";
    document.getElementById('fileselect121').click()
  }

  fileInputclick1() {
    this.fileInput1.nativeElement.value = "";
    document.getElementById('fileselect').click()
  }
  welcomeclose() {
    document.getElementById('closewelcome').click()
  }
  multiFileCopy(){
    var filedata = JSON.parse(JSON.stringify(this.filearr))
    setTimeout(() => {
      $('body').css("overflow", "hidden");

   
    }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'makecopy' }, width: '500px', panelClass: "deletemod",disableClose:true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
        }, 10);
      if (res) {
        this.sample2 = false
        this.uploader.multimakecopy(filedata).subscribe(data => {
          this.fileAdded.emit(); 
          this.documentservice.openSnackBar("Copied Successfully" ,"X")
          
        });
      }

    });
  }
  //================= make a copy =========================
  makecopyElement = function (element) {
   var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    if(locationdata) var latitude = locationdata.latitude;
     if(locationdata)var longitude = locationdata.longitude;
     setTimeout(() => {
      $('body').css("overflow", "hidden");

   
    }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'makecopy' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
  
     
      }, 10);
      if (res) {
        this.sample2 = false
        this.uploader.makecopy(element).subscribe(data => {
          this.copyfile = data
          var mousedata = {
            uid: this.copyfile.uid,
            documentid: this.copyfile._id,
            message: "Made copy",
            latitude:latitude,
            longitude:longitude,
            isFile: true ,
            IpAddress:(this.IpAddress)? this.IpAddress.ip:'Not Avilable'

          }
          setTimeout(()=>{
            this.documentservice.savemousemovement(mousedata).subscribe(data => {
            });   
          },1000)
            
          this.fileAdded.emit(); 
          this.documentservice.openSnackBar("Copied Successfully" ,"X")
          
        });
      }

    });
  }

  
  //===============================================

  onFileSelected = function (files: any, parentid: any) {
    this.queue = this.uploader.queue;
    // const formData: any = new FormData();
    // formData.append("uploads", files, files.name);
    if (parentid) {
      files.parentid = parentid
      // formData.append("folderid", parentid);
    }
    this.uploader._addToQueue(files);
    // this.documentService.dragcreate(formData).subscribe(data => {
    // this.dialogRef.close(data);
    return true
    // })
  }

  //=================== file upload ========================
  RecentlyUploadedFilesList = []
  RecentlyUploadedFoldersList = []
  addToQueue(folder,event) {
    if(event && event.target.value){

      document.getElementById('fileselect123').click()
      document.getElementById('modelclose').click()
      if (this.folderid) folder = this.folderid
      var totalSize = 0;
      var fileBrowserelement = this.fileInput1.nativeElement
      this.queue = this.uploader.queue;
      var pdfFiles1 = []
  
      for (var i = 0; i < fileBrowserelement.files.length; i++) {
        if (fileBrowserelement.files[i]) {
          if (folder) fileBrowserelement.files[i].folderid = folder
          let duplicatefileName = []
          let resultFileName
  
          duplicatefileName = this.fileData.filter((filedata: any) => {
            if (!filedata.isFile) return false;
            let FN1 = this.fileNameSplit({ name: filedata.name });
            let FN2 = this.fileNameSplit(fileBrowserelement.files[i]);
            // return FN1 && FN2 && FN1.name == FN2.name;
            if (filedata.folderid)
              return filedata.folderid == folder && FN1 && FN2 && FN1.name == FN2.name
            else if (!filedata.folderid && !folder)
              return FN1 && FN2 && FN1.name == FN2.name;
            else return false
          });
  
          if(this.RecentlyUploadedFilesList.length){
            duplicatefileName = duplicatefileName.concat(this.RecentlyUploadedFilesList.filter((data: any) => {
              // if (!filedata.isFile) return false;
              let FN1 = this.fileNameSplit({ name: data.resultFileName?data.resultFileName:data.name });
              let FN2 = this.fileNameSplit(fileBrowserelement.files[i]);
              // return FN1 && FN2 && FN1.name == FN2.name;
              if (data.folderid)
                return data.folderid == folder && FN1 && FN2 && FN1.name == FN2.name
              else if (!data.folderid && !folder)
                return FN1 && FN2 && FN1.name == FN2.name;
              else return false
            }))
            }
  
          if (duplicatefileName.length) {
            let count = 0
            do {
              count++;
              let fileNameRes = this.fileNameSplit(fileBrowserelement.files[i]);
              if (fileNameRes && fileNameRes.name && fileNameRes.extention)
                resultFileName = fileNameRes.name + " (" + count + ")" + ".pdf"
              let isMatch = false
              for (let j = 0; (j < this.fileData.length || j < this.RecentlyUploadedFilesList.length); j++) {
                if ((this.fileData[j] && (this.fileData[j].name == resultFileName) && ((this.fileData[j].folderid!=undefined) ? this.fileData[j].folderid == folder : true)) || 
                (this.RecentlyUploadedFilesList[j] && ((this.RecentlyUploadedFilesList[j].folderid!=undefined) ? this.RecentlyUploadedFilesList[j].folderid == folder : true) && ((this.RecentlyUploadedFilesList[j].resultFileName!=undefined)?(this.RecentlyUploadedFilesList[j].resultFileName == resultFileName):(this.RecentlyUploadedFilesList[j].name == resultFileName)))){
                  isMatch = true;
                  break;
                }
              }
              if (!isMatch)
                break;
            } while (this.fileData.length + 1 >= count || this.RecentlyUploadedFilesList.length >= count)
          }
  
          if (resultFileName) fileBrowserelement.files[i].resultFileName = resultFileName
          totalSize = totalSize + fileBrowserelement.files[i].size;
          pdfFiles1.push(fileBrowserelement.files[i]);
          this.RecentlyUploadedFilesList.push(fileBrowserelement.files[i])
        }
      }
      
      if (!this.totalfilelength) document.getElementById("openModalButton").click();
      this.checkuploadlength = pdfFiles1.length
      this.totalfilelength = this.totalfilelength + pdfFiles1.length
      this.uploader.array1 = this.totalfilelength;
  
      this.uploader.addToQueue(pdfFiles1);
      this.uploader.totalfilesize = totalSize;
      this.uploader.uploadAll()
  
      if (this.firstuser) {
        var newelement;
        newelement = JSON.parse(localStorage.getItem('currentUser'))
        newelement.new = this.userService.encryptData(false);
        localStorage.setItem('currentUser', JSON.stringify(newelement));
        this.adminService.updatenewuser().subscribe(data => { });
      }
      // document.getElementById("openModalButton").click();
      this.folderid = false
      if (this.uploader.queue) {
        // this.fileAdded.emit();
      }
    }


  }

  // File name splictting with extention
  fileNameSplit(inputFile){ // Need to pass formal argument as JSON object
    console.log(inputFile)
    let result, extention;
    if(inputFile.fileEntry) inputFile = inputFile.fileEntry as FileSystemFileEntry;
    if(inputFile.type=='application/pdf')
      extention='pdf'
    else if(inputFile.type=='application/msword')
      extention='doc'
    else if(inputFile.type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      extention='docx'
    else if(!(inputFile.type) && ((inputFile.name.lastIndexOf(".")+1 == (inputFile.name.length-3)) || (inputFile.name.lastIndexOf(".")+1 == (inputFile.name.length-4)))){
      extention=inputFile.name.substring(inputFile.name.lastIndexOf(".")+1 , inputFile.name.length);
      if(!(extention=='pdf' || extention=='doc' || extention=='docx'))
        return result;
    }
    else return result;
    if (inputFile.name.length - (inputFile.name.lastIndexOf(".") + 1) == extention.length) {
      let newName = inputFile.name.substring(0, inputFile.name.length - (extention.length+1));
      result = {name: newName, extention: extention}
    }
    return result
  }
   
  onClick(event,data)
  {
  //  document.getElementById(data).click()
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // backendres = function (folderDetails) {

  // return new Promise(async (resolve, reject) => {
  // await this.documentService.isFolderIsExist(folderDetails).subscribe(async folderdata => {
  // if (folderdata) {
  // this.duplicatefolderName = this.fileElements.find((folderdata: any) => folderdata.isFolder && folderdata.name == folderDetails.name);
  // this.duplicatefolderName.nameCount = Number(this.duplicatefolderName.nameCount) + 1;

  // if (this.duplicatefolderName.nameCount > 0) {
  // folderDetails.name = folderDetails.name + "(" + this.duplicatefolderName.nameCount + ")";
  // await this.documentService.updatefolder(this.duplicatefolderName).subscribe(data => {
  // this.documentService.createfolder(folderDetails).subscribe(data => {
  // resolve(data._id)
  // });
  // });
  // }
  // }
  // else {
  // await this.documentService.createfolder(folderDetails).subscribe(data => {
  // resolve(data._id)
  // });
  // }
  // });
  // });
  // }

  //=================== folder create or update ====================
  backendres (folderDetails) {
    return new Promise(async (resolve, reject) => {
      await this.documentservice.isFolderIsExist(folderDetails).subscribe(async (folderdata:any) => {
        if (folderdata) {
          resolve(folderdata._id);
        }
        else {
          await this.documentservice.createfolder(folderDetails).subscribe((data:any) => {
            this.RecentlyUploadedFoldersList.push(data)
            resolve(data._id)
          });
        }
      });
    });
  }
  //======================================================

  newupload() {
    document.getElementById("welcome").click();
  }

  //=============== file view ======================
  getFileContent = function (content) {
    this.filearr=[];
    this.folderarr=[]
    if (content.type == 'application/zip') {
    } else {
      console.log(content._id)
      var data ={
        fileid:content._id
      }
      this.documentservice.encryptedvalues(data).subscribe((data:any)=>{
        console.log(data)
        this.router.navigate(['filecont/'+data.encryptdata]);
      })

      
    }

    // this.documentService.getFileContent(content).subscribe(res =>{ this.fileDataContent = res.data; });
  }
  //==============================================

  // pathmoving(path) {
  // }

  //=========== view details ===============
  viewDetails = function (element) {
  var data={
    fileid:element._id,
    test:element.isFile
  }
  
this.documentservice.encryptedvalues(data).subscribe((data:any)=>{
 if(element.isFile) this.router.navigate(['home/auditlog/'+data.encryptdata+'/File']);
 else this.router.navigate(['home/auditlog/'+data.encryptdata+'/Folder']);

})
    // this.documentservice.getDocumentLogs(element).subscribe(data => {
    //   this.documentLogs = data
    // })
  }
  //===================================================

  //***************upload From drive**********************
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
    let src;
    var self = this
    if (authResult && !authResult.error) {
      if (authResult.access_token) {
        this.access = authResult.access_token
        document.getElementById('fileselect123').click()
        // let view = new google.picker.View(google.picker.ViewId.DOCS);
        // view.setMimeTypes("application/pdf");
        let pickerBuilder = new google.picker.PickerBuilder();
        let picker = pickerBuilder.
          // enableFeature(google.picker.Feature.NAV_HIDDEN).
          setOAuthToken(authResult.access_token).
          // addView(view).setIncludeFolders(true).setOwnedByMe(true).
          addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(true).setMimeTypes("application/pdf,application/vnd.google-apps.document,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")).
          addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(false).setMimeTypes("application/pdf,application/vnd.google-apps.document,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")).
          // addView(new google.picker.DocsUploadView()).
          // addview(new google.picker.View(google.picker.ViewId.FOLDERS)).
          // addViewGroup(
          // new google.picker.ViewGroup(google.picker.ViewId.DOCS).
          // addView(google.picker.ViewId.DOCUMENTS).
          // addView(google.picker.ViewId.FOLDERS)).
          setCallback((e) => { this.pickerCallback(e) }).
          build();
        picker.setVisible(true);
      }
    }
  }

  //google picker callback
  pickerCallback(data) {
    let self = this;
    if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
      var doc = data[google.picker.Response.DOCUMENTS][0];
      self.uploadtoDB(doc);
    }
  }

  //uplaod file to db
  uploadtoDB(doc) {
    this.isSocialLoading = true;
    doc.access = this.access
    this.documentservice.googleupload(doc).subscribe(data => {
      var newfile = data
      if(newfile){
        if(!NgZone.isInAngularZone()){this._ngZone.run(() => {
          this.openSnackBar("File added from Google Drive", "X");
        }); }
        this.uploadFile('document')
        this.fileAdded.emit();
        this.isSocialLoading = false;
      }
    })
  }
  openSnackBar(message, action: string) {
  
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['bar-color'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      
    });
  }

  //************************************************************************/
 
  // ======================================== dropbox ==============================================

  dropdevkey = 'hfds0x416l38hgr';
  dropscret = 'k2f83puyfke1z1t';
  loaddropbox = function () {
  
    Dropbox.choose(this.options);
  }

  options = {

    success: (files) => {
      document.getElementById('fileselect123').click()

      this.isSocialLoading = true;
      files.forEach(element => {
        this.dropurlcontent(element.link);
      });
    },

    cancel: function () {

    },

    linkType: "direct", // or "preview"
    multiselect: false, // or false
    extensions: ['.pdf','.doc','.docx'],

    folderselect: false, // or true

  };

  dropurlcontent(urldata) {
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var dropboxurl =
    {
      value: urldata
    }
    if (urldata) {
      // urldata.value.parentid = this.sampledata1;
      this.uploader.urlcontent(dropboxurl).subscribe(data => {
        this.documentservice.openSnackBar("File added from Dropbox", "X");
        this.uploadFile('document')
        this.fileAdded.emit();
        this.isSocialLoading = false;
      }, error => {
        if (error == "Invalid")
          this.documentservice.openSnackBar("not pdf ", "X")
          this.isSocialLoading = false;
      })
    }
  }

  // =========================================================================================

  /***********one drive************************/
  oneDriveApplicationId = "d091f200-527a-4572-aab8-678d6f3ac972";

  loadoneDrive() {
    this.launchOneDrivePicker()
  }

  launchOneDrivePicker = () => {
    var odOptions = {
      clientId: this.oneDriveApplicationId,
      action: "download",
      multiSelect: true,
      openInNewWindow: true,
      advanced: {
        filter: ".pdf,.doc,.docx",// Show only folders and png files
        redirectUri:"https://staging.docintact.com/home/myfiles/" 
        // redirectUri: "http://localhost:4200/home/myfiles/:id"
      },
      success: (files) => {
      this.isSocialLoading = true;

        document.getElementById('fileselect123').click()
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
         this.isSocialLoading = false;
         if(!NgZone.isInAngularZone()){this._ngZone.run(() => {
          this.documentservice.openSnackBar("File added from Onedrive", "X");
        })
      }
          this.uploadFile('document')
          this.fileAdded.emit();
        }, error => {
          if (error == "Invalid")
            this.documentservice.openSnackBar("not pdf ", "X")
            this.isSocialLoading = false;
        })
      }
    });

  }

  // ================================= one drive end ===========================
exporttodrive()
{
  gapi.load('auth', { 'callback': this.onAuthApi.bind(this) });
}

onAuthApi() {
  gapi.auth.authorize(
    {
      'client_id': this.clientid,
      'scope': this.scopes,
      'immediate': false
    },
    this.handleAuthResults);
}
handleAuthResults = (authResult) => {
  if (authResult && authResult.access_token) this.pdfDownload(authResult)
}
  download = function (file) {
    this.documentService.downloadfiles(file)
  }

  view1() {
    this.view = false
  }
  sampl() {
    this.view = true
  }
  samp(element) {
    this.aboutdetails = element
    // document.getElementById('viewmodel').click()
    $(document).ready(function () {
      // $(".newclass").animate({right: '10px'});
      $(".newclass").css("width", "500px");
    });
  }


  close1(event) {
    event.preventDefault()
  }

  downloadpath
  //========== download pdf file =========
  downloadfile(data) {
    this.documentservice.pdfDownload(data)
    
  }

// SEt Download options berore download  / opening the popup
setDownload(element) {
  this.element=element
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
      id: this.element._id,
      name: this.element.name,
      downloadType: this.downloadType,
      downloadFile: this.downloadFile,
      withlog: this.withlog,
      pdfPinSet: this.pdfPinSet,
      pdfPin: this.pdfPin,
      access_token: '',
      scope: this.scopes,
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
      this.isSocialLoading = true
      this.documentservice.pdfDownload(downloaddata).subscribe((data: any) => {
        if (data.path && downloaddata.downloadType == "computer") {
          this.isSocialLoading = false
          this.documentservice.openSnackBar("File(s) Downloaded Successfully", "X");
          var xhr = new XMLHttpRequest()
          xhr.open("GET", data.path)
          xhr.responseType = 'blob'
          xhr.onload = function () {
            saveAs(xhr.response, downloaddata.name);
          }
          xhr.send()

        }
        else if (downloaddata.downloadType == 'drive') {
          this.isSocialLoading = false
          if (!NgZone.isInAngularZone()) this._ngZone.run(() => {
            this.documentservice.openSnackBar("File Export To Drive", "X");
          });

        }
        else this.isSocialLoading = false

      });
    }
     else if (this.downloadType == 'attachment') {
      if (this.email == null || this.email == '') {
        this.documentservice.openSnackBar("Please Enter Email", "X");
      }
      else {
        var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
        if (regexp.test(this.email)) {
          document.getElementById('savetempclose').click()
          this.isSocialLoading = true
          this.documentservice.pdfDownload(downloaddata).subscribe((data: any) => {
            if (downloaddata.email && downloaddata.downloadType == "attachment") {
              this.isSocialLoading = false
              this.documentservice.openSnackBar("File sent To email", "X");


            }
            else this.isSocialLoading = false

          });
        }
        else {
          this.documentservice.openSnackBar("Please enter valid email", "X");
        }

      }
    }





  }



  closemodal()
  {
    document.getElementById('modelclose').click()
  }


  filearr = new Array();
  folderarr = new Array();
  isctrlkey: boolean;
  getHighlight(data){   
    if(data.isFile){
     
      if(this.filearr.some(element => element._id == data._id)) return true
      else return false
    }
    else if(data.isFolder){
      if(this.folderarr.some(element => element._id == data._id)) return true
      else return false
    }
    else return false
  }
  multiselectpdf(element1,event) {
    this.triggervalue=true;
     if(event.ctrlKey){
      if(element1.isFile){
        if(!this.filearr.some(element => element._id == element1._id)) 
        {
          this.filearr.push(element1); 
          if(this.filearr.length >1) this.EnableDelete=true;
        }
        else {
          var indexNum =this.filearr.findIndex((element)=> {
            return (element._id == element1._id);
          });
          this.filearr.splice(indexNum, 1);
        }
      }
      else if(element1.isFolder){
        if(!this.folderarr.some(element => element._id == element1._id)) {
          this.folderarr.push(element1)
          if(this.folderarr.length >1) this.EnableDelete=false;
        }
        else {
          var indexNum =this.folderarr.findIndex((element)=> {
            return (element._id == element1._id);
          });
          this.folderarr.splice(indexNum, 1);
        }
      }
    }
    else {
      if(element1.isFile){
        this.filearr=[element1]
        this.folderarr=[]
       }
       else if(element1.isFolder){
        this.folderarr=[element1]
        this.filearr=[]
       }
    }
   
if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){
  this.triggervalue=false;
  this.sample2=false;
  this.EnableDelete=true;
}
}

  deleteSlectedElement() {
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    if (folders.length && files.length) {
       setTimeout(() => {
      $('body').css("overflow", "hidden");

   
    }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFilesandFolders' }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
    
       
        }, 10);
        if (res) this.documentservice.multiFolderDelete(folders).subscribe(data => {
          this.documentservice.multiFileDelete(files).subscribe(data => {
            if(data)this.documentservice.openSnackBar("Items deleted Successfully!", "X");
            this.fileAdded.emit()
          });
        })
      })
    }
    else if (files.length && !folders.length) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
  
     
      }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFiles' }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
    
       
        }, 10);
        if (res) this.documentservice.multiFileDelete(files).subscribe(data => {
          if(data)this.documentservice.openSnackBar("File(s) deleted Successfully!", "X");
          this.fileAdded.emit()
        });
      })
    }
    else if (folders.length && !files.length) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
  
     
      }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFolders' }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
    
       
        }, 10);
        if (res) this.documentservice.multiFolderDelete(folders).subscribe((data :any)=> {
          if(data.message=="success")
          {
            this.documentservice.openSnackBar("Folder(s) deleted successfully", "X");
          }
          this.fileAdded.emit()
        });
      })
    }
}
  multiSelectMove() {
    this.dialogopen = false
    this.sample2 = false
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    setTimeout(() => {
      $('body').css("overflow", "hidden");

   
    }, 10);
    let dialogRef = this.dialog.open(MovetoComponent,
      {
        width: '500px',
        panelClass: "withoutpadding",
        data: { folders: this.folderarr, documents: this.filearr, Allfolder: this.parent, multi: true },
        disableClose:true,
      });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
     }, 10);
      var selecteddata = {
        folders: folders,
        files: files,
        moveto: res
      }
      if (res != 'CloseButton') {
        this.documentservice.multiselectmove(selecteddata).subscribe(data => {
          if (data)
          {this.fileAdded.emit()
            this.documentservice.openSnackBar("Moved Successfully!", "X");
          } 
        })
        
      }

    });
  }
  getMultiCopy(){
    if(!this.folderarr.some(element => element.isFolder) && this.filearr.some(element => element.isFile)) return false
    else return true
  }
  getMultiFav(){
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
   if(folders.some(element => !element.favoriteid) || files.some(element => !element.favoriteid)) return true
   else return false
  }
   
  multiFavorite(favorite)
  {var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata = {
      folders: folders,
      files: files,
      make_favorite: favorite
    }
    this.documentservice.multiFavorite(selecteddata).subscribe(data => {
      if (data) {this.fileAdded.emit()
      if(favorite) this.documentservice.openSnackBar("Added to favourites!", "X");
      else this.documentservice.openSnackBar("Removed from favourites!", "X");
}
    })

   
  }
  multishareElement()
  {
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata = {
      folders: folders,
      files: files,
    }
    if (this.newelement && this.newelement.type == 'individual') {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
     
      }, 10);
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '848px',
        height:'600px',
        disableClose: true,
        autoFocus: false,
        panelClass: "test",
        data: { content: selecteddata, text: 'owner', title: null,multi:true }
      });
      filedialog.afterClosed().subscribe(res => {
        console.log(res,'grrrr')
        setTimeout(() => {
          $('body').css("overflow", "auto");
    
       
        }, 10);
      });
    }
    else  {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
      }, 10);
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: false,
        panelClass: "orgn",
        autoFocus: false,
        data: { content: selecteddata, title:null , multi:true},
      });
      filedialog.afterClosed().subscribe(res => {
        if(res != 'true'){
setTimeout(()=>{
  $('body').css("overflow","auto")
},10)
    }
      });
    }
  }
  // navigate to file or folder while touch enabled devices
navigatewhiletouch(e,element) {
  var time2 = e.timeStamp;
  var time1 = e.currentTarget.dataset.lastTouch || time2;
  var dt = time2 - time1;
  var fingers = e.touches.length;
  e.currentTarget.dataset.lastTouch = time2;
  if (!dt || dt > 500 || fingers > 1) return; // not double-tap
  else
  { 
this.navigatemodal(element)
  } 
  e.preventDefault();
  e.target.click();
}
}

export interface FileElement {
  _id?: string;
  name: string;
  parentid: string;
  userid: string;
  folderid: string;
  isFolder: boolean;
  active: boolean;
  isFile: boolean;
  isfavorite: boolean;
  favoriteid: string;
  updatedAt: string;
  createdAt: string;
}

export interface FileData {
  _id?: string;
  name: string;
  parentid: string;
  userid: string;
  folderid: string;
  path: string;
  isFolder: boolean;
  uid: string;
  isfavorite: boolean;
  favoriteid: string;
  updatedAt: string;
  created_at: string;
}

