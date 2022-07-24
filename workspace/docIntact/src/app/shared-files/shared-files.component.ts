import { Component, OnInit, Output,EventEmitter,ViewChild,HostListener, ɵConsole,NgZone} from '@angular/core';
import { FrontEndConfig } from '../frontendConfig';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import * as moment from 'moment';
import { DataService } from '../core/data.service';
import { DocumentService } from '../document.service';
import { MovetoComponent } from '../moveto/moveto.component';
import { AdminService } from '../admin.service';
import { OrganizationService } from '../organization.service';
import { SignupdialogboxComponent } from '../signupdialogbox/signupdialogbox.component';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { UserService } from '../user.service';
import { element } from '@angular/core/src/render3';
import { Location,LocationStrategy } from '@angular/common';

declare var $: any;
declare var gapi: any;
@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})

export class SharedFilesComponent implements OnInit {

  serverurl = this.frontendconfig.getserverurl();
  sharedfiles: any   ///consists of list of shared documents
  currentRoot: any;  //current root (folder name)
  currentPath: any;  // current path
  doc: any; //consist of values of selected folder
  folderElements = []; //folder list
  fileElements = []; //files list
  isloading: boolean = true; //loading 
  gridView: boolean = true; // to display grid view
  listView: boolean = false // to display table view
  selectedName: any; // stores the selected file or folder id
  documentSelect: boolean = false; // to check whether any document is selected
  matmenu: any;  // to verify the selected has access or not (download)
  contextMenuPosition = { x: '0px', y: '0px' };
  FileMenu:Boolean=false
  groupdata = []
  groups = [];
  hleveldata = [];
  viewDetailsvalue = false;
  documentLogs
  sharedfilesdata: any;
  profiledata: any
  userName
  userEmail
  docCount = 0;
  sharedPeople = []
  documentres
  agreetoSign
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  element
  parent
  dialogopen = false
  sample2 = false
  triggervalue:boolean=true 
  view: boolean = false;
  EnableDelete:boolean=false;
  email
  message:any;
  currentelement:any
   browserpath:any
   checkid
   navigationelement
   modalopened:boolean=false
   modalid
   pathvalue
   sharedid // for encrypt shared id
   fileid //for encrypt  fileid 
   iebrowser
   matttoltip
   foldersharedid
   decryptid
   useremail
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger; //opens matmenu for access viewing
  @ViewChild(MatMenuTrigger) contextMenu1: MatMenuTrigger; //context menu
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode==65) {
      this.filearr = this.fileElements;
      this.folderarr = this.folderElements;
      event.preventDefault();
    }
    if(event.keyCode==46){
      if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)){
        this.deleteSlectedElement();
      }
      else if((this.filearr.length || this.folderarr.length)){
        this.deleteDocument(this.filearr[0] || this.folderarr[0])
      }

    }
  }
  @HostListener('document:click', ['$event']) onClickHandler(event: MouseEvent) {
    var value:any = event.srcElement;
    if(value.id!="foldersList" && value.id!="filesList" && (!(this.contextMenu && this.contextMenu.menuOpened.closed)|| !(this.contextMenu1 &&this.contextMenu1.menuOpened.closed))){
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
  today = moment().format("YYYY-MM-DDTHH:mm:ss");
  constructor(private Locations: Location,private _ngZone: NgZone,private dataservice: DataService, public adminService: AdminService,
    public activatedroute: ActivatedRoute, public organizationService: OrganizationService, public userService: UserService, private documentService: DocumentService,
    private frontendconfig: FrontEndConfig, public dialog: MatDialog, private router: Router) {
    this.dataservice.newMessageReceived().subscribe(data => {
      this.getSharedDocuments();
    });
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
    if(id!='shareddocument'){
      this.isloading = false;

      var path = JSON.parse(localStorage.getItem('currentpath'));
      for(var j =0;j<path.length;j++){
        if(path[j]){
         for(var i in path[j]){
           if(path[j][i] && i!='encryptedId')path[j][i] = this.userService.decryptData(path[j][i]);
             }
        }
     
      }
      var data={
        fileid:id
      }
      this.documentService.decryptedvalues(data).subscribe((encryp:any)=>{
      var routingid = encryp.decryptdata
      this.documentService.getnavigationfolder(routingid).subscribe(data => {
        this.checkid = data;
      //  this.checkid.forEach(element => {
        // if(element._id == id){
          this.navigationelement=this.checkid
            this.currentRoot=this.navigationelement
            this.currentPath=path
            this.currentelement=this.navigationelement
            this.navigateToFolder(this.navigationelement)   
            this.popFromPath(this.currentPath,this.currentRoot)
        // }
      //  });
      
       })
      },error => {
        console.log(error)
        this.router.navigate(['home/shareddocument'])
      })
     }
     else{

      if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
        $(".ietop").css("margin-top", "100px");
      }
    
      this.getSharedDocuments();
      this.profiledata = JSON.parse(localStorage.getItem('currentUser'));
      this.userName = this.userService.decryptData(this.profiledata.name);
      this.userEmail = this.userService.decryptData(this.profiledata.email);
     }
    
  }
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
          if(this.currentelement && this.currentelement.parentid){
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
              this.router.navigate(['home/shareddocument']); 
            }, 1000);
          }

  }

  // get shared document for particular user //////////////////////
  getSharedDocuments() {
    this.fileElements = [];
    this.folderElements = [];
    this.isloading = true
    this.documentService.getSearch('sharingpeoples/shared/sharedDocuments').subscribe(data => {
      this.sharedfiles = data
      this.isloading = false
      ////////////////////////////////////////ORGANISATION////////////////////////////////////////////////////////

      // getting files groupid
      this.sharedfiles.forEach(element => {
        if (element.groupid) { this.groupdata.push(element) }
      });
      if (this.groupdata.length > 0) {
        this.groupdata.forEach(async element => {
          await this.organizationgroup(element)
          if (this.groupdata.indexOf(element) == this.groupdata.length - 1) {
            this.userlevecheck(this.groups)
          }
        });
      }

      ////////////////////////////////////////INDIVIDUAL////////////////////////////////////////////////////////
      if (this.sharedfiles.length > 0) {
        this.sharedfiles.forEach(shareFile => {
          this.singleSharedFile(shareFile);
          if (this.sharedfiles.indexOf(shareFile) == this.sharedfiles.length - 1) {
            this.isloading = false;
          }
        });
      }
    });
  }

  // checking each shared document Expired or not //////////////////////
  singleSharedFile(element) {
    // to check with expirydate if present
    if (element.access_expirydate) {
      var access_expirydate = element.access_expirydate;
      if (moment(access_expirydate).format("YYYY-MM-DDTHH:mm:ss") <= (moment(this.today).format("YYYY-MM-DDTHH:mm:ss"))) {
        var x = moment(access_expirydate).format("YYYY-MM-DDTHH:mm:ss") <= (moment(this.today).format("YYYY-MM-DDTHH:mm:ss"));
      }
      if (!x) this.pushFilesFolderToArray(element);
    }
    // expirydate is not present
    if (!element.access_expirydate) this.pushFilesFolderToArray(element);
  }

  // pushing each files and folders in an array //////////////////////
  pushFilesFolderToArray(element) {
    if (element.folderid) {
      element.folderid.sharedid = element._id;
      element.folderid.filepassword = element.filepassword;
      element.folderid.Download = element.Download;
      element.folderid.share = element.share;
      element.folderid.delete = true;
      element.folderid.agreetoSign = element.agreetoSign;
      element.folderid.view = element.view;
      element.folderid.members = element.members;
      this.folderElements.push(element.folderid)
    }
    else if (element.fileid) {
      element.fileid.sharedid = element._id;
      element.fileid.Download = element.Download;
      element.fileid.share = element.share;
      element.fileid.delete = true;
      element.fileid.agreetoSign = element.agreetoSign;
      element.fileid.view = element.view;
      element.fileid.message = element.message;
      element.fileid.fromid = element.fromid;
      element.fileid.members = element.members;
      this.fileElements.push(element.fileid);
    }
  }

  // sorting "NAME" in ascending order//////////////////////
  sortDataAsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase();
      var nameB = b.name.toLowerCase();
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  // sorting "NAME" in descending order //////////////////////
  sortDataDsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.name.toLowerCase()
      var nameB = b.name.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }

  // sort ascending "MODIFIED BY" //////////////////////
  sortByModifiedAsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }

  // Sort Descending "MODIFIED BY" //////////////////////
  sortByModifiedDsc() {
    this.fileElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
    this.folderElements.sort(function (a, b) {
      var nameA = a.updatedAt;
      var nameB = b.updatedAt;
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })
  }

  // open the matmenu (delete,details) when right clicking on selected document //////////////////////
  openMenufolder(event: MouseEvent, element: any) {
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
    this.matmenu = element;
    this.FileMenu = true;  // used for checking whether element has access or not.
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if(((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)))this.contextMenu1.openMenu();
   
    else this.contextMenu.openMenu();
  }
  openMenufolder1(event: TouchEvent, element: any) {
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
    this.matmenu = element;
    this.FileMenu = true;  // used for checking whether element has access or not.
    event.preventDefault();
    this.contextMenuPosition.x = event.changedTouches[0].clientX + 'px';
    this.contextMenuPosition.y = event.changedTouches[0].clientY + 'px';
    if(((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1)))this.contextMenu1.openMenu();
   
    else this.contextMenu.openMenu();
  }
  filearr = new Array();
  folderarr = new Array();
  isctrlkey: boolean;

  
  // navigating inside the respective folder //////////////////////
  navigateToFolder(element) {
    console.log(element)
   if(element &&element.sharedid &&element.isFolder){
    var data={
      fileid:element.sharedid
    }
    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
      console.log(data)
this.foldersharedid=data.encryptdata
localStorage.setItem('folder',this.foldersharedid)
    })
   }
    this.currentelement=element
    // if folder consists of password
    if (element.pin && element.filepassword) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      const ConfirmationDiaBox = this.dialog.open(SignupdialogboxComponent, {
        width: '500px',
        disableClose: true,
        autoFocus: true,
        panelClass: 'passwordbottom',
        data: { title: "Please enter this document's password to view it", otpflag: true, id: element.sharedid }
      });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (result) {
          this.documentSelect = false;
          this.doc = null;
          this.currentRoot = element;
          this.currentPath = this.pushToPath(this.currentPath, element);
          localStorage.removeItem('currentpath') 
          console.log(this.currentPath)
          this.userService.setpath(this.currentPath);
    
          this.folderelements(element)
          this.filearr=[];
          this.folderarr=[]
        }
      });
    }
    else {    //folder doesn't consist of password.  
      this.documentSelect = false;
      this.doc = null;
      this.currentRoot = element
      this.currentPath = this.pushToPath(this.currentPath, element);
      localStorage.removeItem('currentpath') 
      this.userService.setpath(this.currentPath);
      this.folderelements(element)
      this.filearr=[];
      this.folderarr=[]
    }
  }

  // getting the contents of inside folder //////////////////////
  folderelements(element) {
    this.folderElements = [], this.fileElements = [];
    this.isloading = true;
    if (element == 'root') this.getSharedDocuments();
    else {
      var folderdata;
      this.documentService.getparentfolders(element._id).subscribe(data => {
        folderdata = data
        this.isloading = false;
        folderdata.folders.forEach(folder => {
          folder.sharedid = element.sharedid;
          folder.share = element.share;
          folder.Download = element.Download;
          folder.delete = false;
          folder.agreetoSign = element.agreetoSign;
          folder.view = element.view;
          folder.members = element.members;
          this.folderElements.push(folder);
        })
        folderdata.files.forEach(file => {
          file.sharedid = element.sharedid;
          file.share = element.share;
          file.Download = element.Download;
          file.delete = false;
          file.agreetoSign = element.agreetoSign;
          file.view = element.view;
          file.message = element.message;
          file.fromid = element.fromid;
          file.members = element.members;
          this.fileElements.push(file);
        })
      })
    }
  }

  // navigates to specific path on clicking on path //////////////////////
  navigateUp(event) {
    if (event != 'root') this.currentRoot = event
    else this.currentRoot = null
    this.folderelements(event)
    this.currentPath = this.popFromPath(this.currentPath, this.currentRoot);
  }

  // pushs the path //////////////////////
  pushToPath(path: any, folderName) {
    var p1 = [];
    if (path) {
      path.forEach(element => {
        if (element) p1.push(element);
      });
    }
    p1.push(folderName);
    var data ={
      fileid:folderName._id
    }
    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
      this.router.navigate(['/home/shareddocument/'+data.encryptdata]);
    },error => {
      console.log(error)
      this.router.navigate(['home/shareddocument'])
    })
    return p1;
  }

  // pop the path //////////////////////
  popFromPath(path: any, current: any) {
    if (current == null) {
      path = [];
      this.router.navigate(['/home/shareddocument']);
    }
    else {
      var data ={
        fileid:current._id
      }
      this.documentService.encryptedvalues(data).subscribe((data:any)=>{
        this.router.navigate(['/home/shareddocument/'+data.encryptdata]);
      },error => {
        console.log(error)
        this.router.navigate(['home/shareddocument'])
      })

      var i = path.findIndex(x => x._id == current._id);
      path.splice(i + 1, path.length)
    }
    return path;
  }

  // Deletes the particular document //////////////////////
  deleteDocument = function (element: any) {
    if (element.isFolder) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deletefolder' }, width: '500px', panelClass: "deletemod",disableClose:true });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
       if( (res)){
          this.delete(element)
        } 
      });
     
    }
    else {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'delete' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
       if (res){
         
          this.delete(element)
        }
      });
    }
  }

  // delete function call if accepted //////////////////////
  delete(element) {
    var data;
    this.doc = null;
    this.documentSelect = false;
    this.sample2=false;
    element.active = false
    this.documentService.deleteshared(element.sharedid).subscribe(res => {
      data = res
      if (data.data == "success") {
        this.documentService.openSnackBar("Deleted Successfully" ,"X")

        this.folderElements = []
        this.fileElements = []
      }
    });
  }
  viewDetails(element) {
    $(".fade12").show();
    setTimeout(() => {
      // $("body").css("overflow","hidden");
      $("html").css("overflow","hidden");
    }, 10);


    this.viewDetailsvalue = true
    this.documentService.getsharingpeople(element).subscribe((data: any) => {
      this.sharedfilesdata = data
      this.message = this.sharedfilesdata.some(x=>x.toemail == this.userEmail)?this.sharedfilesdata.find(x=>x.toemail == this.userEmail).message:null;
      if (element.status && element.status == "Completed") this.docCount = data.length
      else if (element.status && element.status == "Partially completed") this.docCount = Math.round(data.length / 2)
      else if (element.status && element.status == "Waiting for Sign") this.docCount = 0
    });
  }

  fadeclose() {
    $(".fade12").hide();
    setTimeout(() => {
      $("html").css("overflow","auto");
    }, 10);
    
  }

 
  // navigating to single page //////////////////////
  getFileContent =  function (content) {
    var sharedfolderid=localStorage.getItem('folder')
if(sharedfolderid){
  var filedata={
    fileid:sharedfolderid
  }
  this.documentres = content

  this.documentService.decryptedvalues(filedata).subscribe((data:any)=>{ this.decryptid=data.decryptdata})
       var profile = JSON.parse(localStorage.getItem('currentUser'));
      this.useremail = this.userService.decryptData(profile.email);
    this.documentService.getDocumentLogs(content).subscribe(data => {
    this.documentLogs=data
    this.documentLogs = this.documentLogs.filter(x => (x.message == 'Viewed' && x.email == this.useremail))
    if (this.documentLogs.length==0) document.getElementById('basicExampleModal').click()

if(this.documentLogs.length!=0){
  var fileid={
    fileid:content._id
  }
  this.documentService.encryptedvalues(fileid).subscribe((sharedata:any)=>{
    this.router.navigate(['/sharereview/'+sharedfolderid+'/'+sharedata.encryptdata]);
  })
}
  })


}else{
if(sharedfolderid) localStorage.removeItem('folder')
  this.documentres = content
  if(content)
  {
     var data ={
       sharedid:content.sharedid,
       fileid:content._id
     }
    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
 if ((this.documentres.agreetoSign ) && data.fileid && data.sharedid) this.router.navigate(['/sharereview/'+data.sharedid+'/'+data.fileid]);
 else if ((this.documentres.agreetoSign ) && data.fileid && !data.sharedid) this.router.navigate(['/sharereview/'+data.fileid]);
 else if (data) document.getElementById('basicExampleModal').click()
})

}
}

  }

  // agrees to signin update the document to true ///////////////////////////////
  agreeToSign(shareDoc, agreetoSign) {
    var sharedfolderid=localStorage.getItem('folder')

    // shareDoc.updateforAgree = true;
     if(shareDoc && shareDoc.sharedid)var data = { _id: shareDoc.sharedid, agreetoSign: agreetoSign };
    if(sharedfolderid){
    var data = { _id: this.decryptid, agreetoSign: agreetoSign };

    }
    if (agreetoSign) {
      if(!sharedfolderid){
        this.documentService.put('sharingpeoples/sharedoc/update/' + data._id, data).subscribe(data => {
          if (agreetoSign) {
             var filedata={
               fileid:shareDoc.sharedid
             }
            this.documentService.encryptedvalues(filedata).subscribe((sharedata:any)=>{
              document.getElementById('basicExampleModalclose').click()
              this.router.navigate(['/sharereview/'+sharedata.encryptdata]);
              })
            
          }
        });
      }else{
        if(sharedfolderid){
          var sharedata={
            fileid:shareDoc._id
          }
      this.documentService.encryptedvalues(sharedata).subscribe((sharedata:any)=>{
        document.getElementById('basicExampleModalclose').click()
          this.router.navigate(['/sharereview/'+sharedfolderid+'/'+sharedata.encryptdata]);
        
      })

        }
      }

    }
    else this.documentService.openSnackBar("Agree to our Terms and Conditions and Privacy Policy", "X")
  }

  // to download the document //////////////////////
  downloadfile(data) {
    this.documentService.pdfDownload(data)
  }

  organizationgroup(element) {
    return new Promise(async (resolve, reject) => {
      this.organizationService.getshareDocbasedemp(element.groupid).subscribe((data: any) => {
        if (data.length) data.forEach(item => this.groups.push(item));
        resolve(this.groups)
      });
    })
  }

  userlevecheck(groups) {
    this.groupdata.forEach(elements => {
      this.groups.forEach(emps => {
        if (elements.groupid == emps.groupid) {
          if (emps.departmentlevels && ((elements.departmentlevels && (elements.departmentlevels.hlevel > emps.departmentlevels.hlevel)) || emps.departmentlevels.hlevel == 1)) {
            if (!emps.orgfileviewstatus) {
              if (elements.toid._id == emps.toid._id) {
                this.hleveldata.push(emps);
              }
            }
          }
        }
      })
    })
    if (this.hleveldata.length > 0) {
      this.hleveldata.forEach(elemnt => {
        if (elemnt.access_expirydate) {
          var access_expirydate = elemnt.access_expirydate
          if (moment(access_expirydate).format("YYYY-MM-DDTHH:mm:ss") <= (moment(this.today).format("YYYY-MM-DDTHH:mm:ss"))) {
            var x = moment(access_expirydate).format("YYYY-MM-DDTHH:mm:ss") <= (moment(this.today).format("YYYY-MM-DDTHH:mm:ss"))
          }
          if (!x) this.pushFilesFolderToArray(elemnt);
        }

        if (!elemnt.access_expirydate) this.pushFilesFolderToArray(elemnt)
      });
    }
  }
  setDownload(data) {
    this.element = data
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
  sideviewshow = false
  test1() {

    // console.log("working");
    // setTimeout(()=>{
    //   this.sideviewshow=true;
    //   $(".fade12").css("display","block");
    //  },1000)

  }

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
if((this.filearr.length>1 || this.folderarr.length>1)||(this.filearr.length==1 && this.folderarr.length==1))this.triggervalue=false
}

  deleteSlectedElement() {
    var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata={
      folders:folders,
      files:files
    }
    if (files.length && folders.length){
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deleteMultiFilesandFolders' }, width: '500px', panelClass: "deletemod" });
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) this.documentService.multiShareFolderDelete(selecteddata).subscribe(data => {
          if(data)this.getSharedDocuments();
            this.documentService.openSnackBar("Items deleted Successfully!", "X");
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
        if (res) this.documentService.multiShareFolderDelete(selecteddata).subscribe(data => {
            if(data)this.getSharedDocuments();
            this.documentService.openSnackBar("File(s) deleted successfully!", "X");
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
         if (res) this.documentService.multiShareFolderDelete(selecteddata).subscribe(data => {
            if(data)this.getSharedDocuments();
          
            this.documentService.openSnackBar("Folder(s) deleted successfully!", "X");
          });
        })
      }
    
  
}

highlightRow(element) {

  this.view = false
  this.selectedName = element._id;
  this.sample2 = true
  this.element = element;
}
uploadFileBrowser(name) {
    
  this.modalopened =false
}
browserupload(id){
this.modalid=id
}

uploadFile(name) {


  this.modalopened =false



}

Sharereview(review){
     this.pathvalue=window.location.href;
  this.pathvalue= this.pathvalue.split('http://172.16.1.118:4200')[1]
  history.pushState(null, null, 'modalOpened');
  this.modalopened=true
}
termsandpol()
{
  window.open(this.frontendconfig.frontendurl + '/termsandcondition', '_blank');
  
}
privacypolicy(){
  window.open(this.frontendconfig.frontendurl + '/privacypolicy', '_blank');

}
}