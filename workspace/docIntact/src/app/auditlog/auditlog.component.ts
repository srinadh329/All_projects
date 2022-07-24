import { Component, OnInit, Input, Output, EventEmitter, ViewChild, NgZone,OnDestroy } from '@angular/core';
import { DocumentService } from '../document.service';
import { load } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';
import { FrontEndConfig } from '../frontendConfig';
import { UserService } from '../user.service';
import { DataService } from '../core/data.service';
declare var gapi: any; //google-drive
@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent implements OnInit {

  constructor(private documentservice: DocumentService, public activatedroute: ActivatedRoute, private frontendconfig: FrontEndConfig,
    private userService: UserService, private _ngZone: NgZone, private dataService: DataService,public router :Router) {
    this.refresh();
  }
  auditdata;
  documentLogs;
  SingleData;
  sharingPeoples;
  id;
  downloadType
  downloadFile
  withlog
  pdfPinSet
  pdfPin
  element
  userEmail: any;  // stores user email
  profiledata: any; // stores profile date
  userName: any; //stores user name
  isloading: boolean = true; //loading variable
  displaySigners: any; // stores all the sharing people (In Signature mode)
  docStatus: any; // document status
  serverurl = this.frontendconfig.getserverurl();
  email
  type: any;
  // panelOpenState = false;
  viewTimeLoader = false
  documentviewtimebtn = []
  filteredata
  videorecord
  videourl
  clearintervaldata
  @Output() maps = new EventEmitter<{ data: string }>();
  ngOnInit() {
    var urldata = this.router.url.split('/');
    this.profiledata = JSON.parse(localStorage.getItem('currentUser'))
    this.userEmail = this.userService.decryptData(this.profiledata.email);
    this.userName = this.userService.decryptData(this.profiledata.name);
      var data={
        fileid:urldata[3]
      }
      this.documentservice.decryptedvalues(data).subscribe((data:any)=>{
        this.id = data.decryptdata
        this.type = urldata[4];
        if (this.type == 'File') this.getDocumentDetails();
        else this.getFolderDetails();
      },error => {
        console.log(error)
        this.router.navigate(['home/myfiles'])
      })


      if( (/Edge\/\d./i.test(navigator.userAgent) || (!!(window as any).MSInputMethodContext && !!(document as any).documentMode)))
      {
       this.clearintervaldata=setInterval(() => {
          this.ccb(); 
          }, 100);
      }
      
      }
      ngOnDestroy() {
        clearInterval(this.clearintervaldata);
      }
      
       clearData(){
        window["clipboardData"].setData('text','')
      }
       ccb(){
      if(window["clipboardData"]){
       window["clipboardData"].clearData();
      }
    }

  //=========== get details of file ===============
  getDocumentDetails() {
    this.documentservice.getDocumentRecord(this.id).subscribe(data => {
      this.auditdata = data
      this.getDocumentLogs();
     
    },error=>{
      console.log(error)
      this.router.navigate(['home/myfiles'])
    });
  }

  //=========== get details of folder ===============
  getFolderDetails() {
    this.documentservice.getFolderRecord(this.id).subscribe(data => {
      this.auditdata = data
      this.getDocumentLogs();
      this.sharingPeople();
    },error=>{
      console.log(error)
      this.router.navigate(['home/myfiles'])
    });
  }

  //=========== autoRefresh ===============
  refresh() {
    this.dataService.documentUpdate().subscribe(data=>{
      if(data._id == this.id){
        this.auditdata = data
        this.docStatus = (this.auditdata && this.auditdata.status) ? (this.auditdata.status=='Completed' ? "Completed": (this.auditdata.status=='Partially completed'? 'In Progress' : ((this.auditdata.status=='Waiting for Sign' || this.auditdata.status=='Review')? 'Waiting' : undefined))) : undefined;      
      }
    });
    this.dataService.documentLogsUpdate().subscribe(data => {
      if (data.documentid == this.id) {
        this.getDocumentLogs();
        // this.sharingpeoplesview()
      }
    })
    if (this.type == 'File')
      this.dataService.FieldsValueUpdate().subscribe(data => {
        if (data.documentid == this.id) {
          this.currentVersionDocField();
        }
      })
  }
  clientid = "778273248008-3rlo8d96pebk6oci737ijtbhmla253gr.apps.googleusercontent.com"
  scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/autFileh/drive.file'
  ].join(' ');
  sharingPeople() {
    this.viewTimeLoader = true
    this.documentservice.getSharingPeoples(this.auditdata._id).subscribe(data => {
      this.sharingPeoples = data;
      this.isloading = false
    
      this.documentviewtimebtn = this.sharingPeoples.sharingpeoples
      // videorecoed
      this.displaySigners = this.sharingPeoples.sharingpeoples.filter(x => x.edit);
    this.sharingpeoplesview()
      if (this.type == 'File' && this.auditdata.versionid) this.currentVersionDocField();
      if(this.type == 'File' && !this.auditdata.versionid) {
      this.docStatus = (this.auditdata && this.auditdata.status) ? (this.auditdata.status=='Completed' ? "Completed": (this.auditdata.status=='Partially completed'? 'In Progress' : ((this.auditdata.status=='Waiting for Sign' || this.auditdata.status=='Review')? 'Waiting' : undefined))) : undefined;      
      }
    });
   
  }
//sharingpeoples
sharingpeoplesview()
{
  this.viewTimeLoader = true
  this.sharingPeoples.sharingpeoples.forEach((element,index) => {
    this.selectpeople(element.toemail,index)
    this.selectvideo(element.toemail,index)
  });
}
  getDocumentLogs() {
    this.viewTimeLoader = true
    this.documentservice.getDocumentLogs(this.auditdata).subscribe(data => {
     
      this.documentLogs = data;
      this.documentLogs=this.documentLogs.sort((a,b) => <any>new Date(a.created_at) - <any>new Date(b.created_at))
      this.documentLogs = this.documentLogs.filter(x => (x.message != 'selected' && x.message != 'Closed'))
      this.documentLogs.forEach(element => {
        if (element.toid && element.toid.fname) element.toid.name = element.toid.fname + ' ' + element.toid.lname;
      });
      this.sharingPeople();
    });
  }

  currentVersionDocField() {
    this.documentservice.getCurrentVersionDocFieldWithValues({ documentid: this.auditdata._id, versionid: this.auditdata.versionid }).subscribe((data:any) => {
   
      var currentVersionDocFieldOptions = data;
      this.displaySigners.forEach(element => {
        element.fieldsValues = currentVersionDocFieldOptions.filter(x => ((x.insertedemail == element.toemail || x.people == element.toemail) && ( x.type == 'signature' || x.type == 'initial' || x.type == 'Photo' ||x.type == 'Stamp' ) && x.type != 'label'  ));
        element.status = currentVersionDocFieldOptions.some(x => x.insertedemail == element.toemail) ? 'Submitted' : 'Waiting';
        if (this.documentLogs) element.IP = this.documentLogs.find(x => x.message == 'Submited' && x.toemail == element.toemail) ? this.documentLogs.find(x => x.message == 'Submited' && x.toemail == element.toemail).IpAddress : null;
        element.fieldvalues=element.fieldsValues.sort((a,b) => <any>new Date(a.created_at) - <any>new Date(b.created_at))
      });
      var filledFieldCount =0
      currentVersionDocFieldOptions.forEach(field => {
      if((field.value || field.signatureId || field.photoId || field.stampId)) filledFieldCount++        
      });
      var docStatusFinished = -1;
      docStatusFinished = this.displaySigners.filter(x => x.status == 'Submitted').length;
      // if (docStatusFinished >= 0 && this.displaySigners.length) this.docStatus = (docStatusFinished == this.displaySigners.length || filledFieldCount==currentVersionDocFieldOptions.length) ? "Completed" : (docStatusFinished > 0 && docStatusFinished < this.displaySigners.length) ? 'In Progress' : 'Waiting';
      this.docStatus = (this.auditdata && this.auditdata.status) ? (this.auditdata.status=='Completed' ? "Completed": (this.auditdata.status=='Partially completed'? 'In Progress' : ((this.auditdata.status=='Waiting for Sign' || this.auditdata.status=='Review')? 'Waiting' : undefined))) : undefined;      
    });
  }

  // locationvalues
  // selectedPerson
  // mapsdata(data, email, display) {
  //   if (!display) data.locationvalues = false;
  //   else {
  //     data.locationvalues = data
  //     if (email) this.selectedPerson = email
  //   }
  // }

  DownloadPDF() {
    this.documentservice.DownloadDocInAuditLog(this.auditdata);
  }

  validateValue(field) {
    var id;
    field.type = field.type ? field.type : field.message;
    if (field.type == 'signature' || field.type == 'initial' || field.type == 'Signature' || field.type == 'Initial') id = field.signatureId;
    else if (field.type == 'Stamp') id = field.stampId;
    else if (field.type == 'Photo') id = field.photoId;
    if (id && field.type) {
 var data ={
   type:field.type,
   id:id,
   docid:this.auditdata._id
 }
       this.documentservice.encryptedvalues(data).subscribe((data:any)=>{
       if(data)
       { 
      window.open(this.frontendconfig.frontendurl + '/transaction-verify/' + data.type + '/' + data.id + '/' + data.docid, '_blank');

       } 
       })
      // window.open(this.frontendconfig.frontendurl + '/transaction-verify?type=' + field.type + '&id=' + value + '&docid=' + value1, '_blank');
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

    if (this.downloadFile == 'withoutchanges') this.withlog = false
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
      this.documentservice.pdfDownload(downloaddata).subscribe((data: any) => {
        if (data.path && downloaddata.downloadType == "computer") {
          this.isloading = false
          this.documentservice.openSnackBar("File Downloaded Successfully", "X");
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
            this.documentservice.openSnackBar("File Export To Drive", "X");
          });

        }
        else this.isloading = false
      });
    }
    if (this.downloadType == 'attachment') {

      if (this.email == null || this.email == '') {
        this.documentservice.openSnackBar("Please Enter Email", "X");

      }
      else {
        var regexp = new RegExp('([A-Za-z]|[0-9])[A-Za-z0-9.]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})')
        if (regexp.test(this.email)) {
          document.getElementById('savetempclose').click()
          this.isloading = true
          this.documentservice.pdfDownload(downloaddata).subscribe((data: any) => {
            if (downloaddata.email && downloaddata.downloadType == "attachment" && data.path) {
              this.isloading = false
              this.documentservice.openSnackBar("File Sent To Email", "X");


            }
            else this.isloading = false
          });

        }
        else {
          this.documentservice.openSnackBar("Please Enter  Valid Email", "X");

        }

      }
    }


  }

  exporttodrive() {
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
  myPageInfo=[]
  totalTime:any
  logs :any
  selectpeople(email, index) {
 
    this.myPageInfo = []
    if (this.documentLogs)
      this.filteredata = this.documentLogs.filter(x => x.toemail == email && x.message == 'Viewed')
    this.logs = this.documentLogs.filter(x => x.toemail == email && x.message == 'Viewed')
   
    if(this.filteredata.length == 0 || (this.filteredata[0] && !this.filteredata[0].endTime) || this.filteredata == undefined)   this.viewTimeLoader = false
    if( this.filteredata.length> 0  && !this.filteredata[0].endTime )  this.filteredata.splice(index, 1)
      if(this.filteredata )
      {
        if (this.filteredata && this.filteredata.length) {
          this.sharingPeoples.sharingpeoples[index].endTime = 0
          for (var i = 0; i < this.filteredata[0].pageInfo.length; i++) {
            var time = 0
            this.filteredata.forEach(element => {
              var value = element.pageInfo[i] ? element.pageInfo[i].time : 0
              time += value
              this.sharingPeoples.sharingpeoples[index].endTime += value
            })
           if(time > 0)
              this.myPageInfo.push({ time: this.hhmmss(time), pageNo: i + 1 })
          }
          this.sharingPeoples.sharingpeoples[index].endTime = this.hhmmss(this.sharingPeoples.sharingpeoples[index].endTime)
          this.viewTimeLoader = false
    
        }
      }
   
  }
   pad(num) {
    return ("0"+num).slice(-2);
}
 hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs%60;
  var hours = Math.floor(minutes/60)
  minutes = minutes%60;
  return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  // return pad(hours)+":"+pad(minutes)+":"+pad(secs); for old browsers
}
pageviewtime()
{

  document.getElementById('pageviewtime').click()

}

selectvideo(email, index){
 this.videorecord = this.documentLogs.filter(x => x.email == email && x.message == 'Video Record')
}
showvideo(data){
this.videourl=data 

}
clearprevious(){
  this.videourl=''
}
}
