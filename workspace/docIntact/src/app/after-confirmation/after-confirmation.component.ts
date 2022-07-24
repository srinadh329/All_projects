import { Component, Input, SimpleChanges, ViewChild, Output, EventEmitter,NgZone, HostListener } from '@angular/core';
import { MatDialog, MatSnackBar  } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { UploadEvent, FileSystemFileEntry } from 'ngx-file-drop';
import { DocumentService } from '../document.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { FileQueueObject, FileuploadService } from '../fileupload.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from '../general.service';
import * as moment from 'moment';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
import { async } from '@angular/core/testing';
import { AdminService } from '../admin.service';
declare var gapi: any; //google-drive
declare var google: any; //google-drive
declare var Dropbox: any; //drop box
declare var OneDrive: any; //onedrive 
declare var $: any; //jquery variable+

@Component({
  selector: 'app-after-confirmation',
  templateUrl: './after-confirmation.component.html',
  styleUrls: ['./after-confirmation.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AfterConfirmationComponent {

  getUploadSuccess: Subscription;
  testuingnew:Subscription
  message: any;
  verificationdata:any
  constructor(private adminService: AdminService,private documentservice: DocumentService, private generalservice: GeneralService, public userService: UserService, private http: HttpClient, 
    private router: Router, public dialog: MatDialog, private documentService: DocumentService, private frontendconfig: FrontEndConfig, private routes: ActivatedRoute,public snackBar: MatSnackBar, public uploader: FileuploadService,private _ngZone: NgZone) {
    this.getUploadSuccess = this.uploader.getUploadSuccess().subscribe((message: any) => {
      this.message = message;
      this.totalfilelength=0
          this.fileAdded.emit()
          this.uploadCompleted = true;
          this.uploader.clearQueue();
          this.router.navigate(['/home/myfiles/']);
      
    });
    this.testuingnew = this.uploader.getUploadResponse().subscribe((message: any) => {
      this.verificationdata = message;
      if (message.responsedata == 'PDF is password protected, please enter password'||message.responsedata =='Please check your password') {
        // this.uploader.clearQueue()
        // this.uploadCompleted=true
        this.passwordVerification(message);
      }
    });

  }

  serverurl = this.frontendconfig.getserverurl();
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
  @Output() modalnavigate = new EventEmitter<FileElement>();//modal data navigation

  @ViewChild('fileInput') fileInput;
  @ViewChild('fileInput1') fileInput1;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger; //context menu
  @ViewChild(MatMenuTrigger) contextMenu1: MatMenuTrigger; //context menu

  // public files: Observable<FileQueueObject[]>;
  profileData: any
  folderName: string;
  document = true;
  btn3: boolean;
  btn4: boolean;
  btn5: boolean;
  title: any;
  queue: Observable<FileQueueObject[]>;
  dragfiles: Observable<FileQueueObject[]>;
  foldershow = false
  foldersdata: any
  folders: any
  folder = false;
  file = true;
  url = false;
  favoriteElements: any;
  Menuhide: boolean = false
  folderhide = false
  foldervalue
  movefolder: any;
  filesToUpload: any;
  folderid
  show = false;
  name: any;
  auditlogs: any
  filedata: any
  access: any
  sampledata: any
  favorites
  favoritesfiles = []
  recentfiles: any
  btn1: boolean = false
  btn2
  sampledata1: any
  selectedName: any
  sample2: any
  element: any
  foldweshow1: boolean = false
  urlshow: boolean = false
  urlshow1: boolean = false
  uploadCompleted: Boolean = false;
  isloading: boolean = true
  isSocialLoading:boolean=false;
  @Input() modalElement = []
  @Input() Myfiles
  @Output() modalPath = new EventEmitter
  totalfilelength:number=0
  checkuploadlength
  iebrowser
  //================ recent files data ==================
  recentfile() {
    this.isloading = true;
    this.documentservice.recentfiles().subscribe(data => {
      this.recentfiles = data
      this.isloading = false;
    })
  }
  //================ recent files data ends ==================

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
        document.getElementById('closerecent').click()
        document.getElementById('fileselect123').click()
  }


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
    // this.EnableDelete=false
    }
  }
  @HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
    if(this.contextMenu) this.contextMenu.closeMenu()
}
  //=================== favorite files data ==================
  favoritefiles() {
    this.isloading = true;
    this.documentservice.getfavorites().subscribe(data => {
      this.favorites = data
      this.favorites.forEach(element => {
        if (element.isFile && element.fileid ) {
          this.favoritesfiles.push(element)
        }
      });
      this.isloading = false
    })
  }
  //=================== favorite files data ends==================

//password verification for password protected file
passwordVerification(message) {
  var resultdata
  let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'protection', content: message },disableClose: true, width: '570px', panelClass: "deletemod" });
  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      var data = {
        file: this.verificationdata,
        password: res
      }
      resultdata=this.uploader.passwordremover(data)
    }
    else {
      this.uploadCompleted = false;
      this.uploader.continueQueue();
      // this.documentservice.openSnackBar("File Removed", "X")
    }
  });
}


  ngOnInit() {
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
$(".ietop").css("margin-top","100px");
this.iebrowser=true
    
     }
     else this.iebrowser=false
    this.recentfile();
    this.favoritefiles();
    this.getProfiles()
  }
  navigatemodal(element) {
    // this.backbuttonenable=true
    this.modalnavigate.emit(element)
    this.folderarr=[]
    this.filearr=[]
  }
  modalback() {
    this.modalPath.emit()
  }
  smp() {
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
  }

  uploadUrl(parentid) {
    this.file = false;
    this.url = true;
    this.document = false;
    this.folder = false;
    this.sampledata1 = parentid;
  }

  UrlfileDialog(parentid) {
    this.sampledata1 = parentid;
    // document.getElementById("openModalButton3").click();
  }

  urlcontent(urldata) {
    //  if(urldata.value.value == undefined)
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    // var expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/([-a-zA-Z0-9@:%_\+.~#?&//=]*).pdf
    if (urldata.value.value == undefined) {
      this.urlshow = true

      // this.documentservice.openSnackBar("Enter URL ", "X")
    }
    else {
      document.getElementById('fileselect123').click()
      this.isloading=true
      urldata.value.parentid = this.sampledata1;
      this.uploader.urlcontent(urldata.value).subscribe(data => {
       this.isloading=false
        urldata.resetForm()
        this.uploadFile('document')
        
        this.documentservice.openSnackBar("FILE ADDED FROM URL", "X")
        this.fileAdded.emit();
      }, error => {
        urldata.resetForm()
        if (error == "Invalid")
          this.documentservice.openSnackBar("Unable to find pdf ", "X")
        //  document.getElementById('urlbtn').click()
        this.isloading=false
      })
    }
    // let headers = new HttpHeaders();
    // headers = headers.set('Accept', 'application/pdf');
    // return this.http.get(url, { headers: headers, responseType: 'blob' as 'json' });
  }

  openNewFolderDialog() {
    // const dialogConfig = new MatDialogConfig();
    setTimeout(() => {
      $('body').css("overflow","hidden");
  
      }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'create' }, width: '500px', height: '200px', panelClass: "withoutpadding",  disableClose:true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow","auto");
    
        }, 10);
      this.btn2 = false
      if (res) {
        this.folderAdded.emit({ name: res });
        // this.router.navigate(['/home/myfiles/']);

      }
    });
  }

  FolderUploadDialog(parentid) {
    this.sampledata = parentid;
    document.getElementById("openModalButton2").click();
  }

  FolderUploadDialog1(parentid) {
    this.sampledata = parentid;
    document.getElementById("openModalButtonn").click();
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

  //=============== delete element =======================================
  deleteElement(element: FileElement) {
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'delete' }, width: '500px' });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.elementRemoved.emit(element);
      }
    });
  }
  //========================= delete folder ends===============================

  //=============================make favorite ================================
  Favorite(element: FileElement) {
    this.elementfavorite.emit(element);
  }
  //=============================make favorite ends =================================

  navigate(element: FileElement) {
    var link = "http://localhost:4200/home/myfiles/:" + element._id
    if (element.isFolder) {
      this.foldervalue = element
      // this.router.navigate(['/home/myfiles/:' + this.foldervalue.name + ':' + this.foldervalue.encryptedId]);
      this.navigatedDown.emit(element);
    }
  }

  //============ sort data in ascending order =====================
  sortDataAsc() {
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
  //============ sort data in ascending order ends=====================

  //============ sort data in descending order =====================
  sortDataDsc() {
    this.modalElement.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
    this.Myfiles.sort(function (a, b) {
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
    this.modalElement.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;

    })
    this.Myfiles.sort(function (a, b) {
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

    this.modalElement.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;

    })
    this.Myfiles.sort(function (a, b) {
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
    this.selectedName = element._id;
    this.sample2 = true
    this.element = element;
  }
  navigateUp() {
    this.navigatedUp.emit();
  }

  //================move element==========================
  moveElement(element, moveTo) {
    this.elementMoved.emit({ element: element, moveTo: moveTo });
  }

  //=================tranfer element =============================
  transferElement(element, moveTo) {
    this.fileMoved.emit({ element: element, moveTo: moveTo });
  }

  filearr = new Array();
  folderarr = new Array();
  isctrlkey: boolean;
  triggervalue: boolean = true
  firstuser: boolean = false;
  newelement: any
  matmenu: any

  getHighlight(data) {

    if (data.isFile) {

      if (this.filearr.some(element => element._id == data._id)) return true
      else return false
    }
    else if (data.isFolder) {
      if (this.folderarr.some(element => element._id == data._id)) return true
      else return false
    }
    else return false
  }
  multiselectpdf(element1, event) {
    this.triggervalue = true;
    if (event.ctrlKey) {
      if (element1.isFile) {
        if (!this.filearr.some(element => element._id == element1._id)) {
          this.filearr.push(element1);
          // if(this.filearr.length >1) this.EnableDelete=true;
        }
        else {
          var indexNum = this.filearr.findIndex((element) => {
            return (element._id == element1._id);
          });
          this.filearr.splice(indexNum, 1);
        }
      }
      else if (element1.isFolder) {
        if (!this.folderarr.some(element => element._id == element1._id)) {
          this.folderarr.push(element1)
          // if(this.folderarr.length >1) this.EnableDelete=false;
        }
        else {
          var indexNum = this.folderarr.findIndex((element) => {
            return (element._id == element1._id);
          });
          this.folderarr.splice(indexNum, 1);
        }
      }
    }
    else {
      if (element1.isFile) {
        this.filearr = [element1]
        this.folderarr = []
      }
      else if (element1.isFolder) {
        this.folderarr = [element1]
        this.filearr = []
      }
    }

    if ((this.filearr.length > 1 || this.folderarr.length > 1) || (this.filearr.length == 1 && this.folderarr.length == 1)) {
      this.triggervalue = false;
      this.sample2 = false;
      // this.EnableDelete=true;
    }
  }

  shareElementWithMultiple(title: any) {
    console.log(this.filearr, this.filearr.length)
    if (this.filearr.length || this.folderarr.length) {
      if (title == 'Signature' && this.folderarr.length) return this.documentservice.openActionSnackBar(' Folders are not shared for signature', 'x');
      if (title == 'Signature' && this.folderarr.length == 0 && this.filearr.length == 1) {
        // document.getElementById('closerecent').click()
        console.log(this.filearr, this.filearr[0])
        return this.getUserDocList(this.filearr[0]);
      }
      if (title == 'Signature' && this.filearr.length > 1) this.documentservice.openActionSnackBar('Multiple files are shared in Review mode only.', 'x');
      this.multishareElement();
      document.getElementById('closerecent').click()

    }
    else {
      this.documentservice.openActionSnackBar(' Please Select File', 'x')
    }
  }

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

  multishareElement() {
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
        height: '600px',
        disableClose: true,
        autoFocus: false,
        panelClass: "test",
        data: { content: selecteddata, text: 'owner', title: null, multi: true }
      });
      filedialog.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");


        }, 10);
      });
    }
    else if (this.newelement && this.newelement.type == 'organisation') {
      setTimeout(() => {
        $('body').css("overflow", "hidden");


      }, 10);
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: false,
        panelClass: "option",
        autoFocus: false,
        data: { content: selecteddata, title: null, multi: true },
      });
      filedialog.afterClosed().subscribe(res => {
        if(res!='true'){
        setTimeout(() => {
          $('body').css("overflow", "auto");
         }, 10);
      }
      });
    }
  }

  openMenufolder1(event: TouchEvent, element: FileElement) {

    if (!this.filearr.some(element1 => element1._id == element._id) && !this.folderarr.some(element1 => element1._id == element._id)) {
      if (element.isFile) {
        this.filearr = [element]
        this.folderarr = []
      }
      else if (element.isFolder) {
        this.folderarr = [element]
        this.filearr = []
      }
    }
    this.matmenu = element
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.changedTouches[0].clientX + 'px';
    this.contextMenuPosition.y = event.changedTouches[0].clientY + 'px';
    if (((this.filearr.length > 1 || this.folderarr.length > 1) || (this.filearr.length == 1 && this.folderarr.length == 1))) this.contextMenu1.openMenu();
    else this.contextMenu.openMenu()
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
            if (data) this.documentservice.openSnackBar("Items deleted Successfully!", "X");
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
          if (data) this.documentservice.openSnackBar("Files deleted Successfully!", "X");
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
        if (res) this.documentservice.multiFolderDelete(folders).subscribe(data => {
          if (data) this.documentservice.openSnackBar("Folders deleted Successfully!", "X");
          this.fileAdded.emit()
        });
      })
    }
  }
  //=================share element ==================================
  shareElement(element: FileElement, title: any) {
    if (element == undefined) this.documentService.openActionSnackBar(' Please Select File', 'x')
    else if (title == 'Signature' && element.isFolder) this.documentservice.openActionSnackBar(' Folders are not shared for signature', 'x')
    else {    
        if (title == 'Review') document.getElementById('closerecent').click();
        if (title == 'Signature') this.getUserDocList(element);
        else this.elementShared.emit({ element: element, title: title });      
    }
  }

  // to get the userlist from the doc based upon the feilds for (SIGNATURE)
  userDoc: any;
  getUserDocList(element) {
    if (element.isFile) {
      this.documentservice.getCurrentVersionDocFieldOptions({ documentid: element._id, versionid: element.versionid }).subscribe(response => {
        this.userDoc = response;
        if ((this.userDoc && !this.userDoc.fields.length) || !this.userDoc) this.addFeildsPopUp(element);
        else {
          document.getElementById('closerecent').click();
          this.elementShared.emit({ element: element, title: 'Signature' });
        }
      });
    }
    if (element.isFolder) { document.getElementById("closerecent").click(); this.elementShared.emit({ element: element, title: 'Review' }); }
  }

  addFeildsPopUp(element) {
    let dialogRef22 = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents' }, width: '500px', panelClass: "deletemod" });
    dialogRef22.afterClosed().subscribe(res1 => {
      if (res1) {
        dialogRef22.close();
        this.getFileContent(element);
        document.getElementById('closerecent').click()
      }
      else dialogRef22.close();
    });
  }

 

  FileMenu = false;
  contextMenuPosition = { x: '0px', y: '0px' };

  mouseclick = function () { this.FileMenu = false }

  openNewMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    if (!this.FileMenu) {
      event.preventDefault();
      viewChild.openMenu();
    }
  }

  //drag and drop folders and files
  onDrop(event, element) {
    this.moveElement(event.data, element)
  }

  //======================== drag and drop function =====================
  // public dropped = async function (event: UploadEvent) {
  //   console.log('In dropped')
  //   let parentResult = 0;
  //   document.getElementById('fileselect123').click()
  //   if(!this.totalfilelength) document.getElementById("openModalButton").click();

  //   var files = event.files;
  //   //------------------- Duplicate folder code
  //   var fileindex = 0
  //   var folderName
  //   var duplicatefolderName
  //   this.checkuploadlength = event.files.length;
  //   this.totalfilelength=this.totalfilelength+this.checkuploadlength
  //   this.uploader.array1 = this.totalfilelength;
  //   if (files.length) {
  //     duplicatefolderName = this.fileElements.filter((folderdata: any) => folderdata.isFolder && folderdata.name == files[0].relativePath.split('/')[0]);
  //     if (duplicatefolderName.length > 0) {
  //       duplicatefolderName[0].nameCount = Number(duplicatefolderName[0].nameCount) + 1
  //       this.documentService.updatefolder(duplicatefolderName[0]).subscribe(data => {
  //       });
  //     }
  //     if (duplicatefolderName.length > 0) folderName = files[0].relativePath.split('/')[0] + "(" + duplicatefolderName[0].nameCount + ")"
  //   }
  //   document.getElementById('closerecent').click()
  //   //------------------------------------------------ end
  //   for (const file of files) {
  //     fileindex++
  //     if (!parentResult) {
  //       if (this.currentRoot) parentResult = this.currentRoot._id
  //       else parentResult = 0
  //     }
  //     const filePathArray = file.relativePath.split('/');
  //     var index = 0
  //     for (const filePathArrayData of filePathArray) {
  //       if (index == filePathArray.length - 1 && file.fileEntry.isFile) {
  //         await this.uploadDragedFile(file, parentResult, filePathArray.length)
  //       }
  //       if (index != filePathArray.length - 1) {
  //         let folderDetails = { name: filePathArrayData, parentid: parentResult };
  //         parentResult = await this.backendres(folderDetails);
  //       }
  //       index++;
  //     }
  //     parentResult = 0
  //     if(fileindex == files.length)  this.uploader.uploadAll()
  //   }
  //   this.fileAdded.emit();
  // }

    //======================== drag and drop function =====================
    public dropped = async function (event: UploadEvent) {
      console.log("In dropped")
      this.uploadCompleted = false;
      let parentResult = 0;
      var fileindex = 0
  
      document.getElementById('fileselect123').click()
      if(!this.totalfilelength) document.getElementById("openModalButton").click();
      document.getElementById('closerecent').click()
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
  RecentlyUploadedFilesList = []
  RecentlyUploadedFoldersList = []
  // File name splictting with extention
  fileNameSplit(inputFile) { // Need to pass formal argument as JSON object
    let result, extention;
    if (inputFile.fileEntry) inputFile = inputFile.fileEntry as FileSystemFileEntry;
    if (inputFile.type == 'application/pdf')
      extention = 'pdf'
    else if (inputFile.type == 'application/msword')
      extention = 'doc'
    else if (inputFile.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      extention = 'docx'
    else if (!(inputFile.type) && ((inputFile.name.lastIndexOf(".") + 1 == (inputFile.name.length - 3)) || (inputFile.name.lastIndexOf(".") + 1 == (inputFile.name.length - 4)))) {
      extention = inputFile.name.substring(inputFile.name.lastIndexOf(".") + 1, inputFile.name.length);
      if (!(extention == 'pdf' || extention == 'doc' || extention == 'docx'))
        return result;
    }
    else return result;
    if (inputFile.name.length - (inputFile.name.lastIndexOf(".") + 1) == extention.length) {
      let newName = inputFile.name.substring(0, inputFile.name.length - (extention.length + 1));
      result = { name: newName, extention: extention }
    }
    return result
  }
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
  // //===============================================================
  // filesPicked = async function (files, event) {
  //   this.foldweshow1 = false
  //   document.getElementById('fileselect123').click()
  //   document.getElementById("closerecent").click();
    
  //   var fileindex = 0
  //   //------------------- Duplicate folder code
  //   var folderName
  //   var duplicatefolderName
  //   if (files.length) {
  //     // this.fileElements.subscribe(folders => {
  //     duplicatefolderName = this.fileElements.filter((folderdata: any) => folderdata.isFolder && folderdata.name == files[0].webkitRelativePath.split('/')[0]);
  //     //   })
  //     if (duplicatefolderName.length > 0) {
  //       duplicatefolderName[0].nameCount = Number(duplicatefolderName[0].nameCount) + 1
  //       this.documentService.updatefolder(duplicatefolderName[0]).subscribe(data => {
  //       });
  //     }
  //     if (duplicatefolderName.length > 0) folderName = files[0].webkitRelativePath.split('/')[0] + "(" + duplicatefolderName[0].nameCount + ")"
  //   }
  //   if(!this.totalfilelength)document.getElementById("openModalButton").click();
  //   this.uploader.array1 = files.length;
  //   this.checkuploadlength = files.length
  //   this.totalfilelength=this.totalfilelength+this.checkuploadlength

  //   //------------------------------------------------ end
  //   for (const file of files) {
  //     fileindex++;
  //     const filePathArray = file.webkitRelativePath.split('/');
  //     this.folderdata = file.webkitRelativePath;
  //     var parentResult = 0;
  //     if (this.sampledata) {
  //       parentResult = this.sampledata;
  //       // this.sampledata=false
  //     }
  //     var index = 0
  //     for (const filePathArrayData of filePathArray) {

  //       if (index == filePathArray.length - 1) { await this.onFileSelected1(file, parentResult) }
  //       if (index != filePathArray.length - 1) {
  //         let folderDetails = { name: filePathArrayData, parentid: parentResult };
  //         parentResult = await this.backendres(folderDetails);
  //       }
  //       index++;
  //     }
  //     this.fileAdded.emit();
  //     if(fileindex == files.length)  this.uploader.uploadAll()
  //   }
  //   //alert("Uploaded Successfully")
  // }
  //===============================================================
  filesPicked = async function (files) {
    console.log("In filesPicked")
    this.foldweshow1 = false
    document.getElementById('fileselect123').click()
    document.getElementById("closerecent").click();
    
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
        } while (this.fileElements.length >= count || this.RecentlyUploadedFoldersList.length >= count)
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

  onItemClick(element) {
    this.folderid = element
    this.fileInput1.nativeElement.value = "";
    document.getElementById('fileselect').click()
  }

  fileInputclick() {
    this.fileInput1.nativeElement.value = "";
    document.getElementById('fileselect121').click()
  }

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
  // addToQueue(folder) {
  //   // this.filesToUpload = <Array<File>>fileInput.target.files;
  //   document.getElementById('fileselect123').click()
  //   document.getElementById('closerecent').click()
  //   if (this.folderid) folder = this.folderid
  //   var totalSize = 0;
  //   // var fileBrowser = this.fileInput1.nativeElement;
  //   var fileBrowserelement = this.fileInput1.nativeElement
  //   // for(const element of this.filesToUpload)
  //   // element.folderid=folder
  //   this.queue = this.uploader.queue;
  //   if (fileBrowserelement) {
  //     var pdfFiles1 = []
  //     for (var i = 0; i < fileBrowserelement.files.length; i++) {
  //       if (fileBrowserelement.files[i].type == 'application/pdf' || fileBrowserelement.files[i].type == 'application/msword') {
  //         if (folder) fileBrowserelement.files[i].folderid = folder
  //         totalSize = totalSize + fileBrowserelement.files[i].size;
  //         pdfFiles1.push(fileBrowserelement.files[i]);
  //       }
  //     }
  //     if(!this.totalfilelength)document.getElementById("openModalButton").click();
  //     this.checkuploadlength = pdfFiles1.length
  //     this.totalfilelength=this.totalfilelength+pdfFiles1.length
  //     this.uploader.array1 = this.totalfilelength;
  //     this.uploader.addToQueue(pdfFiles1);
  //   }

  //   this.uploader.totalfilesize = totalSize;

  //   this.uploader.uploadAll()
  //   // document.getElementById("openModalButton").click();
  //   this.folderid = false
  //   this.fileAdded.emit();
  // }

    //=================== file upload ========================
    addToQueue(folder) {
      console.log('In addToQueue')
      document.getElementById('fileselect123').click()
      document.getElementById('closerecent').click()
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
            } while (this.fileData.length >= count || this.RecentlyUploadedFilesList.length >= count)
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
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //=================== folder create or update ====================
  backendres = function (folderDetails) {
    return new Promise(async (resolve, reject) => {
      await this.documentService.isFolderIsExist(folderDetails).subscribe(async folderdata => {
        if (folderdata) {
          resolve(folderdata._id);
        }
        else {
          await this.documentService.createfolder(folderDetails).subscribe(data => {
            this.RecentlyUploadedFoldersList.push(data)
            resolve(data._id)
          });
        }
      });
    });
  }
  //======================================================

  //=============== file view ======================
  getFileContent = function (content) {

    if(content.fileid && content.fileid._id)
    {
      var data={
        fileid:content.fileid._id
      }
      this.documentService.encryptedvalues(data).subscribe((data:any)=>{
        if(data)     this.router.navigate(['filecont/'+data.encryptdata]);
      });
    }

    else if(content && content._id)
    {
      var data={
        fileid:content._id
      }
      this.documentService.encryptedvalues(data).subscribe((data:any)=>{
        if(data) this.router.navigate(['filecont/'+data.encryptdata]);
      });
    }
    // this.documentService.getFileContent(content).subscribe(res =>{this.fileDataContent = res.data; });
  }
  //==============================================

  // pathmoving(path) {
  // }

  //=========== view details ===============
  viewDetails(element) {
    this.generalservice.getAuditlogs(element).subscribe(data => {
      this.auditlogs = data
      this.auditlogs.forEach(element => {
        var v = moment(element.created_at)
        var v1 = moment(element.endTime)
        var ms = v1.diff()
        element.hours = v1.diff(v, 'hours')
        element.minutes = v1.diff(v, 'minutes')
        element.seconds = v1.diff(v, 'seconds')
      });
      if (this.auditlogs)
        document.getElementById("auditLogBtn").click();
    })
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
          addView(new google.picker.DocsView().setIncludeFolders(true).setOwnedByMe(false).setMimeTypes("application/pdf,application/vnd.google-apps.document,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document")).// addView(new google.picker.DocsUploadView()).
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
      if(!NgZone.isInAngularZone())this._ngZone.run(() => {
        this.documentservice.openSnackBar("File added from Google Drive ", "X");
      });      this.uploadFile('document')
      this.fileAdded.emit();
      this.isSocialLoading = false;
      this.recentfile()
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

  // ========================================  dropbox ==============================================

  dropdevkey = 'hfds0x416l38hgr';
  dropscret = 'k2f83puyfke1z1t';
  loaddropbox = function () {
   
    Dropbox.choose(this.options);
  }

  options = {
    success: (files) => {
      this.isSocialLoading = true;
      document.getElementById('fileselect123').click()

      files.forEach(element => {
        this.dropurlcontent(element.link);
      });
    },

    cancel: function () { },

    linkType: "direct", // or "preview"
    multiselect: false, // or false
    extensions: ['.pdf','.doc','.docx'],
    folderselect: false, // or true
  };

  dropurlcontent(urldata) {
    var regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    var dropboxurl = { value: urldata }
    if (urldata) {
      // urldata.value.parentid = this.sampledata1;
      this.uploader.urlcontent(dropboxurl).subscribe(data => {
        this.documentservice.openSnackBar("File added from Dropbox", "X")
        this.recentfile()
        this.fileAdded.emit();
        this.isSocialLoading=false;
      }, error => {
        if (error == "Invalid")
          this.documentservice.openSnackBar("not pdf ", "X")
          this.isSocialLoading=false;
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
        filter: ".pdf,.doc,.docx" ,// Show only folders and png files
        redirectUri:"https://staging.docintact.com/home/"
      },
      success: (files) => {
        this.isSocialLoading=true
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
        this.isSocialLoading=false
        this.recentfile()
          this.documentservice.openSnackBar("File added from Onedrive", "X");
          this.fileAdded.emit();
          this.isSocialLoading=false;
        }, error => {
          if (error == "Invalid")
            this.documentservice.openSnackBar("not pdf ", "X")
            this.isSocialLoading=false;
        })
      }
    });

  }

  // ================================= one drive end ===========================
  samp() {
    document.getElementById('viewmodel').click()
    $(document).ready(function () {
      // $(".newclass").animate({right: '10px'});
      $(".newclass").css("width", "500px");
    });
  }
closemodal()
{
  document.getElementById('closerecent').click()
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
     console.log(element)
this.navigate(element)
  } 
  e.preventDefault();
  e.target.click();
}
ngOnDestroy() {
  this.testuingnew.unsubscribe();
  this.getUploadSuccess.unsubscribe();

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
  updatedAt: string
}

export interface FileData {
  _id?: string;
  name: string;
  parentid: string;
  userid: string;
  folderid: string;
  path: string;
  isFolder: boolean;
  uid: string
  isfavorite: boolean;
  favoriteid: string;
  updatedAt: string
}

