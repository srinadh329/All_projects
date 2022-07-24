import { Component, OnInit, ɵConsole } from '@angular/core';
import { DocumentService } from '../document.service';
import { Subject } from 'rxjs/Subject';
// import * as CryptoJS from 'crypto-js';
// import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FrontEndConfig } from '../frontendConfig';
import { UserService } from '../user.service'
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import { FileElement } from 'src/app/myfiles/myfiles.component'
import { FileData } from 'src/app/myfiles/myfiles.component'
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from '../core/data.service';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
declare var $: any; //jquery variable+
import { Location, LocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-filedocument',
  templateUrl: './filedocument.component.html',
  styleUrls: ['./filedocument.component.css']
})

export class FiledocumentComponent implements OnInit {

  filesToUpload: Array<File> = [];
  profileData: any
  filedata: any
  public fileElements: Observable<FileElement[]>;
  public myElements = [];
  public Myfiles = [];
  modalPath = [];
  folderdataid: any;
  public files: Observable<FileData[]>;
  private querySubject: BehaviorSubject<FileElement[]>;
  private FileSubject: BehaviorSubject<FileData[]>;
  LoadingTrue: Subject<boolean> = new Subject();
  folders: any;
  particularfolderdata: any;
  currentRoot: FileElement;
  currentid: any
  currentPath: any;
  canNavigateUp = false;
  favoritedata: any
  favfolders = []
  childparent: any = [];
  favfiles = []
  userType: any
  navigationelement
  latitude: any;
  longitude: any;
  checkid: any
  IpAddress
  constructor(private Locations: Location, private locationStrategy: LocationStrategy, public routes: ActivatedRoute, public userService: UserService, public dataservice: DataService, private router: Router, private documentService: DocumentService, private frontendconfig: FrontEndConfig, private userservice: UserService, public dialog: MatDialog, private http: HttpClient) {
    this.dataservice.newfavorite()
      .subscribe(data => {
        // this.openChat = true;
        // this.getFavorateFileAndFolders()
      })
    // this.router.events.subscribe(event => {
    //   if (!(event instanceof NavigationEnd)) { return; }
    //   this.ngOnInit();
    // });


  }
  serverurl = this.frontendconfig.getserverurl();
  ngOnInit() {

    // this.navigationelement = localStorage.getItem('currentelement')
     var routerid=this.router.url.substring(this.router.url.lastIndexOf('/')  + 1)
     if(routerid!='myfiles')
     {
      var id = routerid;
     }
     else  id=undefined

    var patharray = []
    if (id != undefined) {
      var path = JSON.parse(localStorage.getItem('currentpath'));
      for (var j = 0; j < path.length; j++) {
        if (path[j]) {
          for (var i in path[j]) {
            if (path[j][i] && i != 'encryptedId') path[j][i] = this.userService.decryptData(path[j][i]);
          }
        }

      }
      this.documentService.getfolder().subscribe(data => {
        this.checkid = data;
        var filedata={
          fileid:id
        }
        this.documentService.decryptedvalues(filedata).subscribe((data:any)=>{
          var routervalue=data.decryptdata
        this.checkid.forEach(element => {
         
      
          if (element._id == routervalue) {
            this.navigationelement = element
            this.currentRoot = this.navigationelement
            this.currentPath = path
            this.getProfiles()
            this.folderfilerefresh()
          }
        })
          
       
        });

      })
    }
    if (id == undefined) {
      this.getProfiles()
      if (this.router.url == '/home/myfiles') { this.currentPath = null; this.currentRoot = null; }
      this.getFiles_folders()
      this.modalupdateFileElementQuery()
      this.IpAddress= JSON.parse(localStorage.getItem('mylocation'));
   
    }




    // if(id!=undefined ){
    //   console.log("id")
    //   // this.router.navigate(['/mainnav/myfiles']);
    //  var path = JSON.parse(localStorage.getItem('currentpath'));
    // console.log(path)
    // this.documentService.getfolder().subscribe(data => {
    //   this.checkid = data;
    //   console.log(this.checkid)
    //  this.checkid.forEach(element => {
    //   if(element.encryptedId == id){
    //     this.navigationelement=element
    //       this.currentRoot=this.navigationelement
    //       this.currentPath=path
    //       console.log(this.currentPath)
    //       this.getProfiles()    
    //       this.folderfilerefresh()    
    //   }
    //   });

    //   })   
    // }  
    //   else if (id==undefined ){

    //     console.log("not id")
    //     this.getProfiles()    
    //     if (this.router.url == '/mainnav/myfiles/:id') { this.currentPath = null; this.currentRoot = null; }
    //     this.getFiles_folders()
    //     this.modalupdateFileElementQuery()
    //   }




    

  }
  //================navigation in popup=================
  modalnavigate(event) {
    var currentRoot = event
    this.modalPath.push(event)
    this.queryFolder(currentRoot ? currentRoot._id : 'root');
    this.queryFile(currentRoot ? currentRoot._id : 'root');
  }

  modalnavigatepop() {
    this.modalPath.pop()
    var currentRoot = this.modalPath[this.modalPath.length - 1]
    this.queryFolder(currentRoot ? currentRoot._id : 'root');
    this.queryFile(currentRoot ? currentRoot._id : 'root');
  }
  //==================getting user type==============
  getProfiles() {
    this.profileData = JSON.parse(localStorage.getItem('currentUser'))
    var checknewVariable = this.userservice.decryptData(this.profileData.type)
    this.profileData.type = checknewVariable
  }
  //================== user favorite file and folder ==========================
  getFavorateFileAndFolders() {
    this.documentService.getfavorites().subscribe(data => {
      this.favoritedata = data
      if (this.folders && this.filedata)
        this.favoritedata.forEach(element => {
          if (element.isFolder) var foundfolder = this.folders.find(element1 => element.folderid && element1._id == element.folderid._id)
          if (element.isFile) var foundfile = this.filedata.find(element1 => element.fileid && element1._id == element.fileid._id)

          if (foundfile) foundfile.favoriteid = element._id
          if (foundfolder) foundfolder.favoriteid = element._id
        });
    })
  }




  //================== user files and folder =======================================
  getFiles_folders() {
    this.documentService.getfolder().subscribe(data => {
      this.folders = data;
      this.query()
      this.documentService.getuserfiles().subscribe(data => {
        this.filedata = data
        this.updateFileElementQuery();
        this.getFavorateFileAndFolders()
        this.modalupdateFileElementQuery()

      });
    });
  }
  query() {
    this.routes.queryParams.subscribe(params => {
      if (params && params.folderid!=undefined) {
        var folderid = this.userService.decryptData(params.folderid)
        var id = folderid.split('"')
        var folderdta = this.folders.find(element1 => element1._id == id[1])
        this.folderdataid = folderdta;
        this.clicknewcondition(this.folderdataid)
      }
    });
  }
  // coming from search click
  clicknewcondition(sfolderdata) {
    if (sfolderdata != null) {
      this.childparent = [];
      this.currentRoot = sfolderdata;
      if (sfolderdata.parentid) {
        this.parrentcheck(sfolderdata)
        this.currentPath = this.childparent.reverse()

      }
      else {
        this.currentPath = this.pushToPath(this.currentPath, sfolderdata);
      }
      this.queryInFolder(this.currentRoot ? this.currentRoot._id : 'root');
    }
  }
  // *****************************************************************************************************************
  parrentcheck(element) {
    this.childparent.push(element)
    var parent = this.folders.find(element1 => element1._id == element.parentid)
    if (parent && parent.parentid) {
      this.parrentcheck(parent)
    }
    else if (parent) {
      this.childparent.push(parent)
      return
    }
  }


  //========================= share function ====================================
  ShareElement(event) {
    setTimeout(() => {
      $('body').css("overflow", "hidden");

    }, 10);
    if (!(event.title == 'Signature')) event.title = null;
    if (this.profileData && this.profileData.type == 'individual') {
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '848px',
        height:'630px',
        disableClose: true,
        autoFocus: false,
        panelClass: "test",
        data: { content: event.element, text: 'owner', title: event.title, multi: false }
 
      });
      filedialog.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");

        }, 10);


      })

    }else  {
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: true,
        panelClass: "orgn",
        autoFocus: false,
        data: { content: event.element, title: event.title, multi: false },
      });
      filedialog.afterClosed().subscribe(res => {
        console.log(res)
        if(res=='true'){
          setTimeout(() => {
            $('body').css("overflow", "hidden");
  
          }, 10);
        }
        else{
          setTimeout(() => {
            $('body').css("overflow", "auto");
  
          }, 10);
        }
       


      })
    }
  }



  //====================== make favorite =============================
  Favorite = function (element: FileElement) {
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    if (element.isFile) {
      var data = { name: element.name, fileid: element._id, isFile: element.isFile }
      this.documentService.createfavorite(data).subscribe(data => {
        element.favoriteid = data._id
      })

    }
    if (element.isFolder) {
      var data1 = { name: element.name, folderid: element._id, isFolder: element.isFolder }
      this.documentService.createfavorite(data1).subscribe(data => {
        element.favoriteid = data._id
        var mousedata = {
          uid: data.uid,
          documentid: data.fileid,
          latitude: this.latitude,
          longitude: this.longitude,
          message: "Favorate",
          isFile: true,
          IpAddress:(this.IpAddress)? this.IpAddress.ip:"Not Avilable"
        }
        this.documentService.savemousemovement(mousedata).subscribe(data => {
        });
      })
    }
  }

  //======================= remove favorite ========================================
  Removefavorite(element: FileElement) {
    var data1 = { _id: element.favoriteid }
    this.documentService.removefavorite(data1).subscribe(data => {
      delete element.favoriteid
    });
  }
  open() {
    this.router.navigate(['shareddocument/:id']);
  }

  onFileSelected(fileInput: any, title: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    formData.append("uploads[]", files[0], files[0]['name']);
    this.documentService.saveFiles(formData)
  }

  //========================= adds a new folder =================================
  addFolder(folder: { name: string }) {
    let duplicatefolderName = []
    let resultFolderName
    this.currentRoot ? this.currentRoot._id : false
    this.fileElements.subscribe(folders => {
      duplicatefolderName = folders.filter((folderdata: any) => folderdata.isFolder && folderdata.name == folder.name && (folderdata.parentid?folderdata.parentid==(this.currentRoot ? this.currentRoot._id : 0):true));
      if (duplicatefolderName.length && folder.name) {
        let count = 0
        do {
          count++;
          resultFolderName = folder.name + ' (' + count + ')'
          let isMatch = false
          for (let i = 0; i < folders.length; i++) {
            if (folders[i].name == resultFolderName) {
              isMatch = true;
              break;
            }
          }
          if (!isMatch)
            break;
        } while (folders.length >= count)
      }
    })
    if (folder.name != 'folderupload789456123') {
      if (duplicatefolderName.length > 0 && resultFolderName) folder.name = resultFolderName
      var data = { name: folder.name, parentid: this.currentRoot ? this.currentRoot._id : false }
      duplicatefolderName = []
      this.documentService.createfolder(data).subscribe(data => {
        // this.folders = data
        this.getFiles_folders();
        // if (this.folders) this.updateFileElementQuery();
        this.documentService.openSnackBar("Folder created successfully" ,"X")
      })
    }
    else {
      this.getFiles_folders()
    }
  }

  //for emiting file 
  addFile(event) {

    this.getFiles_folders()
  }

  //======================== remove element ==============================
  removeElement = function (element: FileElement) {
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    element.active = false
    this.documentService.deletefolder(element).subscribe(data => {
      var mousedata = {
        documentid: data._id,
        message: " Deleted ",
        isFile: true,
        latitude: this.latitude,
        longitude: this.longitude,
        IpAddress:(this.locationdata)? this.locationdata.ip : 'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
      this.getFiles_folders()
    });
  }

  //=============================refresh page ===============================
  refreshPage() {
    this.currentRoot = null;
    this.updateFileElementQuery();
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element);
    localStorage.removeItem('currentpath')

    this.userService.setpath(this.currentPath);
    // localStorage.setItem('currentpath', JSON.stringify(this.currentPath)) 
    this.canNavigateUp = true;
    this.queryFolder(this.currentRoot ? this.currentRoot._id : 'root');
    this.queryFile(this.currentRoot ? this.currentRoot._id : 'root');
    this.modalPath=JSON.parse(JSON.stringify(this.currentPath));
  }

  navigateUp(event) {
    let current
    if (event != 'root') {
      if(this.currentRoot._id==event._id){ current=true}
      else this.currentRoot = event
       }
    
    else this.currentRoot = null
   
   
  if(!current) { 
    this.updateFileElementQuery();

  }
  this.queryFolder(this.currentRoot ? this.currentRoot._id : 'root');
  this.queryFile(this.currentRoot ? this.currentRoot._id : 'root');
  this.currentPath = this.popFromPath(this.currentPath, this.currentRoot);}

  //============================= move element ===============================
  moveElement = function (event: { element: FileElement; moveTo: any }) {
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    if (event.element.isFolder) {
      event.element.parentid = event.moveTo._id;
    }
    else {
      if (event.moveTo) event.element.folderid = event.moveTo._id
    }
    if (event.element) {
      var data = {
        element: event.element,
        MoveTo: event.moveTo,
      }
      this.documentService.updatefolderOnMove(data).subscribe(data => {
        this.getFiles_folders()
        var mousedata = {
          uid: data.uid,
          documentid: data._id,
          message: "Moved ",
          latitude: this.latitude,
          longitude: this.longitude,
          IpAddress:(this.locationdata)? this.locationdata.ip : 'not avilable'
        }
        if (data) this.documentService.savemousemovement(mousedata).subscribe(data => { });


      });
    }
    else this.getFiles_folders()

    this.updateFileElementQuery();
  }

  //==================rename element ============================
  renameElement = function (element) {
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    this.documentService.updatefolder(element).subscribe(data => {
      var mousedata = {
        documentid: data._id,
        message: "Renamed",
        fromName: element.previousname,
        toName: data.name,
        latitude: this.latitude,
        longitude: this.longitude,
        isFile: true,
        IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
      this.getFiles_folders()
    });
  }

  transferElement(event: { element: FileData; moveTo: FileElement }) {
    if (event.element.isFolder) event.element.parentid = event.moveTo._id;
    else event.element.folderid = event.moveTo._id
    var locationdata = JSON.parse(localStorage.getItem('currentLocation'));
    this.latitude = this.latitude ? this.latitude : (locationdata)? locationdata.latitude: undefined;
    this.longitude = this.longitude ? this.longitude : (locationdata)? locationdata.longitude: undefined;
    this.documentService.updatefolder(event.element).subscribe(data => {
      this.getFiles_folders()
      var mousedata = {
        // uid: data.uid,
        // documentid: data._id,
        latitude: this.latitude,
        longitude: this.longitude,
        message: "file moved ",
        IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
    });
    this.updateFileElementQuery();
  }
  modalupdateFileElementQuery() {
    setTimeout(() => {
      this.queryFolder(this.currentRoot ? this.currentRoot._id : 'root');
      this.queryFile(this.currentRoot ? this.currentRoot._id : 'root');
    }, 1000)

  }
  updateFileElementQuery() {
    this.fileElements = this.queryInFolder(this.currentRoot ? this.currentRoot._id : 'root');
    this.LoadingTrue.next(true);
    this.files = this.queryInFile(this.currentRoot ? this.currentRoot._id : 'root');

  }

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

  popFromPath(path, current) {
    if (current == null) {
      path = [];
      this.router.navigate(['/home/myfiles']);
    }
    else {
      var data={
        fileid:current._id
      }

    this.documentService.encryptedvalues(data).subscribe((data:any)=>{
      this.router.navigate(['/home/myfiles/'+data.encryptdata]);
      // this.router.navigate(['/mainnav/myfiles/:id'], { queryParams: { id: current.encryptedId } });

      var i = path.findIndex(x => x._id == current._id);
      path.splice(i + 1, path.length)
    })

   
    }
    return path;
  }


  folderfilerefresh() {
    this.documentService.getfolder().subscribe(data => {
      this.folders = data;
      this.documentService.getuserfiles().subscribe(data => {
        this.filedata = data
        this.navigateToFolder(this.navigationelement)
        // this.popFromPath(this.currentPath,this.currentRoot)

        this.navigateUp(this.navigationelement)
      });
    });

  }

  //getting the folders based on routing
  queryInFolder = function (folderId: string) {
    //   if(this.navigationelement!=null){
    //     console.log("navi")
    //     this.documentService.getfolder().subscribe(data => {
    //       this.folders = data;
    //       this.documentService.getuserfiles().subscribe(data => {
    //         this.filedata = data
    //         const result: FileElement[] = [];
    //         if (this.folders) {
    //           console.log("folders")
    //           this.folders.forEach(element => {
    //             element.isFolder = true
    //             if (!element.parentid && folderId == 'root') {
    //               result.push(element);
    //             }
    //             else if (element.parentid == folderId){
    //               result.push(element);
    //               console.log(element)
    //             } 
    //           });
    //         }
    //         if (!this.querySubject) {
    //           this.querySubject = new BehaviorSubject(result);
    //         } else {
    //           this.querySubject.next(result);
    //         }
    //         return this.querySubject.asObservable();

    //       })
    //     })
    //   }
    // else{
    const result: FileElement[] = [];
    if (this.folders) {
      this.folders.forEach(element => {
        element.isFolder = true
        if (!element.parentid && folderId == 'root') {
          result.push(element);
        }
        else if (element.parentid == folderId) {
          result.push(element);
        }
      });
    }
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();

    // }

  }

  //getting the files based on routing
  queryInFile(folderId: string) {
    //     if(this.navigationelement!=null){

    //       this.documentService.getfolder().subscribe(data => {
    //         this.folders = data;
    //         this.documentService.getuserfiles().subscribe(data => {
    //           this.filedata = data
    //           const result: FileData[] = [];
    //           this.filedata.forEach(element => {
    //             if (!element.folderid && folderId == 'root') {
    //               result.push(element);
    //             }
    //             else if (element.folderid == folderId) {
    //               result.push(element);
    //               console.log(element)
    //             }
    //           })
    //           if (!this.FileSubject) {
    //             this.FileSubject = new BehaviorSubject(result);
    //           } else {
    //             this.FileSubject.next(result);
    //           }
    //           return this.FileSubject.asObservable();

    //         })
    //       })

    //     }

    // else{
    const result: FileData[] = [];
    if(this.filedata && this.filedata.length)
    this.filedata.forEach(element => {
      if (!element.folderid && folderId == 'root') {
        result.push(element);
      }
      else if (element.folderid == folderId) result.push(element);
    })
    if (!this.FileSubject) {
      this.FileSubject = new BehaviorSubject(result);
    } else {
      this.FileSubject.next(result);
    }
    return this.FileSubject.asObservable();

    // }

  }

  get(id: string) {
    let returnvalue
    this.folders.forEach(element => {
      if (element._id == id) {
        returnvalue = element
      }
    });
    return (returnvalue)
  }

  openMenu(event: MouseEvent, viewChild: MatMenuTrigger) {
    event.preventDefault();
    viewChild.openMenu();
  }
  //getting the folders based on routing
  queryFolder = function (folderId: string) {
    this.myElements = []
    if (this.folders) {
      this.folders.forEach(element => {
        if (!element.parentid && folderId == 'root') this.myElements.push(element);
        else if (element.parentid == folderId) this.myElements.push(element);
      });
    }

  }

  //getting the files based on routing
  queryFile(folderId: string) {

    this.Myfiles = []
    if (this.filedata)
      this.filedata.forEach(element => {
        if (!element.folderid && folderId == 'root') {
          this.Myfiles.push(element);
        }
        else if (element.folderid == folderId) this.Myfiles.push(element);
      })


  }
}


