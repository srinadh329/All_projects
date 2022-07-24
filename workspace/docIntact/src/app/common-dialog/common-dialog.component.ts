import { Component, OnInit,Inject,Output,EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material';
import { DocumentService } from '../document.service';
import { HttpClient,HttpEventType,HttpResponse, HttpRequest } from '@angular/common/http';
import {FileQueueObject, FileuploadService } from '../fileupload.service';
import { Observable } from 'rxjs/Observable';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterEvent, NavigationStart } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { PatternValidator, } from '@angular/forms';
import { UserService } from '../user.service';
import { filter, tap, take } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {
  header:boolean
  constructor(public userService: UserService,config: NgbModalConfig, private router: Router,private documentservice:DocumentService ,private modalService: NgbModal,public dialogRef: MatDialogRef<CommonDialogComponent>,@Inject(MAT_DIALOG_DATA) public dialogdata,public documentService:DocumentService,public uploader:FileuploadService) {
      // console.log(data.content)
// 
// if(this.userService.matclose) 
// this.userService.matclose.subscribe(data=>{
//   console.log("eventemitter")
//   this.dialogRef.close(false); 
// })
// router.events.pipe(
//   filter((event: RouterEvent) => event instanceof NavigationStart),
//   tap(() => this.dialogRef.close()),
//   take(1),
// ).subscribe();
 
  }
  queue: Observable<FileQueueObject[]>;
  private modals: any[] = [];
  renameerrorshow=false
  folderName: string;
  filesToUpload: any;
  documentdata:any
  profileData:any
  filedata : any 
  show=false
  hide=false
  percentDone:any;
  folderdata:any;
  delete=false
  makecopy=false
  deleteAll=false  
  show1=false
  show2=false
  requestlogin=false
  trashdelete=false
  restore=false
  restore1=false
  delete1=false
  exitdialog=false
  folder1=false
  fields:boolean=false
  deletefolder=false
  sharesubmit:boolean=false
  expired:boolean=false
  videorecord=false
  protection:boolean=false
  dependency:boolean=false
  errorshow:boolean=false
  errorshow1:boolean=false
  deletedepartment:boolean=false
  watermark:boolean=false
  sharetonew:boolean=false
  newfilename:boolean=false
  notregister:boolean=false
  aiauthenticate:boolean=false
  needToBlockAccount:boolean=false
  DisplayContent
  mobilelinkexpire:boolean=false
   ngOnInit() {
    if(this.dialogdata.name=='Rename')
    {this.header=true  
      this.show=false
      this.delete=false
      this.delete1=false
      this.fields=false
      this.makecopy=false
      this.deleteAll=false
      this.deletefolder=false
      this.renameerrorshow=true
      this.show1=true
      this.expired=false
      this.videorecord=false
      this.protection=false
      this.dependency=false
      this.errorshow1=false
      this.sharetonew=false
      this.newfilename=false
      this.notregister=false
      this.mobilelinkexpire=false
      this.aiauthenticate=false
      this.needToBlockAccount=false
      var rename=this.dialogdata.folder.name.split('.')
      this.folderName=rename[0];
    }
      else if(this.dialogdata.name=='create')
      {this.header=false  
        this.show=false
       this.delete1=false
       this.fields=false
       this.deletefolder=false
        this.delete=false
        this.makecopy=false
        this.deleteAll=false
        this.exitdialog=false
        this.renameerrorshow=false
        this.errorshow1=true
        this.sharesubmit=false
        this.expired=false
      this.videorecord=false
      this.protection=false
      this.dependency=false
      this.sharetonew=false
      this.newfilename=false
      this.notregister=false
      this.mobilelinkexpire=false
      this.aiauthenticate=false
      this.needToBlockAccount=false
      setTimeout(() => {
        $("#CreateNewFolder").focus();
      }, 500);
      }
    else if(this.dialogdata.name=='Folderupload')
    {
      this.header=false
      this.show=true
      this.delete=false
      this.delete1=false
      this.fields=false
      this.deletefolder=false
      this.makecopy=false
      this.deleteAll=false
      this.renameerrorshow=false
      this.sharesubmit=false
      this.expired=false
      this.videorecord=false
      this.protection=false
      this.dependency=false
      this.sharetonew=false
      this.newfilename=false
      this.notregister=false
      this.mobilelinkexpire=false
      this.aiauthenticate=false
      this.needToBlockAccount=false
    }
    else if(this.dialogdata.name=='DeleteTemplate'){
      this.delete=true
      this.makecopy=false;
    }
    else if(this.dialogdata.name=='delete')
    {
      this.delete=true
      this.delete1=false
      this.deletefolder=false
    }
    else if(this.dialogdata.name=='delete1')
    {
      this.delete1=true
    }
    else if(this.dialogdata.name=='deletedepartment'){
      this.deletedepartment=true

    }
    else if(this.dialogdata.name=='exitdialog')
    {
      this.exitdialog=true;
      this.makecopy=false;
    }
    else if(this.dialogdata.name=='deletefolder')
    {
      this.deletefolder=true
    }

    else if(this.dialogdata.name=='deleteMultiFilesandFolders')
    {
      this.deletefolder=true
    }
    else if(this.dialogdata.name=='deleteMultiFiles')
    {
      this.deletefolder=true
    }
    else if(this.dialogdata.name=='deleteMultiFolders')
    {
      this.deletefolder=true
    }


    else if(this.dialogdata.name=='makecopy')
    {
      this.makecopy=true
    }

   else if(this.dialogdata.name=='trashdelete')
   {
      this.trashdelete=true
   }
   else if(this.dialogdata.name=='restore')
   { 
      this.restore=true
   }
   else if(this.dialogdata.name=='restore1')
   { 
      this.restore1=true
   }
   else if(this.dialogdata.name=='requestlogin')
   {
      this.requestlogin=true
   }
   else if(this.dialogdata.name=='fields')
   { 
     this.fields=true
   }
   else if(this.dialogdata.name=='sharesubmit')
   {
     this.sharesubmit=true
   }
   

   
   else if(this.dialogdata.name=='expired')
   {
     this.expired=true
   }
   else if(this.dialogdata.name=='videorecord')
   {
     this.videorecord=true
   }
   else if(this.dialogdata.name=='protection')
   {
     this.protection=true
   }
   else if(this.dialogdata.name=='dependency')
   {
     this.dependency=true
   } 
   else if(this.dialogdata.name=='sharetonew')
   {
    this.sharetonew=true
   }
   else if(this.dialogdata.name=='newfilename')
   {
    this.newfilename=true

   }
   else if(this.dialogdata.name=='notregister')
   {
   this.notregister=true
   }
   else if( this.dialogdata.name=="aiauthenticate")
   {
    this.aiauthenticate=true
    this.DisplayContent='Are you sure want to continue with facial authentication?'
   }
   else if( this.dialogdata.name=="needtoblockaccount")
   {
    this.needToBlockAccount=true
    if(this.dialogdata.blockMsg) this.DisplayContent=this.dialogdata.blockMsg
    else this.DisplayContent='Are you sure want to continue'
   }
   else if(this.dialogdata.name=="mobilelinkexpire"){
     this.mobilelinkexpire=true
   }
  }
  
  CreateFolder(folder,event) {
    if (this.folderName.length > 0 && event.key == 'Enter') {
      this.createFolderDialogClose(folder)
    }
  }
  foldererror=false;
  createFolderDialogClose(folder1) {
    if (folder1.invalid) this.foldererror=true;
    if (folder1.valid) {
      this.errorshow = false;
      this.errorshow1 = false;
      if (folder1.value != undefined) this.dialogRef.close(this.folderName);
    }
    if (folder1.value == undefined) {
      this.errorshow = true;
      this.errorshow1 = true;

    }
  }
invaliderror=false;
renameFolderDialogClose(folder1)
{
  if(folder1.invalid)this.invaliderror=true
  // else if(foldernamecheck.value!=undefined && foldernamecheck.value=="" && foldernamecheck.valid) this.errorshow1=true;
  // else {
  //   this.dialogRef.close(foldernamecheck);
  // }
  if(folder1.valid){ 
  this.errorshow=false;
  this.errorshow1=false;
   if(folder1.value!=undefined) this.dialogRef.close(this.folderName);
   } 
   if(folder1.value==undefined) {
     this.errorshow=true;
     this.errorshow1=true;
 }
}

  open(content) {

    this.modalService.open(content);
  }
  rqstlogin(){
    this.router.navigate(['/']);
  }

  Passwordsubmit(Password){
    if(Password.valid)this.dialogRef.close(Password.value.Password );
  }
  filenamesubmit(filename)
  {
    if(filename.valid)this.dialogRef.close(filename.value.Filename);

  }
  onNoClick(): void {
    this.dialogRef.close("restore");
  }
  closeTemplateDialogue():void{
    this.dialogRef.close("DeletedTemplate");

  }
 

}



