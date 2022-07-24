import { Component, ViewChild, OnInit,Input,HostListener,Output ,EventEmitter,NgZone} from '@angular/core';
import { MatDialog } from '@angular/material';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { MovetoComponent } from '../moveto/moveto.component';
import { DocumentService } from '../document.service';
import { FrontEndConfig } from '../frontendConfig';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { UserService } from '../user.service';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { Location,LocationStrategy } from '@angular/common';

declare var $: any;
declare var gapi: any;
@Component({
  selector: 'app-favoritefiles',
  templateUrl: './favoritefiles.component.html',
  styleUrls: ['./favoritefiles.component.css']
})
export class FavoritefilesComponent implements OnInit {

  constructor(private Locations: Location,private _ngZone: NgZone,private router: Router, private userservice: UserService, public dialog: MatDialog, private documentService: DocumentService, private frontendconfig: FrontEndConfig, private activatedroute: ActivatedRoute) { }
  serverurl = this.frontendconfig.getserverurl();
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) contextMenu1: MatMenuTrigger; //context menu

  folderElements = []
  fileData = []
  folderName: string;
  folders: any
  folderid
  filehightlight: any; //hightlighing file/folder
  name: any;
  allfolders: any; // all folders data
  filedata: any
  favorites
  document = true;
  folder = false;
  selectedName: any;
  showactionimg1 = false //showing folder/doc action images
  element: any
  gridicon: boolean = true //grid icon show 
  matmenu: any;
  isloading: boolean = true //for loaders
  currentRoot = null
  currentPath = null
  profileData: any;  // to store profile data
  gridview: boolean = true //to show grid view 
  FileMenu = false; // for context menu
  listicon
  listview
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  emaillabel
  EnableDelete:Boolean=false;
  triggervalue:boolean=true 
  sample2 = false
  email
  currentelement:any
  browserpath:any
  foldervalue
  navigationelement
  checkid:any
  id:any
  pathvalue
  modalopened:boolean=false
  iebrowser
  matttoltip
  @Input() fileElements: FileElement[];  //file data
  @HostListener('window:resize', ['$event'])
  // @Output() fileAdded = new EventEmitter<{ data: string }>(); //file adding
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if(event.ctrlKey && event.keyCode==65) {
      this.filearr = this.fileData;
      this.folderarr = this.folderElements;
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
  @HostListener('window:scroll', ['$event'])
onWindowScroll($event) {
   if(this.contextMenu) this.contextMenu.closeMenu()
   this.matttoltip=true
setTimeout(() => { 
  this.matttoltip=false
}, 1);
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
        if (res) this.documentService.multiFolderDelete(folders).subscribe(data => {
          this.documentService.multiFileDelete(files).subscribe(data => {
            this.ngOnInit()
            if(data)this.documentService.openSnackBar("Items deleted Successfully!", "X");
            
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
        if (res) this.documentService.multiFileDelete(files).subscribe(data => {
          this.ngOnInit()
          if(data)this.documentService.openSnackBar("File(s) deleted Successfully", "X");
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
        if (res) this.documentService.multiFolderDelete(folders).subscribe(data => {
          this.ngOnInit()
          if(data)this.documentService.openSnackBar("Folder(s) deleted successfully", "X");
        });
      })
    }
}

clientid = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file'
].join(' ');
  ngOnInit() {
    if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
   this.iebrowser=true
      $(".ietop1").css("margin-top", "100px");
    }
    else this.iebrowser=false
    this.id=this.router.url.substring(this.router.url.lastIndexOf('/')  + 1)
    console.log(this.id)
    if(this.id!='favorites'){
     

      var path = JSON.parse(localStorage.getItem('currentpath'));
     
      console.log(path)
      for(var j =0;j<path.length;j++){
        if(path[j]){
         for(var i in path[j]){
           if(path[j][i] && i!='encryptedId')path[j][i] = this.userservice.decryptData(path[j][i]);
             }
        }
     
      }
      var filedata ={
        fileid:this.id
      }
      this.documentService.decryptedvalues(filedata).subscribe((decrypt:any)=>{
      this.documentService.getfolder().subscribe(data => {
     
        
          this.checkid = data;
          this.checkid.forEach(element => {
           // var routingid = this.userservice.decryptData(this.id)
           if(element._id == decrypt.decryptdata){
             this.navigationelement=element
               this.currentRoot=this.navigationelement
               
               this.currentelement=this.navigationelement
               this.userservice.setcurrentelement(this.currentelement)
   
               this.navigate(this.navigationelement)   
               // this.navigateUp(this.navigationelement)
   
              // this.popFromPath(this.currentPath,this.currentRoot)
           }
          });
          if(!this.currentelement){
            console.log('URL not found (404)')
            this.router.navigate(['home/favorites'])
          }
        })
        this.isloading = false;
      
      },error => {
        console.log(error)
        this.router.navigate(['home/favorites'])
      })   
    
  
    }
    else {
      this.getfavorites();
      this.getAllFolders()
    }
  
  }
  modalid
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if(this.currentelement && this.currentelement.parentid){
      this.documentService.getnavigationfolder(this.currentelement.parentid).subscribe(data=>{
        this.browserpath=data
        this.currentelement=data
        this.navigateUp(this.browserpath)
      })
    }
    else if(this.currentelement) {
       this.browserpath='root'
       this.navigateUp(this.browserpath)
       setTimeout(() => {
        this.router.navigate(['home/favorites']); 
      }, 1000);
    }
  
  
  }


  //==============================Get All Favorites items=======================
  getfavorites() {
    this.isloading = true;
    this.folderElements = []
    this.fileData = []
    this.documentService.getfavorites().subscribe(data => {
      this.favorites = data
      this.favorites.forEach(element => {
        if (element.isFolder && element.folderid) {
          element.folderid.favoriteid = element._id;
          this.folderElements.push(element.folderid)
        }
        else {
          if (element.fileid) {
            element.fileid.favoriteid = element._id;
            this.fileData.push(element.fileid)
          }
        }

      })

    })
    this.isloading = false;
  }

  //================================================sorting Name Ascending order===============================================
  sortDataAsc() {
    this.folderElements.sort(function (a, b) {
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
  //===================================================sorting Name descending order=================================================
  sortDataDsc() {
    this.folderElements.sort(function (a, b) {
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

  //======================================sorting Modify Date Ascending order===========================================

  sortByModifiedAsc() {
    this.folderElements.sort(function (a, b) {
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
  //======================================sorting Modify Date Descending order===========================================
  sortByModifiedDsc() {
    this.folderElements.sort(function (a, b) {
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
  //===========================hightlight selected doc/folder============================================================
  highlightRow(element) {
    this.sample2 = true
    this.filehightlight = element._id;
    this.showactionimg1 = true
    this.element = element;
  }
  //=====================context menu======================================================================================

  contextMenuPosition = { x: '0px', y: '0px' };
  openMenufolder(event: MouseEvent, element) {
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

  openMenufolder1(event: TouchEvent, element) {
  
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
  //==============================To open share pop dialog box based on user type==============================================
  shareElement(element) {
    var title = 'share'
    this.profileData = JSON.parse(localStorage.getItem('currentUser'))
    this.profileData.type = this.userservice.decryptData(this.profileData.type)
    if (this.profileData.type == 'individual') {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '848px',
        height:'630px',
        disableClose: true,
        autoFocus: false,
        panelClass: "test",
        data: { content: element, text: 'owner',multi:false }

      });
      filedialog.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
       
      })
    }
    else {
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
      filedialog.afterClosed().subscribe(res =>{
        console.log(res)
        if(res=='true')
        {
          setTimeout(() => {
            $('body').css("overflow", "hidden");
             }, 10);
        }
        else{
          setTimeout(() => {
            $('body').css("overflow", "auto");
             }, 10);
        }
       
      });
    }
    if (element) {
      if ((title == 'share' || title == 'Review' || title == 'Signature')&&document.getElementById('modelclose')) document.getElementById('modelclose').click()
      if (title == 'Signature') this.getFileContent(element)
      // else this.elementShared.emit({ element: element, title: title });
    }
  }
  //================================================END========================================================================
  Removefavorite(element: FileElement) {
    var data1 = { _id: element.favoriteid }
    this.documentService.removefavorite(data1).subscribe(data => {
      this.getfavorites()
      this.documentService.openSnackBar("Removed from Favorites" ,"X")
    });
  }

  //========================To open File From Favorites=========================================================================
  getFileContent = function (content) {
    var data={
      fileid:content._id
    }
    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
      console.log(data)
      this.router.navigate(['filecont/'+data.encryptdata]);
    })
    // this.router.navigate(['/filecont/:id'], { queryParams: { id: content.encryptedid, _id: content._id } });
  }

  //==================getting all folders for move to action=====================================================================
  getAllFolders() {
    this.isloading = true
    this.documentService.getallfolders().subscribe(data => {
      this.allfolders = data
      this.allfolders.forEach(element => {
      });
      this.isloading = false
    })
  }
  //==========================move To Function==================================================================================================
  move = async function (element) {
    this.getAllFolders()
    this.showactionimg = false
    if (this.allfolders.length == 0) console.log("")
    setTimeout(() => {
      $('body').css("overflow", "hidden");
       }, 10);
    let dialogRef = this.dialog.open(MovetoComponent,
      {
        width: '500px',
        panelClass: "withoutpadding",
        data: { move: element, Allfolder: this.allfolders,multi:false },
        disableClose:true
      });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
         }, 10);
      if (res != 'CloseButton') {
        this.moveElement({ element: element, moveTo: res });
        // if (!res)
        //   this.documentService.openActionSnackBar(' Moved Succesfully', 'x')
      }


    });
  }
  moveElement(event: { element: FileElement; moveTo: FileElement }) {
    if (event.element.isFolder) event.element.parentid = event.moveTo._id;
    else event.element.folderid = event.moveTo._id
    this.documentService.updatefolder(event.element).subscribe(data => {
      var data1 = { _id: event.element.favoriteid }
      this.documentService.removefavorite(data1).subscribe(data => {
        this.getfavorites()
      });
    });
  }

  //==================================Rename Function================================================================================================

  openRenameDialog(element: FileElement) {
    var Rename = element.name.split('.')
    setTimeout(() => {
      $('body').css("overflow", "hidden");
       }, 10);
    let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'Rename', folder: element }, width: '500px', panelClass: "rename",disableClose:true });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
         }, 10);
      if (res) {
        var changed = res.split('.')
        if (changed[1] && changed[1] != 'pdf') { this.documentService.openActionSnackBar('. ' + changed[1] + ' Extensions is not Allowed', 'x') }
        else {
          if (element.isFile) element.name = changed[0] + '.' + Rename[1]
          if (element.isFolder) element.name = changed[0]
          this.documentService.updatefolder(element).subscribe(data => {
          
            this.documentService.openSnackBar("Name Updated Successfully" ,"X")
          });
        }
      }
 
    });
  }

  browserupload(id){
    this.modalid=id
      }
  uploadFileBrowser(name) {
    
    // alert("filebrowser")
    this.modalopened =false
    
    // history.pushState(null, null, '/home/myfiles');
  
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


  uploadFile(name) {
    
    // document.getElementById('modelclose').click()
   

  }


  //==========================================delate Function=========================================================================================
  deleteElement(element) {
    if (element.isFolder) {
      setTimeout(() => {
        $('body').css("overflow", "hidden");
         }, 10);
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { name: 'deletefolder' }, width: '500px', panelClass: "deletemod" ,disableClose:true});
      dialogRef.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");
           }, 10);
        if (res) {
          element.active = false
          this.documentService.deletefolder(element).subscribe(data => {
            this.getfavorites()
      
            this.documentService.openSnackBar("Folder(s) deleted successfully" ,"X")
          })
        }
        
      })
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
          element.active = false;
          this.Removefavorite(element)
          this.documentService.deletefolder(element).subscribe(data => {
            this.documentService.openSnackBar("File(s) deleted successfully" ,"X")
          })
        }
        
      });
    }
  }
  
  // deleteElement(element: FileElement) {
  //   console.log(element)
  //   console.log(this.fileData.findIndex(x => x._id == element._id));
  //   if (element.isFolder) {
  //     let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'deletefolder' }, width: '500px', panelClass: "deletemod" });
  //     dialogRef.afterClosed().subscribe(res => {
  //       if (res) {
  //         console.log();
  //         var index = this.fileElements.findIndex(x => x._id == element._id)
  //         console.log(index)
  //         if (index >= 0) {
  //           this.fileElements.splice(index, 1)
  //           console.log(this.fileElements)
  //         }
  //         if (res == true) {
  //           this.sample2 = false
  //         }
  //         if (element.favoriteid) {
  //           this.Removefavorite(element)

  //         }
  //        // this.elementRemoved.emit(element);
  //         this.sample2 = false
  //       }

  //     });
  //   }
  //   else {
  //     let dialogRef = this.dialog.open(CommonDialogComponent, { data: { name: 'delete' }, width: '500px', panelClass: "deletemod" });
  //     dialogRef.afterClosed().subscribe(res => {
  //       if (res) {
  //         var index = this.fileData.findIndex(x => x._id == element._id)
  //         if (index >= 0) {
  //           this.fileData.splice(index, 1)
  //           console.log(this.fileData)
  //         }
  //         if (element.favoriteid) {
  //           this.Removefavorite(element)

  //         }
  //       //  this.elementRemoved.emit(element);
  //         this.sample2 = false
  //       }

  //     });
  //   }
  // }
  //=========================To Download Folder========================================================================================================
  downloadfile(data) {
    this.documentService.pdfDownload(data)
  }
  // =========================================== //navigation to folder===============================================================================
  navigate(element) {
    this.filearr = [];
    this.folderarr=[]
    this.currentRoot = element;
    this.currentelement=element
    this.userservice.setcurrentelement(this.currentelement)
    if (element.isFolder) {
      var data={
        fileid:element._id
      }
      this.documentService.encryptedvalues(data).subscribe((data:any)=>{
        this.router.navigate(['/home/favorites/'+data.encryptdata]);
  
        // this.router.navigate(['/home/favorites/:' + this.foldervalue.name + ':' + this.foldervalue._id]);
        this.getsubfolders(this.currentRoot)
        this.currentPath = this.pushToPath(this.currentPath, element);
        localStorage.removeItem('currentpath') 
        this.userservice.setpath(this.currentPath);
      })
     

    }
   
  }

  navigateUp(event) { //navigate pop
    if (event != 'root') {
      this.currentRoot = event
      this.getsubfolders(this.currentRoot)
    }
    else {
      this.currentRoot = null
      this.getfavorites()
    }
    this.currentPath = this.popFromPath(this.currentPath, this.currentRoot);
  }
  pushToPath(path: any, folderName) { //Adding path
    console.log(path)
    var p1 = [];
    if (path) {
      path.forEach(element => {
        if (element) p1.push(element);
      });
    }
    p1.push(folderName);
    return p1;
  }

  popFromPath(path, current) { //remove from path
    if (current == null) {
      path = [];
      this.router.navigate(['/home/favorites']);

    }
    else {

      // this.router.navigate(['/home/favorites/:' + current.name + ':' + current._id]);
      //var value= this.userservice.encryptData(current._id)
      var data={
        fileid:current._id
      }
      this.documentService.encryptedvalues(data).subscribe((data:any)=>{
         if(data) this.router.navigate(['/home/favorites/'+data.encryptdata]);

      })
      var i = path.findIndex(x => x._id == current._id);
      path.splice(i + 1, path.length)
    }
    return path;
  }
  //--======================================Getting sub folders=======================================================================
  getsubfolders(element) {
    var subfolders
    this.folderElements = []
    this.fileData = []
    this.documentService.getparentfolders(element._id).subscribe(data => {
      subfolders = data
      subfolders.folders.forEach(element => {
        this.folderElements.push(element)
      });
      subfolders.files.forEach(element => {
        this.fileData.push(element)
      });
    })
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

  // PdfGEt Pdf Download URL
 
  
  
  
  // ************************************************************************************************************************
//=====================================*multiple delete files*===============================================================

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
    console.log("fdfty")
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
dialogopen = false

//=========================================*multiple move*==============================================
// multiSelectMove() {
//   this.dialogopen = false
//   this.sample2 = false
//   var folders = JSON.parse(JSON.stringify(this.folderarr))
//   var files = JSON.parse(JSON.stringify(this.filearr))
 
//     let dialogRef = this.dialog.open(MovetoComponent,
//       {
//         width: '500px',
//         panelClass: "withoutpadding",
//         data: { folders: this.folderarr, documents: this.filearr, Allfolder: this.allfolders, multi: true },
//         disableClose:true
//       });
//   dialogRef.afterClosed().subscribe(res => {
//     var selecteddata = {
//       folders: folders,
//       files: files,
//       moveto: res
//     }
//     console.log(selecteddata)
//     if (res != 'CloseButton') {
//       this.documentService.multiselectmove(selecteddata).subscribe(data => {
//         if (data) this.fileAdded.emit()
//       })
//       this.documentService.openSnackBar("Moved Successfully!", "X");
//     }

//   });
// }
// }
getMultiCopy(){
  if(!this.folderarr.some(element => element.isFolder) && this.filearr.some(element => element.isFile)) return false
  else return true
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
      });
    }
    else {
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
  multiFavorite(favorite)
  {var folders = JSON.parse(JSON.stringify(this.folderarr))
    var files = JSON.parse(JSON.stringify(this.filearr))
    var selecteddata = {
      folders: folders,
      files: files,
      make_favorite: favorite
    }
    this.documentService.multiFavorite(selecteddata).subscribe(data => {
      if (data) {
        this.getfavorites()
        this.documentService.openSnackBar("Removed from favourites!", "X");
}
    })

   
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