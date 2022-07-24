import { Component,Input,Output, SimpleChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DocumentService } from '../document.service';
import { FrontEndConfig } from '../frontendConfig';
import { Router,NavigationEnd,ActivatedRoute } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { AdminService } from '../admin.service';
import { Overlay } from '@angular/cdk/overlay';
import { Subject, BehaviorSubject,Subscription } from 'rxjs';
import { ViewContainerRef } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchresultComponent implements OnInit {

  type: any
  changeText: boolean;
  sub: Subscription;

  constructor( public userService: UserService,public overlay: Overlay, public adminservice: AdminService, public viewContainerRef: ViewContainerRef, private documentservice: DocumentService, public http: HttpClient, private router: Router, public dialog: MatDialog, private frontendconfig: FrontEndConfig, private routes: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd)) { return; }
      this.ngOnInit();
    });
  }

  serverurl = this.frontendconfig.getserverurl();
  @Input() fileElements: FileElement[];  //file data
  @Input() fileData: FileData[];  //folder data
  search: any;
  show=false;
  searchdata: any; //store search data
  profiledata: any;
  uid: any;  // store user id
  foldervalue:any;
  selectedName:any;
  sample2:any;
  element:any
  file = [];  // store file data
  folder = []; // store folder data
  currentRoot = null;
  currentPath = null;
  Sharedata
  querySubject
  searchfiles = [];
  searchfolders = [];
  
  ngOnInit() {
    this.search = this.routes.snapshot.queryParams.searchvalue;
    this.adminservice.getProfile().subscribe(data => {
      this.profiledata = data;
      this.uid = this.profiledata._id;
    })
    
    var search = {
      search: this.routes.snapshot.queryParams.searchvalue,
      uid: this.uid
    }
    this.documentservice.searchdocuments(search).subscribe(data => {
      this.folder=[]
      this.file=[]
      this.searchdata = data;
      this.searchdata.forEach(element => {
        if (element.isFile) {
          this.file.push(element);
        }
        else {
          this.folder.push(element)
        }
      });
      if(this.file.length==0&&this.folder.length==0){
        this.show=true;
      }
      else{
        this.show = false
      }
    })
  }
 
  //======================== navigate to file content ==============================
  getFileContent = function (content) {
    if(content.type == 'application/zip'){
    } else {
       var filedata={
         fileid:content._id
       }
       this.documentservice.encryptedvalues(filedata).subscribe((data:any)=>{
        this.router.navigate(['filecont/'+data.encryptdata]);

       })
    }
  }
  //=====================================================================

  ngOnChanges(changes: SimpleChanges): void { }
  
  navigateFolder(element: FileElement) {
    if (element.isFolder == true) {
      var folderid = this.userService.encryptData(JSON.stringify(element._id))
      this.router.navigate(['/home/myfiles/:'], { queryParams: { folderid: folderid } });
    }
  //   var link = "http://localhost:4200/mainnav/myfiles/:" + element._id
  //   if (element.isFolder) {
  //     this.foldervalue = element
  //     console.log(this.foldervalue)
      // this.router.navigate(['/mainnav/myfiles/:' + this.foldervalue.name + ':' +  this.foldervalue.encryptedId]);

   
  }

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


  
  //=====================================================================
  
  highlightRow(element) {
    this.selectedName = element._id;
    this.sample2 = true
    this.element = element;
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