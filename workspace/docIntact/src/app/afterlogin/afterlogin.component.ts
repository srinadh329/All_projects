import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../document.service';
import { FrontEndConfig } from '../frontendConfig';
import { UserService } from '../user.service'
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs';
import { FileElement } from 'src/app/after-confirmation/after-confirmation.component'
import { FileData } from 'src/app/after-confirmation/after-confirmation.component'
import { BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";
import { DataService } from '../core/data.service';
import { OrganizationFileSharingComponent } from '../organization-file-sharing/organization-file-sharing.component'
import { HttpClient } from '@angular/common/http';
declare var $: any; //jquery variable+
@Component({
  selector: 'app-afterlogin',
  templateUrl: './afterlogin.component.html',
  styleUrls: ['./afterlogin.component.css']
})

export class AfterloginComponent implements OnInit {

  filesToUpload: Array<File> = [];
  profileData: any
  filedata: any
  public fileElements: Observable<FileElement[]>;
  public files: Observable<FileData[]>;
  private querySubject: BehaviorSubject<FileElement[]>;
  private FileSubject: BehaviorSubject<FileData[]>;
  folders: any
  currentRoot: FileElement;
  currentid: any
  currentPath: string;
  canNavigateUp = false;
  foldervalues
  folderpath
  favoritedata: any
  favoriteadd: Boolean = true;
  favfolders = []
  favfiles = []
  public myElements=[];
  public Myfiles= [];
  modalPath=[];
  ///////////////////////////////////
  role:any;
  userName:any;
  userEmail:any;
  userType:any;
  IpAddress
  constructor(public dataservice: DataService, private router: Router, private documentService: DocumentService, private frontendconfig: FrontEndConfig, 
    private userService: UserService, public dialog: MatDialog,private http: HttpClient) {
    this.dataservice.newfavorite()
      .subscribe(data => {
        // this.openChat = true;
        // this.ngOnInit()
      })
  }

  serverurl = this.frontendconfig.getserverurl();

  getProfileData() {
    var profiledata = JSON.parse(localStorage.getItem('currentUser'));
    this.role = this.userService.decryptData(profiledata.role);
    this.userName = this.userService.decryptData(profiledata.name);
    this.userEmail = this.userService.decryptData(profiledata.email);
    this.userType = this.userService.decryptData(profiledata.type);
  }

  ngOnInit() {
    this.getFiles_folders()
    // this.getFavorateFileAndFolders()
    this.modalupdateFileElement();
    this.getProfileData();
    this.IpAddress=JSON.parse(localStorage.getItem('mylocation'));
  }
//================navigation in popup=================
modalnavigate(event)
{
    var currentRoot=event
    this.modalPath.push(event)
    this.queryFolder(currentRoot ? currentRoot._id : 'root');
    this.queryFile(currentRoot ? currentRoot._id : 'root');
  }
  modalnavigatepop()
  {
    this.modalPath.pop()
    var currentRoot=this.modalPath[this.modalPath.length-1]
    this.queryFolder(currentRoot ? currentRoot._id : 'root');
    this.queryFile(currentRoot ? currentRoot._id : 'root');
  }
  //================== user favorite file and folder ==========================
  getFavorateFileAndFolders() {
    this.documentService.getfavorites().subscribe(data => {
      this.favoritedata = data
      this.favoritedata.forEach(element => {
        var foundfolder = this.folders.find(element1 => element1.name == element.name)
        var foundfile = this.filedata.find(element1 => element1.name == element.name)
        if (foundfile) foundfile.favoriteid = element._id
        if (foundfolder) foundfolder.favoriteid = element._id
      });
    })
  }

  //================== user files and folder =======================================
  getFiles_folders() {
    this.documentService.getfolder().subscribe(data => {
      this.folders = data;
      this.documentService.getuserfiles().subscribe(data => {
        this.filedata = data
        if(this.filedata && this.folders)
        {
          this.updateFileElementQuery();
          this.getFavorateFileAndFolders();
          this.modalupdateFileElement()
        }

      });
    });
  }

  //========================= share function ====================================
  ShareElement(event) {

    setTimeout(() => {
      $('body').css("overflow", "hidden");

    }, 10);

    if (!(event.title == 'Signature')) event.title = null;
    if (this.userType == 'individual') {
      const filedialog = this.dialog.open(SharepopupComponent, {
        width: '848px',
        disableClose: false,
        autoFocus: false,
        panelClass: "orgn",
        data: { content: event.element, text: 'owner',title: event.title }
      });
      filedialog.afterClosed().subscribe(res => {
        setTimeout(() => {
          $('body').css("overflow", "auto");

        }, 10);


      })
    }
    else if (this.userType == 'organisation') {
      const filedialog = this.dialog.open(OrganizationFileSharingComponent, {
        width: '900px',
        disableClose: false,
        panelClass: "orgn",
        autoFocus: false,
        data: { content: event.element, title: event.title },
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
    if (element.isFile && this.favoriteadd) {
      this.favoriteadd = false;
      var data = { name: element.name, fileid: element._id, isFile: element.isFile }
      this.documentService.createfavorite(data).subscribe(data => {
        if (data) setTimeout(() => {
          this.favoriteadd = true
        }, 2000);
        this.getFavorateFileAndFolders()
      })
    }
    if (element.isFolder && this.favoriteadd) {
      this.favoriteadd = false;
      var data1 = { name: element.name, folderid: element._id, isFolder: element.isFolder }
      this.documentService.createfavorite(data1).subscribe(data => {
        if (data) setTimeout(() => {
          this.favoriteadd = true
        }, 2000);
        var mousedata = {
          uid: data.uid,
          documentid: data.fileid,
          message: "Favorate",
          isFile: true,
          IpAddress:( this.IpAddress)? this.IpAddress.ip : 'not avilable'

        }
        this.documentService.savemousemovement(mousedata).subscribe(data => {
          // this.ngOnInit()
        });
      })
    }
  }

  //======================= remove favorite ========================================
  Removefavorite(element: FileElement) {
    var data1 = { _id: element.favoriteid }
    this.documentService.removefavorite(data1).subscribe(data => {
      this.favfiles = []
      this.favfolders = []
      //  this.ngOnInit() 
      this.getFavorateFileAndFolders()
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
    // .subscribe(data => {
    //   // this.imagedata = data
    //   this.ngOnInit()
    // })
  }

  //========================= adds a new folder =================================
  // addFolder(folder: { name: string }) {
  //   this.currentRoot ? this.currentRoot._id : false
  //   if (folder.name != 'folderupload789456123') {
  //     var data = { name: folder.name, parentid: this.currentRoot ? this.currentRoot._id : false }
  //     this.documentService.createfolder(data).subscribe(data => {
  //       this.folders = data
  //       // this.ngOnInit()
  //       this.getFiles_folders();
  //       if (this.folders) this.updateFileElementQuery();
  //     })
  //   }
  //   else {
  //     this.getFiles_folders()
  //     // this.ngOnInit()
  //   }
  // }
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
        } while (folders.length + 1 >= count)
      }
    })
    if (folder.name != 'folderupload789456123') {
      if (duplicatefolderName.length > 0 && resultFolderName) folder.name = resultFolderName
      var data = { name: folder.name, parentid: this.currentRoot ? this.currentRoot._id : false }
      duplicatefolderName = []
      this.documentService.createfolder(data).subscribe(data => {
        // this.folders = data
        this.getFiles_folders();
        if (this.folders) this.updateFileElementQuery();
        this.documentService.openSnackBar("Folder(s) created successfully" ,"X")
        this.router.navigate(['/home/myfiles/']);
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
    element.active = false
    this.documentService.deletefolder(element).subscribe(data => {
      var mousedata = {
        documentid: data._id,
        message: " Deleted ",
        isFile: true,
        IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
      this.getFiles_folders()
    });
  }

  navigateToFolder(element: FileElement) {
    this.currentRoot = element;
    this.updateFileElementQuery();
    this.currentPath = this.pushToPath(this.currentPath, element.name);
    this.canNavigateUp = true;
  }

  navigateUp() {
    if (this.currentRoot && !this.currentRoot.parentid) {
      this.currentRoot = null;
      this.canNavigateUp = false;
      this.updateFileElementQuery();
      this.currentid = 'id'
    } else {
      this.foldervalues = this.currentRoot
      this.currentRoot = this.get(this.currentRoot.parentid);
      this.currentid = this.currentRoot.name + this.foldervalues.parentencryptedId
      this.updateFileElementQuery();
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  //============================= move element ===============================
  moveElement = function (event: { element: FileElement; moveTo: FileElement }) {
    if (event.element.isFolder) event.element.parentid = event.moveTo._id;
    else event.element.folderid = event.moveTo._id
    this.documentService.updatefolder(event.element).subscribe(data => {
      this.ngOnInit()
      var mousedata = {
        uid: data.uid,
        documentid: data._id,
        message: "file moved ",
        IpAddress:(this.IpAddress)? this.IpAddress.ip :'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
    });
    this.updateFileElementQuery();
  }

  //==================rename element ============================
  renameElement = function (element) {

    this.documentService.updatefolder(element.element).subscribe(data => {
      var mousedata = {
        documentid: data._id,
        message: "Renamed",
        fromName: element.previousname,
        toName: data.name,
        isFile: true,
        IpAddress:(this.IpAddress)? this.IpAddress :"not avilable"
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
      this.getFiles_folders()
    });

  }

  transferElement(event: { element: FileData; moveTo: FileElement }) {
    if (event.element.isFolder) event.element.parentid = event.moveTo._id;
    else event.element.folderid = event.moveTo._id
       this.documentService.updatefolder(event.element).subscribe(data => {
      this.ngOnInit()
      var mousedata = {
        // uid: data.uid,
        // documentid: data._id,
        message: "file moved ",
        IpAddress:(this.IpAddress)? this.IpAddress.ip : 'not avilable'
      }
      this.documentService.savemousemovement(mousedata).subscribe(data => {
      });
    });
    
    this.updateFileElementQuery();
  }
  modalupdateFileElement() {
   setTimeout(()=>{this.queryFolder(this.currentRoot ? this.currentRoot._id : 'root');
   this.queryFile(this.currentRoot ? this.currentRoot._id : 'root');
  },1000) 
    
  }
  updateFileElementQuery() {
    this.fileElements = this.queryInFolder(this.currentRoot ? this.currentRoot._id : 'root');
    this.files = this.queryInFile(this.currentRoot ? this.currentRoot._id : 'root');
  }

  pushToPath(path: string, folderName: string) {
    // alert(path)
    let p = path ? path : '';
    p += `${folderName}>>`;
    this.folderpath = p
    return p;
  }

  popFromPath(path: string) {
    this.router.navigate(['/home/myfiles/:' + this.currentid]);
    let p = path ? path : '';
    let split = p.split('>>');
    split.splice(split.length - 2, 1);
    p = split.join('->');
    return p;
  }

  //getting the folders based on routing
  queryInFolder = function (folderId: string) {
    const result: FileElement[] = [];
    if (this.folders) {
      this.folders.forEach(element => {
        element.isFolder = true
        if (!element.parentid && folderId == 'root') {
          result.push(element);
        }
        else if (element.parentid == folderId) result.push(element);
      });
    }
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  //getting the files based on routing
  queryInFile(folderId: string) {
    const result: FileData[] = [];
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
  this.myElements=[]
  const result: FileElement[] = [];
  if (this.folders) {
    this.folders.forEach(element => {
      if (!element.parentid && folderId == 'root') {
        this.myElements.push(element);
      }
      else if (element.parentid == folderId) this.myElements.push(element);
    });
  }
 
}

//getting the files based on routing
queryFile(folderId: string) {
  const result: FileData[] = [];
  this.Myfiles=[]
  if(this.filedata)
  this.filedata.forEach(element => {
    if (!element.folderid && folderId == 'root') {
      this.Myfiles.push(element);
    }
    else if (element.folderid == folderId) this.Myfiles.push(element);
  })
 

}
}