import { Component, ViewChild, Output, EventEmitter, TemplateRef, OnInit, ViewContainerRef,HostListener,NgZone } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { DocumentService } from '../document.service';
import { DataService } from '../core/data.service';
import { UserService } from '../user.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from "@angular/router";
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { FasDirective } from 'angular-bootstrap-md';
import { ActivatedRoute } from '@angular/router';
import { Location,LocationStrategy } from '@angular/common';

declare var $: any;
declare var gapi: any;
@Component({
  selector: 'app-sentfiles',
  templateUrl: './sentfiles.component.html',
  styleUrls: ['./sentfiles.component.css']
})
export class SentfilesComponent implements OnInit {
  @ViewChild('userMenu') userMenu: TemplateRef<any>;
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  overlayRef: OverlayRef | null;
  type: any
  sub: Subscription;
  id: any
  filedata = []
  profileData: any
  folders = []
  currentRoot = null;
  currentPath = null;
  canNavigateUp = false;
  organization: Array<any> = []
  status: any
  uid: any;
  sentdata;
  sentfiles = [];
  sentfolders = [];
  selectedName: any;
  sample2 = false
  grid = true
  selectedelement
  sharedPeople = []
  doc
  Sharedata
  querySubject
  documentLogs
  viewDetailsvalue = false
  matmenu: any
  element: any
  isloading: boolean = true
  FileMenu = false;
  contextMenuPosition = { x: '0px', y: '0px' };
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  triggervalue:Boolean=false;
  EnableDelete:Boolean=false;
  email
  checkid
  navigationelement
  currentelement
  foldervalue
  browserpath
  modalid
  modalopened
  pathvalue
  iebrowser
  matttoltip
  constructor(private Locations: Location,private activatedroute: ActivatedRoute,private _ngZone: NgZone,public overlay: Overlay, public viewContainerRef: ViewContainerRef, public dataservice: DataService, private router: Router, private documentService: DocumentService, private frontendconfig: FrontEndConfig, private userservice: UserService, public dialog: MatDialog) {
  }

  @Output() elementShared = new EventEmitter<{ element: FileElement, title: any }>();
  @Output() elementRemoved = new EventEmitter<FileElement>();
  @Output() folderAdded = new EventEmitter<{ name: string }>(); // folder adding
  @Output() fileAdded = new EventEmitter<{ data: string }>(); //file adding
  @ViewChild(MatMenuTrigger) contextMenu1: MatMenuTrigger; //context menu
  serverurl = this.frontendconfig.getserverurl();
  @HostListener('window:resize', ['$event'])
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode==65) {
      this.filearr = this.filedata;
      this.folderarr = this.folders;
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

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
        if(this.currentelement.parentid){
              this.documentService.getnavigationfolder(this.currentelement.parentid).subscribe(data=>{
                this.browserpath=data
                this.currentelement=data
                this.navigateUp(this.browserpath)
              })
            }
            else if(this.currentelement){
              this.browserpath='root'
               this.navigateUp(this.browserpath)
               setTimeout(() => {
                this.router.navigate(['home/sentfiles']); 
              }, 1000);
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
  ngOnInit() { 




    if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
      $(".ietop").css("margin-top", "100px");
      this.iebrowser=true
  
    }
    else this.iebrowser=false

    var id=this.router.url.substring(this.router.url.lastIndexOf('/')  + 1)

    if(id!='sentfiles'){
      this.isloading = false;

      var path = JSON.parse(localStorage.getItem('currentpath'));
      for(var j =0;j<path.length;j++){
        if(path[j]){
         for(var i in path[j]){
           if(path[j][i] && i!='encryptedId')path[j][i] = this.userservice.decryptData(path[j][i]);
             }
        }
     
      }
      var data={
        fileid:id
      }
      this.documentService.decryptedvalues(data).subscribe((encryp:any)=>{

     
      this.documentService.getfolder().subscribe(data => {
        this.checkid = data;
       this.checkid.forEach(element => {
        if(element._id == encryp.decryptdata){
          this.navigationelement=element
            this.currentRoot=this.navigationelement
            this.currentPath=path
            this.currentelement=this.navigationelement
            this.navigateToFolder(this.navigationelement) 
            this.popFromPath(this.currentPath,this.currentRoot)
        }
       });
       if(!this.currentelement){
        console.log('URL not found (404)')
        this.router.navigate(['home/sentfiles'])
      }
      
       })   
      },error => {
        console.log(error)
        this.router.navigate(['home/sentfiles'])
      })
     }
   else{
      if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
        $(".ietop").css("margin-top", "100px");
    
      }
      this.GetsentDocuments();
    
    }


    }
//========================for view data of particular doc/folder================================================
  /*viewDetails(doc) {
    this.profileData=JSON.parse(localStorage.getItem('currentUser'))
    this.profileData.name= this.userservice.decryptData(this.profileData.name);
    this.profileData.email= this.userservice.decryptData(this.profileData.email);
    this.doc = doc
    this.viewDetailsvalue = true
    this.documentService.getsharingpeople(doc).subscribe((data: any) => {
      this.sharedPeople = data
      if (doc.status == "Completed")
        this.doc.count = data.length
      else if (doc.status == "Partially completed")
        this.doc.count = Math.round(data.length / 2)
      else if (doc.status == "Waiting for Sign")
        this.doc.count = 0
    });
  } */ 

  viewDetails = function (element) {
    var data={
      fileid:element._id
    }
    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
      if(element.isFile) this.router.navigate(['home/auditlog/'+data.encryptdata+'/File']);
      else this.router.navigate(['home/auditlog/'+data.encryptdata+'/Folder']);
    
    })
    // this.documentservice.getDocumentLogs(element).subscribe(data => {
    //   this.documentLogs = data
    // })
  }
//======================gting Activity of folder/document=============================================
  Activity(doc) {
    this.documentService.getDocumentLogs(doc).subscribe(data => {
      this.documentLogs = data
    })
  }
//==================sort by name====================================================================
  sortDataAsc() {
    this.sentfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1;}
      return 0;
    })
    this.sentfolders.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1;}
      return 0; 
    })
  }
  sortDataDsc() {
    this.sentfiles.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;

    })
    this.sentfolders.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }
//==================================sort by folder=========================================================
  sortByModifiedAsc() {
    this.sentfiles.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1;}
      return 0; 
    })
    this.sentfolders.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1;}
      return 0;     })
  }

  sortByModifiedDsc() {
    this.sentfiles.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;    
    })
    this.sentfolders.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
        })
  }



  openMenufolder(event: MouseEvent, element: FileElement) {
    this.selectedName=element._id
    this.element=element
    this.matmenu = element
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.openMenu();
  }
  openMenufolder1(event: TouchEvent, element: FileElement) {
    this.element=element
    this.matmenu = element
    this.FileMenu = true;
    event.preventDefault();
    this.contextMenuPosition.x = event.changedTouches[0].clientX + 'px';
    this.contextMenuPosition.y = event.changedTouches[0].clientY + 'px';
    this.contextMenu.openMenu();

  }
//==============================To open share pop dialog box based on user type==============================================
  shareElement(element) {
    var title = 'share'
    this.profileData=JSON.parse(localStorage.getItem('currentUser'))
    this.profileData.type= this.userservice.decryptData(this.profileData.type);
    if (this.profileData.type == 'individual') {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '848px',
        height:'630px',
        disableClose: true,
        autoFocus: false,
        panelClass:"test",
       
        data: { content: element, text: 'owner',multi:false }

      });

      filedialog.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
       
      })

    }
    else  {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: true,
        autoFocus: false,
        panelClass:'orgn',
        data: { content: element,multi:false },
      });
      filedialog.afterClosed().subscribe(res => {
        if(res=='true')
        {
          setTimeout(() => {
            $('body').css("overflow", "hidden");
             }, 10);
        
        
        }
        else {
          setTimeout(() => {
            $('body').css("overflow", "auto");
             }, 10); 
        }
       
      
      })
    }
    if (element) {
      if ((title == 'share' || title == 'Review' || title == 'Signature')&&document.getElementById('modelclose')) document.getElementById('modelclose').click()
      if (title == 'Signature') this.getFileContent(element)
      else this.elementShared.emit({ element: element, title: title });
    }
  }


//================================================END========================================================================
  getFileContent = function (content) {
    var data={
      fileid:content._id
    }
    // var value= this.userservice.encryptData(content._id)
this.documentService.encryptedvalues(data).subscribe((data:any)=>{
  this.router.navigate(['filecont/'+data.encryptdata]);

})
  }

  deleteElement(element: FileElement) {
    if (element.isFolder) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { name: 'deletefolder' }, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {
          this.close();
          this.documentService.updatesentfolder(element).subscribe(data => {
            this.GetsentDocuments()
  
            this.documentService.openSnackBar("Folder(s) deleted successfully" ,"X")
          })
        }
       
      });
    }
    else {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { name: 'delete' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
      if (res) {
          this.close();
          this.documentService.updatesentfolder(element).subscribe(data => {
            this.GetsentDocuments()
            this.documentService.openSnackBar("File(s) deleted successfully" ,"X")
          })
        }
       
      });
    }
  }
  //===========To close side information tab===================================================
  close() {
    this.sub && this.sub.unsubscribe();
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
//==================Get all sent Doucuments and Folders=============================================
  GetsentDocuments() {
    this.isloading = true
    this.filedata = []
    this.folders = []
    this.documentService.getSentDocs().subscribe(data => {
      this.sentdata = data;
      if (this.sentdata.length > 0) {
        this.sentdata.forEach(element => {
          if (element.isFile) {
            this.filedata.push(element)
          }
          else if (element.isFolder) {
            this.folders.push(element)
          }
          if (this.sentdata.length - 1 == this.sentdata.indexOf(element)) { this.sentfiles = this.filedata; this.sentfolders = this.folders }
        });
      }
      else {
        this.sentfiles = this.sentdata;
        this.sentfolders = this.sentdata
      }
      this.isloading = false
    });
  }

  highlightRow(element) {
    this.element = element
    this.selectedName = element._id;
    this.sample2 = true
    this.selectedelement = element
  }
//================================END======================================================================================
  //==========================navigation to folder====================

  navigateToFolder(element) { 
    this.currentRoot = element;
    this.currentelement=element
    this.foldervalue = element
    var data={
      fileid:this.foldervalue._id
    }
this.documentService.encryptedvalues(data).subscribe((data:any)=>{
   if(data) this.router.navigate(['/home/sentfiles/'+data.encryptdata]);

})

    // this.router.navigate(['/mainnav/sentfiles/:id'], { queryParams: { id: this.foldervalue._id } });

    var subfolder = this.getsubfolders(this.currentRoot);
    subfolder.subscribe(data => {
      if (data) this.updateAlldocuments();
    })
    this.currentPath = this.pushToPath(this.currentPath, element);
    localStorage.removeItem('currentpath') 
    this.userservice.setpath(this.currentPath);

    this.filearr=[];
    this.folderarr=[]
  }


  
  // ============================navigate pop =============================
  navigateUp(event) { 
    if (event != 'root') {
      this.currentRoot = event
      var subfolder = this.getsubfolders(this.currentRoot)
      subfolder.subscribe(data => {
        if (data) this.updateAlldocuments();
      })
    }
    else {
      this.currentRoot = null
      this.GetsentDocuments()
    }
    this.currentPath = this.popFromPath(this.currentPath, this.currentRoot);
  }

// ============================ adding a path =====================

  pushToPath(path: any, folderName) { 
    var p1 = [];
    if (path) {
      path.forEach(element => {
        if (element) p1.push(element);
      });
    }
    p1.push(folderName);
    return p1;
  }

  // ============================remove from path ======================

  popFromPath(path, current) { 
    if (current == null) {
      path = [];
      this.router.navigate(['/home/sentfiles']);

    }
    else {
      // this.router.navigate(['/mainnav/sentfiles/:' + current.name + ':' + current.encryptedId]);
      // var value= this.userservice.encryptData(current._id)
var data ={
  fileid:current._id
}
this.documentService.encryptedvalues(data).subscribe((data:any)=>{
  this.router.navigate(['/home/sentfiles/'+data.encryptdata]);

  var i = path.findIndex(x => x._id == current._id);
  path.splice(i + 1, path.length)
})
}
    return path;
  }


// ===================== update all documents ========================

  updateAlldocuments() {
    var Alldocuments
    Alldocuments = []
    if (this.Sharedata) {
      this.Sharedata.forEach(element => {
        Alldocuments.push(element);
        if (this.Sharedata.length - 1 == this.Sharedata.indexOf(element)) {
          Alldocuments.sort(function (a, b) {
            if (a.updatedAt < b.updatedAt) { return 1; }
            return 0;
          });
        }
      });
      if (!this.querySubject) {
        this.querySubject = new BehaviorSubject(Alldocuments);
      } else {
        this.querySubject.next(Alldocuments);
      }
      return this.querySubject.asObservable();
    }
  }

  //====================================get all subfolders/files======================
  getsubfolders(element) {
    var returnobejct = new Subject
    var subfolders
    this.sentfolders = []
    this.sentfiles = []
    this.documentService.getparentfolders(element._id).subscribe(data => {
      subfolders = data
      subfolders.folders.forEach(element => {
        this.sentfolders.push(element)
      });
      subfolders.files.forEach(element => {
        this.sentfiles.push(element)
      });
      returnobejct.next(subfolders)
    })
    return (returnobejct.asObservable())
  }

  //====================Download Pdf=========================================
  downloadpdf(pdfdata){
    this.documentService.pdfDownload(pdfdata);
  }
  setDownload(data){
    this.element=data
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
      this.isloading = true
      this.documentService.pdfDownload(downloaddata).subscribe((data: any) => {
        if (data.path && downloaddata.downloadType == "computer") {
          this.isloading = false
          this.documentService.openSnackBar("File Downloaded Successfully", "X");
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
            if (downloaddata.email && downloaddata.downloadType == "attachment" && data.path) {
              this.isloading = false

              this.documentService.openSnackBar("File Sent To Email", "X");


            }
            else this.isloading = false
          });

        }
        else {
          this.documentService.openSnackBar("Please Enter Valid Email", "X");
        }
      }
    }

  }
    // ================================= export drive ===========================
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
  //=========================================================================

  // delete with multple select
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
          if(this.folderarr.length >1) this.EnableDelete=true;
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
   
if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){this.triggervalue=false; this.EnableDelete=true}
}
datas
  deleteSlectedElement() {
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var sentItems={
      files:files,
      folders:folders
    }
    setTimeout(() => {
      $('body').css("overflow", "hidden");
       }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFilesandFolders' }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {this.documentService.multipleRemovesent(sentItems).subscribe(data => {
          this.isloading = true;  
          this.GetsentDocuments()
          });
        }
        })
  
    // else if (files.length && !folders.length) {
    //   let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFiles' }, width: '500px', panelClass: "deletemod" });
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.isloading = true
    //     if (res) this.documentService.multiFileDelete(files).subscribe(data => {
    //       this.GetsentDocuments()
    //       if(data)this.documentService.openSnackBar("Files deleted Successfully!", "X");
    //       // this.fileAdded.emit()
    //     });
    //   })
    // }
    // else if (folders.length && !files.length) {
    //   let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFolders' }, width: '500px', panelClass: "deletemod" });
    //   dialogRef.afterClosed().subscribe(res => {
    //     this.isloading = true;
    //     if (res) this.documentService.multiFolderDelete(folders).subscribe(data => {
    //       this.GetsentDocuments()
    //       if(data)this.documentService.openSnackBar("Folders deleted Successfully!", "X");
    //       // this.fileAdded.emit()
    //     });
    //   })
    // }
}

multishareElement()
  {
    this.profileData = JSON.parse(localStorage.getItem('currentUser'))
    this.profileData.type = this.userservice.decryptData(this.profileData.type)
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata = {
      folders: folders,
      files: files,
    }
    if (this.profileData && this.profileData.type == 'individual') {
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
      filedialog.afterClosed().subscribe(res=>{
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
      })
    }
    else{
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
      filedialog.afterClosed().subscribe(res=>{
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
      })
    }
  }



  uploadFileBrowser(name) {

    this.modalopened =false
    
  
  }
  browserupload(id){
this.modalid=id
  }

  uploadFile(name) {
 
  }

  Sharereview(review){
    this.pathvalue=window.location.href;
    this.pathvalue= this.pathvalue.split('http://172.16.1.118:4200')[1]
    history.pushState(null, null, 'modalOpened');
    this.modalopened=true
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
  uid: string;
  isfavorite: boolean;
  favoriteid: string;
  updatedAt: string
}

