
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from '../document.service';
import { Router } from "@angular/router";
import { DataService } from '../core/data.service'
import { FormControl } from '@angular/forms';
import { VERSION } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as _moment from 'moment';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { GeneralService } from '../general.service';
import { UserService } from '../user.service';
import * as _ from "lodash";

declare var $: any;

const moment = (_moment as any).default ? (_moment as any).default : _moment;
declare var H: any;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sharepopup',
  templateUrl: './sharepopup.component.html',
  styleUrls: ['./sharepopup.component.css']
})

export class SharepopupComponent implements OnInit, OnDestroy {

  version = VERSION;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('userEmail') userEmail: ElementRef<HTMLInputElement>;  //mat input values

  private _onDestroy = new Subject<void>();
  registeredusers: any; //stores the list of all user in db
  access: any; // stores the access whether allowuser or public
  sharedPeople: any; //consists of list of shared people
  visible = true; //mat chips
  selectable = true; //for mat chips to allow select option
  removable = true; // for mat chips to allow remove option
  addOnBlur = true; // for mat chips to allow blur method
  separatorKeysCodes: number[] = [ENTER, COMMA]; // for mat chips to add into an array
  elementctrl = new FormControl(); // for mat chips
  filteredemail: Observable<string[]>; // filtered email for mat chip
  alluseremails: any = []; // consist of list of shared people of logged in user
  shareAccess = [] // stores the list of share access to particular user
  minDate: any;  // setting minutes for extra 30 mins
  userDoc: any;  // consists of current version document
  userDocList: any = []; // consists of list of feilds assigned user in document
  users = []; // consist of added user for sharing the document in mat chip
  sharingdoc: any; // consist of the result of the shared document
  addEmailChips = false
  sharedemails: any
  isEmail: boolean = false
  emailvalid: boolean = false
  expanded: boolean = false
  filepasswordcheck: boolean = true
  sharepasswordcheck: boolean = false
  emailCheck: Boolean = false;
  Sharetype: any;
  access_expirydate
  pin
  message
  placeshare
  testdata
  accessCode: any = [{ name: 'Download', value: 'Download' }, { name: 'Comment', value: 'Comment' }, { name: 'Version Access', value: 'VersionAccess' }, { name: 'Chat', value: 'Chat' }, { name: 'Heatmaps', value: 'heatmaps' }, { name: 'Video Record', value: 'VideoRecord' }];
  latitude: any
  longitude: any
  geocoder: any;
  platform: any
  filepassword: any
  submitted: Boolean = false;
  IpAddress
  fields //consist fieldvalues
  ///////////////////////////////////

  constructor(public dialogRef: MatDialogRef<SharepopupComponent>, public dialog: MatDialog, private documentService: DocumentService, private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public dailogdata: any, private router: Router, private dataservice: DataService, private generalService: GeneralService,private http: HttpClient) {
    this.dataservice.newMessageReceived().subscribe(data => {
      if (!this.dailogdata.multi) this.getSharedPeopleDocs();
    });

    this.filteredemail = this.elementctrl.valueChanges.pipe(startWith(null),
      map((x: any | null) => x ? this.filter(x) : this.alluseremails.slice()));
  }

  onNoClick(): void { this.dialogRef.close(false); }

  ngOnInit() {
    this.IpAddress = JSON.parse(localStorage.getItem('mylocation'));
    if(this.dailogdata.content.isFolder) this.folderChecking(this.dailogdata.content._id)
    if (!this.dailogdata.title) this.Sharetype = 'Review';// if title is not present ,sharetype is setted to review    
    if (this.dailogdata.title) this.Sharetype = this.dailogdata.title; // if title is present ,sharetype is setted to Signature
    this.access = 'Allowusers';
    this.shareAccess.push('Download', 'Comment');   // default share access options
    this.minDate = new Date();
    this.getAllUsers();
    if (!this.dailogdata.multi) this.getSharedPeopleDocs();
    if (this.dailogdata.title) setTimeout(() => { this.getUserDocList(); }, 1000);
    else this.getUserDocList();
    ////////////////    Map        ////////////////
    this.platform = new H.service.Platform({
      "app_id": 'xeeSniVGFJguQieOyDvg',
      "app_code": 'CYXw3RyDsetaa5pSVf3EAw',
      useHTTPS: true
    });
    this.geocoder = this.platform.getGeocodingService();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      }, error => {
        this.documentService.openSnackBar("Your Location is Blocked, please Allow for security reasons", "X")

        // var locationdata = JSON.parse(localStorage.getItem('mylocation'));
        this.latitude = undefined;
        this.longitude =undefined;
      });
    }
    
    this.IpAddress=JSON.parse(localStorage.getItem('myip'));
    var data=localStorage.getItem('ipaddress')
     if(!this.IpAddress) this.IpAddress=this.userService.decryptData(data)
  }
  //checking of folder whether folder contain files or not
  folderChecking(folderId) {
    this.documentService.getFolderFiles(folderId).subscribe((data: any) => {
      console.log(data.length)
      if (data.length == 0) {
        let dialogRef = this.dialog.open(CommonDialogComponent,
          { data: { title: 'dependency', name: 'dependency', content: "Folder doesn't contain any files!" }, width: '500px', panelClass: 'deletemod', disableClose: true });
        dialogRef.afterClosed().subscribe(res => {
          if (res) {
          }
        })
      }
    }, error => {
    })
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  getAddEmailChips() {
    if (this.dailogdata.emails) {
      this.addEmailChips = true
      this.dailogdata.emails.forEach(element => {
        element.email = element.email;
        var present = (this.sharedPeople.some(x => x.toemail == element.email));
        if (!present) {
          if (this.registeredusers) var register = (this.registeredusers.find(x => (x.email) == (element.email)))
          if (register) {
            if (register.type == "organisation") this.users.push({ email: register.email, _id: register._id, name: register.companyname })
            else if (register.type == "individual") this.users.push({ email: register.email, _id: register._id, name: register.name })
            else this.users.push({ email: register.email, _id: register._id, name: register.fname + ' ' + register.lname })
          }
          else this.users.push({ email: element.email, name: element.email });
        }
      });
    }
  }

  // to get the userlist from the document based upon the feilds
  getUserDocList() {
    console.log(this.dailogdata,"|||||||||||||")
    if (!this.dailogdata.multi) {
      console.log(this.dailogdata.content,"/ppppppppp")
      this.documentService.getCurrentVersionDocFieldWithValues({ documentid: this.dailogdata.content._id, versionid: this.dailogdata.content.versionid }).subscribe(response => {
        this.userDoc = response;
        console.log(this.userDoc)
        // console.log(this.userDoc.length , 0)
        if (((this.userDoc && this.userDoc.length == 0) || !this.userDoc) && this.Sharetype == 'Signature') {
          // console.log(this.userDoc.
        
          this.addFeildsPopUp();
        }
        if (this.userDoc)
          this.userDoc.forEach(docs => {
            if (docs.people) if (!this.userDocList.some(x => x == docs.people)) this.userDocList.push(docs.people);
          });
      });
    }
  }

  // gets the shared people of particular document
  getSharedPeopleDocs() {
    this.documentService.getsharingpeople(this.dailogdata.content).subscribe(data => {
      this.sharedPeople = data;
      console.log(this.sharedPeople)
      this.sharedPeople.forEach(element => {
        element.difference = moment(element.created_at).fromNow();
        if (element.toid && element.toid.type && element.toid.type == "individual") element.name = element.toid.name;
        else if (element.toid && element.toid.type && element.toid.type == 'organisation') element.name = element.toid.companyname;
        else if (element.toid && element.toid.type && element.toid.type == 'employee') element.name = element.toid.fname + ' ' + element.toid.lname;
        else { element.name = element.toemail.split('@')[0]; }
        element.shareAccess = [];
        if (element.Download) element.shareAccess.push('Download');
        if (element.comment) element.shareAccess.push('Comment');
        // if (element.Copy) element.shareAccess.push('Copy');
        if (element.VersionAccess) element.shareAccess.push('VersionAccess');
        if (element.VideoRecord) element.shareAccess.push('VideoRecord');
        if (element.heatmaps) element.shareAccess.push('heatmaps');
        if (element.Chat) element.shareAccess.push('Chat');
        if (element.edit) element.shareoption = 'Edit'
        if (element.view) element.shareoption = 'View'
        if (element.comment) element.shareoption = 'Comment';
        if (element.view) element.Sharetype = 'Review';
        if (element.edit) element.Sharetype = 'Signature';
        if(this.dailogdata.SharedRecordEdit && element._id == this.dailogdata.SharedRecordEdit._id) {
          setTimeout(() => {
            let id='icon_cross_'+ this.dailogdata.SharedRecordEdit._id
          document.getElementById(id).click()
          document.getElementById('targetid').click()
        }, 10);
          
          // $('#icon_cross_'+element._id).click();
        }
      });
    });
  }

  // get the all shared people of user
  getAllSharedPeople() {
    this.documentService.getSharePeopleEmails().subscribe(data => {
      this.sharedemails = data
      this.getAddEmailChips();
      this.sharedemails.forEach(element => {
        if (this.registeredusers.length > 0) {
          var check = this.registeredusers.find(x => x.email == element.toemail);
          if (check) {
            if (this.alluseremails.length == 0) this.alluseremails.push({ email: element.toemail, _id: check._id, name: check.name });
            if (this.alluseremails.length > 0) {
              var shared = (this.alluseremails.some(x => x.email == element.toemail));
              if (!shared) {
                if (check.type == "organisation") this.alluseremails.push({ email: element.email, _id: check._id, name: check.companyname });
                else if (check.type == "individual") this.alluseremails.push({ email: check.email, _id: check._id, name: check.name });
                else this.alluseremails.push({ email: check.email, _id: check._id, name: check.fname + ' ' + check.lname });
              }
            }
          }
          else {
            if (this.alluseremails.length > 0) {
              var shared = (this.alluseremails.some(x => x.email == element.toemail));
              if (!shared) this.alluseremails.push({ email: element.toemail, name: element.toemail });
            }
            if (this.alluseremails.length == 0) this.alluseremails.push({ email: element.toemail, name: element.toemail });
          }
        }
      });
    })
  }

  //get list of all users
  getAllUsers() {
    this.documentService.getSearch('users/getUsers').subscribe(data => {
      this.registeredusers = data
      this.getAllSharedPeople();
    });
  }

  shareDoc = async function (formFeilds) {
    this.submitted = true;    
    console.log(formFeilds.value)
    console.log(formFeilds.value.access)
    console.log(this.users)
    var notregisterPeople = []
    await this.users.forEach(element => {
      var register = (this.registeredusers.find(x => (x.email) == (element.email)))
      console.log(register)
      if (register == undefined && formFeilds.value.access == 'Allowusers') {
        notregisterPeople.push(element.email)
      }
    });
    console.log(notregisterPeople)
    if (notregisterPeople.length > 0 && !this.emailvalid) {
      const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
        { data: { name: 'notregister', userarray: notregisterPeople }, width: '500px', panelClass: 'deletemod' ,disableClose: true });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        if (result) {
          if (this.Sharetype == "Review" && !this.dailogdata.multi) this.Share_for_Review(formFeilds);
          if (this.Sharetype == 'Signature' && !this.dailogdata.multi) this.sharing(formFeilds);
          if (this.Sharetype == "Review" && this.dailogdata.multi) this.multi_Share_for_Review(formFeilds);
        }
      })
    }
    else
    {
      if (this.Sharetype == "Review" && !this.dailogdata.multi) this.Share_for_Review(formFeilds);
      if (this.Sharetype == 'Signature' && !this.dailogdata.multi) this.sharing(formFeilds);
      if (this.Sharetype == "Review" && this.dailogdata.multi) this.multi_Share_for_Review(formFeilds);
    }
     

  }

  //Sharing for signature
  sharing = async function (form) {
   
    var profileInfo;
    this.sharepasswordcheck = false;
    if (this.pin) if (!this.filepassword) this.sharepasswordcheck = true;
    //check user exists or not ========================================================================================
    if (this.users.length > 0) {
      //password field check ========================================================================================
      if (!this.sharepasswordcheck) {
        //check for versionid present or not ========================================================================================
        if (this.dailogdata.content.versionid) {
          this.documentService.getCurrentVersionDocFieldOptions({ documentid: this.dailogdata.content._id, versionid: this.dailogdata.content.versionid }).subscribe(currentVersionDocFieldOptions => {
            this.currentVersionDocFieldOptionsResult = currentVersionDocFieldOptions;
            //======================//if versionid //======================================================================//
            if (this.currentVersionDocFieldOptionsResult && this.currentVersionDocFieldOptionsResult.fields.length) {
              this.fields = this.currentVersionDocFieldOptionsResult.fields;
              // this.requiredFieldsCount=this.fields.filter(field => field.required && field.people && field.people == this.sharedRecord.toemail)
              form.value.title = this.Sharetype;
              form.value.access = this.access;
              if (form.value.shareAccess) {
                form.value.shareAccess.forEach(element => {
                  if (element) form.value[element] = true;
                });
              }
              if (this.filepassword) { form.value.filepassword = this.filepassword }
                form.value.user = this.users;
                this.formSubmitted = true;
                if (this.dailogdata.content.isFile) {
                  form.value.fileid = this.dailogdata.content
                  form.value.fileencryptedid = this.dailogdata.content.encryptedid
                }
                else form.value.folderid = this.dailogdata.content;
                // form.value.access_expirydate = this.access_expirydate;
                // if(form.value.access_expirydate) form.value.access_expirydate = this.access_expirydate.setMinutes(this.access_expirydate.getMinutes());
                if (this.users.length > 0 && !this.emailvalid) {
                  this.isEmail = false
                  this.formSubmitted = false;
                  this.dailogdata.content.isSent = true
                  this.documentService.updatefolder(this.dailogdata.content).subscribe(data => { })
                  form.value.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '
                  this.documentService.sharing(form.value).subscribe(data => {
                    this.sharingdoc = data
                    this.submitted = false;
                    this.dialogRef.close(data);
                    this.documentService.openSnackBar("Shared Successfully", "X");
                    this.documentService.getsharingpeople(this.dailogdata.content).subscribe(data => {
                      if(data[0].fileid.status == "Waiting for Sign" || data[0].fileid.status == "Review" || data[0].fileid.status == "upload")
                      data[0].fileid.status = "Waiting for Sign"
                      else if(data[0].fileid.status == 'Partially completed' || data[0].fileid.status == 'Completed'  )
                      data[0].fileid.status = "Partially completed"
                      this.documentService.updatefolder(data[0].fileid).subscribe(updatedData => { });
                    })
                    //create notification
                    profileInfo = JSON.parse(localStorage.getItem('currentUser'));
                    if (profileInfo) var fromemail = this.userService.decryptData(profileInfo.email);
                    this.sharingdoc.forEach(element => {
                      const result = {
                        fromid: element.fromid,
                        fromemail: fromemail,
                        toid: element.toid ? element.toid : null,
                        toemail:element.toemail,
                        sharingPeopleId: element._id,
                        documentid: element.fileid, 
                        type: 'Shared',
                      }
                      if (element.toemail) this.generalService.createnotification(result).subscribe(response => { 
                        console.log(response)
                      });
                      if (element.toid) var toid = element.toid;
                      //create mouse 
                      var mousedata = {
                        uid: element.fromid,
                        documentid: element.fileid,
                        folderid: element.folderid,
                        message: "Shared",
                        toemail:element.toemail,
                        toid: toid,
                        email: element.fromid?element.fromid.email:undefined,
                        isFile: true,
                        latitude: this.latitude,
                        longitude: this.longitude,
                        IpAddress:(this.IpAddress)? this.IpAddress.ip : ' '
                      }
                      this.documentService.savemousemovement(mousedata).subscribe(data => { });
                    });
                  });
                }
                else {
                  setTimeout(() => {       
                    this.emailvalid = true;
                    this.submitted = false;
                    if (this.users.length > 0 && this.addEmailChips) {
                      this.submitted = true;
                      this.emailvalid = false
                      this.isEmail = false
                      this.formSubmitted = false;
                      var shareacc = false
                      this.dailogdata.content.isSent = true
                      this.documentService.updatefolder(this.dailogdata.content).subscribe(data => { })
                      form.value.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '
                      this.documentService.sharing(form.value).subscribe(data => {
                        this.dialogRef.close(data);
                        this.documentService.openSnackBar("Shared Successfully", "X");
                        this.submitted = false;
                        this.documentService.getsharingpeople(this.dailogdata.content).subscribe(data => {
                          if(data[0].fileid.status == "Waiting for Sign" || data[0].fileid.status == "Review" || data[0].fileid.status == "upload")
                          data[0].fileid.status = "Waiting for Sign"
                          else if(data[0].fileid.status == 'Partially completed' || data[0].fileid.status == 'Completed'  )
                          data[0].fileid.status = "Partially completed"
                          this.documentService.updatefolder(data[0].fileid).subscribe(updatedData => { });
                        })
                        this.sharingdoc = data
                        //create notification
                        profileInfo = JSON.parse(localStorage.getItem('currentUser'));
                        if (profileInfo) var fromemail = this.userService.decryptData(profileInfo.email);
                        this.sharingdoc.forEach(element => {
                          const result = {
                            fromid: element.fromid,
                            fromemail: fromemail,
                            toid: element.toid,
                            sharingPeopleId: element._id,
                            documentid: element.fileid,
                            type: 'Shared',
                          }
                          if (element.toid) this.generalService.createnotification(result).subscribe(response => { });
                          if (element.toid) var toid = element.toid;
                          //create mouse movement
                          var mousedata = {
                            uid: element.fromid,
                            documentid: element.fileid,
                            folderid: element.folderid,
                            message: "Shared",
                            toemail:element.toemail,
                            toid: toid,
                            email: element.fromid?element.fromid.email:undefined,
                            isFile: true,
                            latitude: this.latitude,
                            longitude: this.longitude,
                            IpAddress:(this.IpAddress)? this.IpAddress.ip : ' '
                          }
                          this.documentService.savemousemovement(mousedata).subscribe(data => { });
                        });
                      });
                    }
                  }, 1000);

                }
            } else {
              this.submitted = false;
              var filedata={
                fileid:this.dailogdata.content._id
              }
              this.documentService.encryptedvalues(filedata).subscribe((data:any)=>{
              this.router.navigate(['filecont/'+data.encryptdata]);
              this.documentService.openSnackBar("add fields in document", "X");
              this.dialogRef.close(false);
              })
            }
          })
        } else {
          var filedata={
            fileid:this.dailogdata.content._id
          }
          this.submitted = false;
          this.documentService.encryptedvalues(filedata).subscribe((data:any)=>{
            this.router.navigate(['filecont/'+data.encryptdata]);
          this.dialogRef.close(false);
          })
        }
      }
      else { this.submitted = false; }
    }
    else { this.emailvalid = true; this.submitted = false; }
  }

  //Email autoselecte filter
  displayFn(user?: User): string | undefined {
    return user ? user.email : undefined;
  }

  // filer for matchips
  filter(value: any): any[] {
    return this.alluseremails.filter(x => x.email && x.email.toLowerCase().includes(value.toLowerCase()));
  }
  revoke(data) {
    this.testdata = data
  }

  // update the sharedpeople access
  savechanges = async function(shareEditForm) {
    console.log(shareEditForm)
    var status
    if (shareEditForm.Sharetype == "Signature" && shareEditForm.fileid.status == 'Completed' || shareEditForm.fileid.status == 'Partially completed') {
      await this.documentService.getSharedDoc(shareEditForm._id).subscribe(async (data: any) => {
        if (data.view) {
          var statusemail = []
          var filledFieldCount = 0

          if (this.sharedPeople.length && this.userDoc.length)
            if (this.sharedPeople.length == 1) status = 'Waiting for Sign'
            else {
              await this.userDoc.forEach(function (field) {
                var unique = true;
                console.log(field)
                if (field.insertedemail) {
                  statusemail.forEach(function (email) {
                    if (_.isEqual(field.insertedemail, email)) unique = false;
                  });
                  if (unique) statusemail.push(field.insertedemail)
                  if (field.value || field.signatureId || field.stampId || field.photoId)
                    filledFieldCount++
                }
              });
              console.log(statusemail, this.userDoc)
              var fieldsExceptLabel = this.userDoc.filter(field => field.type != 'label')
              if (fieldsExceptLabel.length != filledFieldCount && statusemail.length > 0)
                status = 'Partially completed'
              else if (fieldsExceptLabel.length == filledFieldCount)
                status = 'Completed'
              else
                status = 'Waiting for Sign'
            }
          console.log(status)
          this.documentService.updatefolder({ _id: shareEditForm.fileid._id, status: status }).subscribe(updatedData => { });
        }
      })
    }
    if (this.testdata) {
      shareEditForm.revoke = this.testdata
    }
    if (shareEditForm.Sharetype) shareEditForm.title = shareEditForm.Sharetype;
    this.accessCode.forEach(code => {
      if (shareEditForm.shareAccess.some(x => x == code.value)) shareEditForm[code.value] = true;
      else shareEditForm[code.value] = false;
    });
    if (shareEditForm.pin) {
      if (shareEditForm.filepassword == undefined || shareEditForm.filepassword == "") {
        shareEditForm.passwordcheck = true
        this.filepasswordcheck = false
      }
      else shareEditForm.passwordcheck = false;
    }
    else shareEditForm.filepassword = undefined;
    if (!shareEditForm.passwordcheck) {
      console.log(shareEditForm)
      this.documentService.sharingupdate(shareEditForm).subscribe(data => {
        shareEditForm.revokeStatus = null
        this.documentService.openSnackBar("changes are updated", "X");
      })
    }
  }

  //Remove the Shared file
  RemoveShareduser(doc) {
    console.log(doc,this.fields)
    var deleteDoc = true;
    if (this.userDocList.some(x => x == doc.toemail)) deleteDoc = false;
    if (deleteDoc) {
      const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
        { data: { name: 'delete1' }, width: '500px', panelClass: 'deletemod' ,disableClose: true });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        if (result) {
          this.documentService.RemoveShareduser(doc).subscribe(data => {
            this.expanded = false
          //   console.log(this.fields.some(x => x.insertedemail == doc.toemail)) 
          //   if(this.sharedPeople.length == 1) doc.fileid.status = 'upload'
          //   else  doc.fileid.status = 'Partially completed'
          // this.documentService.updatefolder(doc.fileid._id).subscribe(updatedData => { });

            this.documentService.openSnackBar("Shared email removed the access on document", "X");
          });
          this.sharedPeople.splice(this.sharedPeople.indexOf(doc), 1);
          if (this.sharedPeople.length==0) {
            let docData={_id:this.dailogdata.content._id, isSent:false}
            // this.selectedDoc.status = 'upload'
            this.documentService.updatefolder(docData).subscribe(resp => {
              console.log(resp)
            })
          }
        }
      });
    }
    else {
      let dialogRef22 = this.dialog.open(CommonDialogComponent,
        { data: { name: 'fields', cancel: false, content: doc.name + " has assigned with field, you can't delete it." }, width: '500px', panelClass: "deletemod" ,disableClose: true});
      dialogRef22.afterClosed().subscribe(res1 => {
        dialogRef22.close();
      });
    }
  }

  ///mat chip adding email address
  add(event: MatChipInputEvent): void {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/);
    const input = event.input;
    const value = event.value;
    this.emailvalid = false;
    console.log(value)
    if (!this.matAutocomplete.isOpen) {
      if ((value || '').trim()) {
        // if (this.profileData.email == value) {        //// to check whether it matches with profile email
        //   this.documentService.openSnackBar("you can't share the document to yourself", "X");
        //   input.value = '';
        // }
        // else {
        if (event.value) {
          if (!(regexp.test(event.value))) { this.emailvalid = true }     ///to check whether it satisfies reqular expression
          else {
            this.emailvalid = false
            // console.log(this.sharedPeople[0].toemail.length,value.length)
            var present = (this.users.some(element => element.email == event.value))  //to check already exists in array
            if (!this.dailogdata.multi) {
              if (!present) present = (this.sharedPeople.some(element => element.toemail == event.value))
              if (!present) {
                this.isEmail = false
                var register = (this.registeredusers.find(element => element.email == event.value)) //checking registered user or not
                if (register != undefined) {
                  if (register.type == "organisation") this.users.push({ name: register.companyname, email: register.email, _id: register._id });
                  else if (register.type == "individual") this.users.push({ name: register.name, email: register.email, _id: register._id });
                  else this.users.push({ name: register.fname + ' ' + register.lname, email: register.email, _id: register._id })
                }
                else {
                  this.users.push({ name: event.value, email: event.value })
                }
              }
            }
            else {
              if (!present) {
                this.isEmail = false
                var register = (this.registeredusers.find(element => element.email == event.value)) //checking registered user or not
                if (register != undefined) {
                  if (register.type == "organisation") this.users.push({ name: register.companyname, email: register.email, _id: register._id });
                  else if (register.type == "individual") this.users.push({ name: register.name, email: register.email, _id: register._id });
                  else this.users.push({ name: register.fname + ' ' + register.lname, email: register.email, _id: register._id })
                }
                else {
                  this.users.push({ name: event.value, email: event.value })
                }
              }
            }
            // Reset the input value
            if (input) input.value = '';
            this.elementctrl.setValue(null);
            // }
          }
        }
      }
    }
  }

  ///mat chip removing email address
  remove(email, indx): void {
    this.users.splice(indx, 1)
  }

  //Edit form selectall Function
  selectallcheckbox(value, i) {
    if (value) {
      i.Download = true
      i.Chat = true
      i.VideoRecord = true
      i.heatmaps = true
      i.VersionAccess = true
      // i.Copy = true
      i.comment = true
    }
    else {
      i.Download = false
      i.Chat = false
      i.VideoRecord = false
      i.heatmaps = false
      i.VersionAccess = false
      // i.Copy = false
      i.comment = false
    }
  }

  // in matchips,dropdown select
  selected(event: MatAutocompleteSelectedEvent): void {
    var viewValue = event.option.viewValue.split(/[<,>]+/)
    console.log(viewValue)
    if (!this.dailogdata.multi) {
      var shared = (this.sharedPeople.some(element => element.toemail == viewValue[1]))
      console.log(shared)
      if (!shared) {
        var present = (this.users.some(element => element.email == viewValue[1]))
        var oldpresent = (this.sharedPeople.some(element => element.toemail == viewValue[1]));
        if (!present && !oldpresent) {
          this.isEmail = false
          this.users.push({ name: viewValue[0], email: viewValue[1], _id: event.option.value })
        }
        console.log(oldpresent)
        if (oldpresent) this.documentService.openSnackBar('Already document has been shared', "X");
      }
      if (shared) {
        this.expanded = true
        this.documentService.openSnackBar('Already document has been shared', "X");
      }
    }
    else {
      var present = (this.users.some(element => element.email == viewValue[1]))
      this.users.push({ name: viewValue[0], email: viewValue[1], _id: event.option.value })
    }
    this.userEmail.nativeElement.value = '';
    this.elementctrl.setValue(null);
  }

  //Sharing For Review
  Share_for_Review = function (form) {
    // this.submitted = true;
    var profileInfo;
    this.sharepasswordcheck = false;
    form.value.title = this.Sharetype;
    form.value.user = this.users;
    form.value.access = this.access;
    this.emailvalid = false;
    if (form.value.shareAccess) {
      form.value.shareAccess.forEach(element => {
        if (element) form.value[element] = true;
      });
    }
    this.formSubmitted = true;
    if (this.dailogdata.content.isFile) {
      form.value.fileid = this.dailogdata.content
      form.value.fileencryptedid = this.dailogdata.content.encryptedid
    }
    else form.value.folderid = this.dailogdata.content;
    console.log(form.value.folderid)
    if (form.value.access_expirydate) form.value.access_expirydate = this.access_expirydate;
    if (this.pin) if (!this.filepassword) this.sharepasswordcheck = true;
    if (this.filepassword) { form.value.filepassword = this.filepassword }
    // if (this.sharepasswordcheck == true) this.documentService.openSnackBar('Please enter a password to share', "X");
    if (this.users.length > 0) {
      if (this.sharepasswordcheck == false) {
        this.isEmail = false
        this.dailogdata.content.isSent = true
        this.documentService.updatefolder(this.dailogdata.content).subscribe(data => { })
       form.value.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '
        this.documentService.sharing(form.value).subscribe(data => {
          this.submitted = false;
          this.sharingdoc = data
          this.dialogRef.close(data);
          this.documentService.openSnackBar("Shared Successfully", "X");
          this.documentService.getsharingpeople(this.dailogdata.content).subscribe(data => {
            if (data[0].fileid ) {
              if(data[0].fileid.status == "Waiting for Sign" || data[0].fileid.status == "Review"  || data[0].fileid.status == "upload")
              data[0].fileid.status = "Review"
              else if(data[0].fileid.status == 'Partially completed' || data[0].fileid.status == 'Completed'  )
              data[0].fileid.status = "Partially completed"
              this.documentService.updatefolder(data[0].fileid).subscribe(updatedData => { });
            }
          })
          //create notification
          profileInfo = JSON.parse(localStorage.getItem('currentUser'));
          if (profileInfo) var fromemail = this.userService.decryptData(profileInfo.email);
          this.sharingdoc.forEach(element => {
            var result = {
              fromid: element.fromid,
              fromemail: fromemail,
              toid: element.toid,
              sharingPeopleId: element._id,
              documentid: element.fileid,
              folderid: element.folderid,
              type: 'Shared'
            }
            if (element.toid) this.generalService.createnotification(result).subscribe(response => { });
            if (element.toid) var toid = element.toid;
            //create mouse movement
            var mousedata = {
              uid: element.fromid,
              documentid: element.fileid,
              folderid: element.folderid,
              message: "Shared",
              toid: toid,
              toemail:element.toemail,
              email: element.fromid?element.fromid.email:undefined,
              isFile: element.fileid ? true : undefined,
              isFolder: element.folderid ? true : undefined,
              latitude: this.latitude,
              longitude: this.longitude,
              IpAddress:(this.IpAddress)? this.IpAddress.ip : ' '
            }
            this.documentService.savemousemovement(mousedata).subscribe(data => { });
          });
        });
      }
      else this.submitted = false;
    }
    else {
      this.submitted = false;
      this.emailvalid = true;
    }
  }

  //Multishare for review
  multi_Share_for_Review(form) {
    // this.submitted = true;
    var profileInfo;
    this.sharepasswordcheck = false;
    form.value.title = this.Sharetype;
    form.value.user = this.users;
    form.value.access = this.access;
    form.value.file = this.dailogdata.content.files;
    form.value.folder = this.dailogdata.content.folders;
    this.emailvalid = false;
    if (form.value.shareAccess) {
      form.value.shareAccess.forEach(element => {
        if (element) form.value[element] = true;
      });
    }
    if (form.value.access_expirydate) form.value.access_expirydate = this.access_expirydate;
    if (this.pin) if (!this.filepassword) { this.sharepasswordcheck = true; this.submitted = false; }
    if (this.filepassword) { form.value.filepassword = this.filepassword }
    // if (this.sharepasswordcheck == true) this.documentService.openSnackBar('Please enter a password to share', "X");
    if (this.users.length > 0) {
      if (this.sharepasswordcheck == false) {
        this.isEmail = false
        form.value.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '
       this.documentService.multisharing(form.value).subscribe(data => {
          this.submitted = false;
          this.sharingdoc = data;
          this.dialogRef.close(data);
          this.documentService.openSnackBar("Shared Successfully", "X");
          //create notification
          profileInfo = JSON.parse(localStorage.getItem('currentUser'));
          if (profileInfo) var fromemail = this.userService.decryptData(profileInfo.email);
          this.sharingdoc.forEach(element => {
            var result = {
              fromid: element.fromid,
              fromemail: fromemail,
              toid: element.toid,
              sharingPeopleId: element._id,
              documentid: element.fileid,
              folderid: element.folderid,
              type: 'Shared'
            }
            if (element.toid) this.generalService.createnotification(result).subscribe(response => { });
            if (element.toid) var toid = element.toid;
            //create mouse movement
            var mousedata = {
              uid: element.fromid,
              documentid: element.fileid,
              folderid: element.folderid,
              message: "Shared",
              toid: toid,
              toemail:element.toemail,
              email: element.fromid?element.fromid.email:undefined,
              isFile: element.fileid ? true : undefined,
              isFolder: element.folderid ? true : undefined,
              latitude: this.latitude,
              longitude: this.longitude,
              IpAddress:(this.IpAddress)? this.IpAddress.ip : ' '
            }
            this.documentService.savemousemovement(mousedata).subscribe(data => { });
          });
        })
      }
    }
    else {
      this.submitted = false;
      this.emailvalid = true;
    }
  }

  // if sharetype option is changed (review or signature)
  Radiochange(Sharetype) {
    if (Sharetype == 'Review') this.dailogdata.title = "Review";
    if (Sharetype == 'Signature') {
      this.dailogdata.title = "Signature";
      setTimeout(() => {
        if ((this.userDoc && this.userDoc.length == 0) || !this.userDoc) this.addFeildsPopUp();
      }, 1000);
    }
  }

  shareRadioChange(info, title) {
    if (title == 'Signature') {
      setTimeout(() => {
        if ((this.userDoc && this.userDoc.length == 0) || !this.userDoc) this.addShareFeildsPopUp(info);
      }, 10);
    }
  }

  // in signature mode if feilds r not present ,popup.
  addFeildsPopUp() {
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents' }, width: '500px', panelClass: "deletemod" ,disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      var filedata={
        fileid:this.dailogdata.content._id
      } 
      this.documentService.encryptedvalues(filedata).subscribe((data:any)=>{
      if (res) { this.dialogRef.close(false);  this.router.navigate(['filecont/'+data.encryptdata]); }
      else { this.Sharetype = "Review"; this.dailogdata.title = "Review"; }

        })
          });
  }

  // to check the document has fields or not while changing mode for shared people
  addShareFeildsPopUp(i) {
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents in Signature mode' }, width: '500px', panelClass: "deletemod" ,disableClose: true});
    dialogRef.afterClosed().subscribe(res => {
       var filedata={
         fileid:this.dailogdata.content._id
       }
       this.documentService.encryptedvalues(filedata).subscribe((data:any)=>{
        if (res) { this.dialogRef.close(false); this.router.navigate(['filecont/'+data.encryptdata]); }
        else i.Sharetype = "Review";
       })
     
    });
  }

  revokeFun(i) {
    if (i.revoke) 
    {
      var revokeStatus = 'Un Revoke'
      i.revokeStatus = 'Un Revoke'
    }
    else 
    {
      var revokeStatus = 'Revoke'
      i.revokeStatus = 'Revoke'
    }
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Are you sure want to ' + revokeStatus + ' the Sharing' }, width: '500px', panelClass: "deletemod" ,disableClose: true });
    dialogRef.afterClosed().subscribe(res => {
      if (res) i.revoke = !i.revoke
    });

  }
  //Getting document password
  getDocPassword(data)
  {
    data.title = 'getpassword'
    this.documentService.getSearch('sharingpeoples/checkpassword/' + data._id + '/' + data.filepassword + '/'+data.title).subscribe(passworddata => {
      data.filepassword = passworddata 
    })
  }

}
export interface User {
  email: string;
  _id: string;
  shareoption: string
}

export interface DialogData {
  title: string;
  content: string;
}