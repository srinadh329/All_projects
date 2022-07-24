import { Component, OnInit, Inject, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { OrganizationService } from '../organization.service';
import { FormControl, NgModel } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentService } from '../document.service';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { FormBuilder, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import * as _moment from 'moment';
import * as _ from 'lodash'
import { SharepopupComponent } from '../sharepopup/sharepopup.component';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
import { Router } from "@angular/router";
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import {Overlay} from '@angular/cdk/overlay'
const moment = (_moment as any).default ? (_moment as any).default : _moment;
declare var H: any;
@Component({
  selector: 'app-organization-file-sharing',
  templateUrl: './organization-file-sharing.component.html',
  styleUrls: ['./organization-file-sharing.component.css']
})




export class OrganizationFileSharingComponent implements OnInit, OnDestroy, AfterViewInit {

  stateForm: FormGroup = this.fb.group({
    stateGroup: '',
  });



  stateGroupOptions: Observable<StateGroup[]>;


  stateGroups: any = []

  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('fruitInput') fruitInput: ElementRef;
  @ViewChild('mySelect') mySelect;

  private _onDestroy = new Subject<void>();
  organisation: boolean = false
  individual: boolean = false
  selectall = true
  hlevelad: boolean;
  individualclick: boolean
  organisationclick: boolean
  departments = []
  departmentlevels = []
  employees: any
  updatedepartment :boolean = false // For open the depatment edit
  employees1: any
  employeevalues = []
  employeedata: any = []
  employeedata1: any = []
  access = 'Allowusers'
  shareoption = 'View'
  // employee = new FormControl();
  sharedwith: any
  allDepartments: any
  SharedDepartments = []
  Sharedpeople: any
  user: any;
  hlevel: any;
  dept: any
  filteredemail: Observable<any[]>;
  elementctrl = new FormControl();
  alluseremails: any = []
  useremail: any = [];
  employeeemail: any = []
  accessexpiry
  shareAccess = [] // stores the list of share access to particular user
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selected1
  userDoc: any;  // consists of current version document
  currentVersionDocFieldOptionsResult
  filteredvalue: any[] = [
  ];
  pen = true
  showselection = false;
  sharedata: any
  fields: any
  isloading = false // For loading purpose
  /////////////////////////////
  title: any;
  Sharetype: any
  latitude: any
  longitude: any
  geocoder: any;
  platform: any
  sharingdoc :any
  userDocList: any = []; // consists of list of feilds assigned user in document
  IpAddress
  minDate
  accesmodeList: any = [{ name: 'Download', value: 'Download' }, { name: 'Comment', value: 'Comment' }, { name: 'Version Access', value: 'VersionAccess' }, { name: 'Chat', value: 'Chat' }, { name: 'Heatmaps', value: 'heatmaps' }, { name: 'Video Record', value: 'VideoRecord' }];
  constructor(private router: Router, private fb: FormBuilder, private userservice: UserService, private dialog: MatDialog, private documentservice: DocumentService, private organizationService: OrganizationService, public dialogRef: MatDialogRef<OrganizationFileSharingComponent>, @Inject(MAT_DIALOG_DATA) public dailogdata: any, private generalService: GeneralService,private http: HttpClient,private overlay: Overlay) {
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }

  selectTypeIndividual() {
    this.dialogRef.close("true");
    setTimeout(() => {
      $('body').css("overflow", "hidden");
}, 100);
    let dialogRef = this.dialog.open(SharepopupComponent, {
      width: '848px',
      disableClose: false,
      autoFocus: false,
      panelClass: "orgn",
      scrollStrategy: this.overlay.scrollStrategies.block(),
      // data:{content:this.dailogdata.content,text:'sharedperson',multi:this.dailogdata.multi}
      data: this.dailogdata
    });
    dialogRef.afterClosed().subscribe(res => {
      setTimeout(() => {
        $('body').css("overflow", "auto");
  
     
      }, 10);
    });

  }
  selectTypeOrganization() {
    // if (this.dailogdata.multi) this.documentservice.openSnackBar('Multiple share for departments is not applicable', 'x'), this.dialogRef.close();

    // if (!this.dailogdata.multi) 
    this.title = 'Organisation';
  }

  //  closeModel1() 
  //  {
  //   this.organisation = false;
  //   this.individual = false
  //   document.getElementById("sharepopio").click();    
  //  }
  ngOnInit() {
    this.IpAddress = JSON.parse(localStorage.getItem('mylocation'));
    this.minDate = new Date();
    if (this.dailogdata.SharedRecordEdit) { // For editing the organization shared emails
      this.title = 'Organisation';
      this.isloading = true
    }
    this.shareAccess.push('Download','Comment');   // default share access options
    if (!this.dailogdata.title) this.Sharetype = 'Review';// if title is not present ,sharetype is setted to review    
    if (this.dailogdata.title) this.Sharetype = this.dailogdata.title; // if title is present ,sharetype is setted to Signature
    this.getAllDepartments();
    if (this.dailogdata.title) setTimeout(() => { this.getUserDocList(); }, 100);
    else this.getUserDocList();
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
        this.documentservice.openSnackBar("Your Location is Blocked please Allow for security reasons", "X")

        // var locationdata = JSON.parse(localStorage.getItem('mylocation'));
        this.latitude =  undefined;
        this.longitude =  undefined;
      });
    }
    
    
  
    this.IpAddress=JSON.parse(localStorage.getItem('myip'));
    var data=localStorage.getItem('ipaddress')

    if(!this.IpAddress) this.IpAddress=this.userservice.decryptData(data)
  }

  getAllDepartments() {
    this.organizationService.getDepartments().subscribe(data => {

      this.allDepartments = data

      if (this.dailogdata.multi) {
        this.departments = this.allDepartments
      }

      else {
        var depart = { allDepartmentss: this.allDepartments, document: this.dailogdata.content }
        this.getSharedDepartment(depart);
        this.getDeptEmloyee(this.allDepartments);
      }

      // this.documentservice.getsharingpeople(this.dailogdata.content).subscribe(data => {
      //   this.sharedwith=data
      //   this.allDepartments.forEach(element => {
      //     var found= this.sharedwith.some(x => x.departmentid._id == element._id);
      //     if(!found)this.departments.push(element)
      //     else this.SharedDepartments.push(element)
      //   });
      // })
    })
  }

  getDeptEmloyee(allDept) {
    allDept.forEach(dept => {
      this.organizationService.getShareable_employees(dept._id).subscribe(data => {
      });
    });
  }


  getSharedDepartment(depart) {
    this.organizationService.SharedWith_Departments(depart).subscribe(data => {
      this.sharedwith = data
      this.isloading = false
      this.allDepartments.forEach(element => {
        var found = this.sharedwith.some(x => x.department_id == element._id);
        if (!found) this.departments.push(element)
        else this.SharedDepartments.push(element)
      });
      if (this.sharedwith.length == 0) {
        if (document.getElementById('myback')) {
          document.getElementById('myback').click()
        }
      }
      if (!this.EnterFirstTime && this.dailogdata.SharedRecordEdit && this.dailogdata.SharedRecordEdit._id &&
        this.dailogdata.SharedRecordEdit.departmentid && this.dailogdata.SharedRecordEdit.departmentid._id) {
        var found = this.sharedwith.find(x => x.department_id == this.dailogdata.SharedRecordEdit.departmentid._id);
        if (found) {
          this.departmentdetail(found.Sharedwith);
          this.updatedepartment = true;
        }
      }
    });
  }

  private _filterGroup(value: string): StateGroup[] {

    if (value) {
      return this.stateGroups
        .map(group => ({ department_name: group.department_name, employees: _filter(group.employees, value) }))
        .filter(group => group.employees.length > 0);
    }

    return this.stateGroups;
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  accessmodechanges(mode) {
    this.employeevalues.forEach(element => {
      element.shareoption = mode
    })

  }

  shareaccesschanges(share) {
    this.employeevalues.forEach(element => {
      element.shareAccess = share
    })

  }

  accessoptionchanges(access) {
    this.employeevalues.forEach(element => {
      element.access = access
    })

  }

  expirydatechanges(expire) {

    var date = moment(expire);

    this.employeevalues.forEach(element => {
      element.access_expirydate = date._d
    })

    this.accessexpiry = date._d

  }


  passwordupdatechanges(pass) {
    this.employeevalues.forEach(element => {
      element.filepassword = pass
    })

  }
  messagechanges(msg) {
    this.employeevalues.forEach(element => {
      element.message = msg
    })

  }

  pinchange(pin) {

    this.employeevalues.forEach(element => {
      element.pin = pin
    })

  }

  Share(formFeilds) {
    console.log(this.departmenthierarchy)
    if(this.departmenthierarchy.length == 0) this.documentservice.openSnackBar("Please select department",'x')
    else{
      if (this.Sharetype == "Review" && !this.dailogdata.multi) this.Share_for_Review(formFeilds);
      if (this.Sharetype == 'Signature' && !this.dailogdata.multi) this.Sharetodepartment(formFeilds);
      if (this.Sharetype == "Review" && this.dailogdata.multi) this.multi_Share_for_Review(formFeilds);
    }

  }

  multi_Share_for_Review(Shareform) {
    this.departmentlevels = []
    var filepassword
    var allemployees: any = []
    var profileInfo

    var uniq = _.uniqBy(this.departmenthierarchy, 'value');
    if (this.departmenthierarchy.length > 1 && this.departmenthierarchy[0].value && this.departmenthierarchy[1].value && uniq.length != this.departmenthierarchy.length) this.documentservice.openSnackBar('Same department has been selected', 'x');
    else {

      this.employeedata = []

      this.employeevalues.forEach(element => {
        if (element.checkbox == true) {
          element.title = element.Sharetype
          this.employeedata.push(element)
        }

      })
      this.departmenthierarchy.forEach(element => {
        if (element.value) this.departmentlevels.push(element)
      })
      this.sharedata = {
        employees: this.employeedata,
        departmentlevels: this.departmentlevels,
      }
      this.sharedata.file = this.dailogdata.content.files;
      this.sharedata.folder = this.dailogdata.content.folders;
      this.sharedata.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '

      this.organizationService.multiShareto_Department(this.sharedata).subscribe(data => {
        this.sharingdoc=data
        this.dialogRef.close(true);
        this.documentservice.openSnackBar('Shared Successfully', 'x');

      })
      profileInfo = JSON.parse(localStorage.getItem('currentUser'));
      if (profileInfo) var fromemail = this.userservice.decryptData(profileInfo.email)
      this.sharingdoc.forEach(element => {
        const result = {
          fromid: element.fromid,
          fromemail: fromemail,
          toid: element.toid,
          toemail:element.toemail,
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
        this.documentservice.savemousemovement(mousedata).subscribe(data => { });
      });


    }

  }

  Share_for_Review = function (Shareform) {
   var profileInfo
    this.departmentlevels = []
    var filepassword
    var allemployees: any = []
console.log(this.departmenthierarchy)
    var uniq = _.uniqBy(this.departmenthierarchy, 'value');
    if (this.departmenthierarchy.length > 1 && this.departmenthierarchy[0].value && this.departmenthierarchy[1].value && uniq.length != this.departmenthierarchy.length) this.documentservice.openSnackBar('Same department has been selected', 'x');
    else {

      this.employeedata = []

      this.employeevalues.forEach(element => {
        if (element.checkbox == true) {
          element.title = element.Sharetype
          this.employeedata.push(element)
        }

      })
      this.departmenthierarchy.forEach(element => {
        if (element.value) this.departmentlevels.push(element)
      })
      this.sharedata = {
        employees: this.employeedata,
        departmentlevels: this.departmentlevels,
      }

      if (this.dailogdata.content.isFile) {
        this.sharedata.fileid = this.dailogdata.content
        this.sharedata.fileencryptedid = this.dailogdata.content.encryptedid
      }
      else this.sharedata.folderid = this.dailogdata.content;
      this.sharedata.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '

      this.organizationService.Shareto_Department(this.sharedata).subscribe(data => {
        profileInfo = JSON.parse(localStorage.getItem('currentUser'));
          if (profileInfo) var fromemail = this.userservice.decryptData(profileInfo.email)
      
        this.dialogRef.close(true); 
        data.forEach(element => {
          const result = {
            fromid: element.fromid,
            fromemail: fromemail,
            toid: element.toid,
            toemail:element.toemail,
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
          this.documentservice.savemousemovement(mousedata).subscribe(data => { });
        });
        this.documentservice.openSnackBar('Shared Successfully', 'x');
      })
    }

  }

  singleexpirydatechanges(i, value) {

    var date = moment(value);
    this.employeevalues[i].access_expirydate = date._d
  }

  singlecheckboxchanges(i, value) {
    
    this.employeevalues[i].checkbox = value
    var v =this.employeevalues.filter(element => element.checkbox )
 
    if(this.employeevalues)
    {
      if(v.length != this.employeevalues.length || v == undefined)
      this.selectall = false
      else if(v.length == this.employeevalues.length)
      this.selectall = true
    }
   
  }


  selectallchange(value, type) {
console.log(value.type)
    if (type == 'share') {
      this.employeevalues.forEach(element => {
        element.checkbox = value
      })
    }
    if (type == 'update') {
      this.employees.forEach(element => {
        element.checkbox = value
      })
    }
  }

  EnterFirstTime: boolean = false // For open the email edit at one time when came from edit icon from the right side of the agreementcopy
  departmentdetail(i) {
    this.employees = i
    this.employees.forEach(element => {
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
      if (element.view) element.Sharetype = 'Review';
      if (element.edit) element.Sharetype = 'Signature';
      element.checkbox = true
      if(!this.EnterFirstTime && this.dailogdata.SharedRecordEdit && this.dailogdata.SharedRecordEdit._id==element._id){
        this.EnterFirstTime = true
        this.updatedepartment = true
        setTimeout(() => {
          let id = this.dailogdata.SharedRecordEdit._id
        document.getElementById(id).click()
        // document.getElementById('targetid').click()
      }, 10);
      }
    });

  }

  add(event: MatChipInputEvent): void {

    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    const input = event.input;
    const value = event.value;
    if (!this.matAutocomplete.isOpen) {
      if ((value || '').trim()) {

        // var shared = (this.SharedPeoples.some(element => element.email == event.value))

        if (event.value) {
          if (!(regexp.test(event.value))) {

            // this.emailvalid = true

          }
          else {
            // this.emailvalid = false

            // if (!shared) {
            //   var present = (this.useremail.some(element => element == event.value))
            //   if (!present) {
            //     this.isEmail = false
            //     this.useremail.push(event.value);

            //     this.users.push({ email: event.value })
            //   }

            // }
            // Reset the input value


            if (input) {

              input.value = '';
            }

            this.elementctrl.setValue(null);
          }

        }

      }

    }


    if (this.matAutocomplete.isOpen) {

    }

  }

  remove(fruit, indx): void {
    var mail = this.useremail[indx]
    this.useremail.splice(indx, 1);

    this.employeedata.forEach(element => {
      element.employees.forEach(x => {
        if (mail == x.email) element.employees.splice(element.employees.indexOf(x), 1)
      })
    })


  }




  selected(event: MatAutocompleteSelectedEvent, _id): void {



    this.useremail.push(event.option.value);


    // var shared = (this.SharedPeoples.some(element => element.email == event.option.viewValue))

    // if (!shared) {
    //   var present = (this.useremail.some(element => element == event.option.viewValue))
    //   if (!present) {
    //     this.isEmail = false
    //     this.useremail.push(event.option.viewValue);

    //     this.users.push({ email: event.option.viewValue, _id: event.option.value })
    //   }

    // }


    this.fruitInput.nativeElement.value = '';
    this.elementctrl.setValue(null);


  }

  departmenthierarchy = []

  //employees for selected department
  departmentSelection(department) {
    this.employeedata = [];
    this.employeedata1 = [];
    this.departmenthierarchy = []
    this.useremail = [];
    this.employeevalues = [];
    if (this.employeevalues.length == 0) {  this.showselection = false; this.mySelect.close() }

    this.departmentemails(department)
    department.forEach(element => {
      this.organizationService.getShareable_employees(element).subscribe(data => {
        this.employees = data
        var departmentvalue = this.departments.find(x => x._id == element);
        if (!this.check(departmentvalue._id)) {

          this.employeedata.push({ department_id: departmentvalue._id, department_name: departmentvalue.deptname, employees: this.employees })
          this.departmenthierarchy.push({ value: '', level: null })
          this.mySelect.close();
          this.employeevalues = []
          this.employeedata.forEach(element => {
            element.employees.forEach(element1 => {
              element1.access = this.access
              element1.Sharetype = this.Sharetype
              element1.shareoption = this.shareoption
              element1.checkbox = true
              element1.shareAccess = this.shareAccess
              this.employeevalues.push(element1)
            });
            if (this.employeevalues.length > 0) this.showselection = true
            if (this.employeevalues.length == 0) this.documentservice.openSnackBar('No employees found to share', 'x');
          });
        }
      })
    });
  }

  close() {
    this.dialogRef.close(true)
  }

  removesharing(index) {

    const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields',cancel: true ,content: " Are you sure to remove this employee for share." }, width: '500px', panelClass: 'deletemod' });
    ConfirmationDiaBox.afterClosed().subscribe(result => {
      if (result) {
        this.employeevalues.splice(index, 1)
      }
    });
  }

  RemoveShareduser(doc) {
    var deleteDoc = true;
    if (this.userDocList.some(x => x == doc.toemail)) deleteDoc = false;
    if (deleteDoc) {
      const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
        { data: { name: 'delete1' }, width: '500px', panelClass: 'deletemod' });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        if (result) {
          this.documentservice.RemoveShareduser(doc).subscribe(data => {
            this.documentservice.openSnackBar("Shared email removed the access on document", "X");
          });
          this.employees.splice(this.employees.indexOf(doc), 1);

          this.getAllDepartments()
        }
      });
    }
    else {
      let dialogRef22 = this.dialog.open(CommonDialogComponent,
        { data: { name: 'fields', cancel: false, content: doc.name + " has assigned with field, you can't delete it." }, width: '500px', panelClass: "deletemod" });
      dialogRef22.afterClosed().subscribe(res1 => {
        dialogRef22.close();
      });
    }
  }

  //removes shared department
  removedepart(member, doc) {
    var deleteDoc = true;

    let result = member.filter(o1 => this.userDocList.some(o2 => o1.toemail === o2));
    if (result && result.length != 0) deleteDoc = false;
    //   if (this.userDocList.some(x => x == doc.email)) deleteDoc = false;
    if (deleteDoc) {
      const ConfirmationDiaBox = this.dialog.open(CommonDialogComponent,
        { data: { name: 'deletedepartment' }, width: '500px', panelClass: 'deletemod' });
      ConfirmationDiaBox.afterClosed().subscribe(result => {
        if (result) {
          this.organizationService.removedepartsharing(doc).subscribe(data => {
            this.getAllDepartments()
            this.documentservice.openSnackBar("Shared department has been removed from access on document", "X");
          })
        }
      });
    }
    else {
      var name=''
      result.forEach(element => {
       name=name.concat(element.toid.fname+',')
      }); 
      name=name.substring(0, name.length - 1);
      let dialogRef22 = this.dialog.open(CommonDialogComponent,
        { data: { name: 'fields', cancel: false, content: name + " has assigned with field, you can't delete it." }, width: '500px', panelClass: "deletemod" });
      dialogRef22.afterClosed().subscribe(res1 => {
        dialogRef22.close();
      });
    }

  }

  departmentemails(department) {

    department.forEach(element => {
      this.organizationService.getShareableemails(element).subscribe(data1 => {
        this.employees1 = data1

        var departmentvalue = this.departments.find(x => x._id == element);
        if (!this.check1(departmentvalue._id)) {

          this.employeedata1.push({ department_id: departmentvalue._id, department_name: departmentvalue.deptname, employees: this.employees1 })

          this.stateGroups = this.employeedata1

          this.employees1.forEach(element => {

            this.useremail.push(element);
          })

        }
      })
    })
  }

  check(departmentId) {
    return this.employeedata.some(x => x.department_id == departmentId);
  }

  check1(departmentId) {

    return this.employeedata1.some(x => x.department_id == departmentId);
  }



  compareWithFunc(a, b) {
    // b.employees.forEach(element => {
    //   if(element._id===a._id)return true
    // });
    // return a._id === b._id;
  }


  //Share the file
  Sharetodepartment(Shareform) {
    this.departmentlevels = []
    var allemployees: any = []
    var profileInfo
    // this.employeedata.forEach(element1=>{
    // element1.employees.forEach(element2 => {
    //   this.useremail.forEach(element3=> {
    //   if(element3==element2.email){
    //   allemployees.push(element1)}});})})

    if (this.dailogdata.content.versionid) {
      this.documentservice.getCurrentVersionDocFieldOptions({ documentid: this.dailogdata.content._id, versionid: this.dailogdata.content.versionid }).subscribe(currentVersionDocFieldOptions => {
        this.currentVersionDocFieldOptionsResult = currentVersionDocFieldOptions;
        //======================//if versionid //======================================================================//
        if (this.currentVersionDocFieldOptionsResult && this.currentVersionDocFieldOptionsResult.fields.length) {
          this.fields = this.currentVersionDocFieldOptionsResult.fields;

          this.dailogdata.content.isSent = true
          this.documentservice.updatefolder(this.dailogdata.content).subscribe(data => { })


          var uniq = _.uniqBy(this.departmenthierarchy, 'value');
          if (this.departmenthierarchy.length > 1 && this.departmenthierarchy[0].value && this.departmenthierarchy[1].value && uniq.length != this.departmenthierarchy.length) this.documentservice.openSnackBar('Same department has been selected', 'x');
          else {

            this.employeedata = []

            this.employeevalues.forEach(element => {
              if (element.checkbox == true) {

                element.title = this.Sharetype

                this.employeedata.push(element)
              }

            })
            this.departmenthierarchy.forEach(element => {
              if (element.value) this.departmentlevels.push(element)
            })
            this.sharedata = {
              employees: this.employeedata,
              fileid: this.dailogdata.content._id,
              departmentlevels: this.departmentlevels
            }

            if (this.dailogdata.content.isFile) {
              this.sharedata.fileid = this.dailogdata.content
              this.sharedata.fileencryptedid = this.dailogdata.content.encryptedid
            }
            else this.sharedata.folderid = this.dailogdata.content;
        this.sharedata.IpAddress=(this.IpAddress)? this.IpAddress.ip : ' '

            this.organizationService.Shareto_Department(this.sharedata).subscribe(data => {
              this.sharingdoc = data
              this.dialogRef.close(true);
              
              this.documentservice.openSnackBar('Shared Successfully', 'x');

              this.documentservice.getsharingpeople(this.dailogdata.content).subscribe(data => {
                data[0].fileid.status = "Waiting for Sign"
                this.documentservice.updatefolder(data[0].fileid).subscribe(updatedData => { });
              })
            })
            profileInfo = JSON.parse(localStorage.getItem('currentUser'));
            if (profileInfo) var fromemail = this.userservice.decryptData(profileInfo.email)
            this.sharingdoc.forEach(element => {
              const result = {
                fromid: element.fromid,
                fromemail: fromemail,
                toid: element.toid,
                toemail:element.toemail,
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
              this.documentservice.savemousemovement(mousedata).subscribe(data => { });
            });
          }

        } else {
          var data={
            fileid:this.dailogdata.content._id 
          }
          this.documentservice.encryptedvalues(data).subscribe((filedata:any)=>{
            this.router.navigate(['filecont/'+filedata.encryptdata]);
            this.documentservice.openSnackBar("add fields in document", "X");
          this.dialogRef.close(false);
          })
          
        }
      })
    }

    else {
      var data={
        fileid:this.dailogdata.content._id 
      }
      this.documentservice.encryptedvalues(data).subscribe((filedata:any)=>{
        this.router.navigate(['filecont/'+filedata.encryptdata]);
      this.dialogRef.close(false);
      })

    }
  }
  selectdept = []
  getlevel(level, dept, index, index1) {
    console.log(index)
   if( this.departmenthierarchy.some((x,i) => x.value == dept && i != index))
   {
    this.departmenthierarchy[index] = {}
    this.documentservice.openSnackBar('Same department has been selected', 'x');
   }
   else
   {
     console.log(dept)
     this.departmenthierarchy[index].value = dept
    this.departmenthierarchy[index].level = level
   }
  }


  sharepeopled(sharedwidth) {
    this.Sharedpeople = sharedwidth
  }

  Shareduser(user) {

    if (user.view == true) user.shareoption = 'View'
    if (user.edit) user.shareoption = 'Edit'
    if (user.Comment) user.shareoption = 'Comment'
    this.user = user

  }
  //Individual File update
  savechanges(user, update, index) {
    console.log(user)
    if (user.Sharetype == "Signature" && user.fileid.status == 'Completed' || user.fileid.status == 'Partially completed') {
       this.documentservice.getSharedDoc(user._id).subscribe(async (data: any) => {
        if (data.view) {
          var statusemail = []
          var filledFieldCount = 0

          if (this.user.length && this.userDoc.length)
            if (this.user.length == 1) status = 'Waiting for Sign'
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
          this.documentservice.updatefolder({ _id: user.fileid._id, status: status }).subscribe(updatedData => { });
        }
      })
    }

    if (update == 'singleupdate') {
      user.title = user.Sharetype
      this.accesmodeList.forEach(code => {
        if (user.shareAccess.some(x => x == code.value)) user[code.value] = true;
        else user[code.value] = false;
      });

      this.organizationService.updatesharedpeople(user).subscribe(data => {
        user.revokeStatus = null
        if (data == "updated") {
          document.getElementById(user._id).click()
          this.documentservice.openSnackBar('changes are updated', 'x');
        }
      })

    }
    else {
      user.title = user.Sharetype
      this.employeevalues[index] = user
      document.getElementById(user._id).click()

    }

  }

  //All users update
  updateAll(updateform) {
    console.log(updateform.value,updateform.value.shareAccess[0],this.accesmodeList)

    var allemployees = []

    this.employees.forEach(element => {
      if (element.checkbox == true) {
        allemployees.push(element)
      }
    });

    var filepassword
    if (updateform.value.filepassword) filepassword = updateform.value.filepassword
    else filepassword = undefined
    this.sharedata = {
      employees: allemployees,
      accesstype: updateform.value.access,
      filepassword: updateform.value.filepassword,
      access_expirydate: this.accessexpiry,
      pin: updateform.value.pin,
      Sharetype: this.Sharetype,
      shareAccess: updateform.value.shareAccess
    }
    console.log(this.sharedata)
    if (this.dailogdata.content.isFile) {
      this.sharedata.fileid = this.dailogdata.content._id
      this.sharedata.fileencryptedid = this.dailogdata.content.encryptedid
    }
    else this.sharedata.folderid = this.dailogdata.content._id;

    this.accesmodeList.forEach(code => {
      if (this.sharedata.shareAccess.some(x => x == code.value)) this.sharedata[code.value] = true;
      else this.sharedata[code.value] = false;
    });
    console.log(this.sharedata)
    this.organizationService.AllSharedpeopleupdate(this.sharedata).subscribe(data => {

      this.dialogRef.close(true);
      this.documentservice.openSnackBar('changes are updated', 'x');

    })
  }

  selectAll(employee1: NgModel) {
    let values: any[] = []; // array which will contain all values

    // loop through all groups and add their items' values to the array
    for (let group of this.employeedata) {
      for (let item of group.employees) {
        values.push(item);
      }
    }
    // submit the array with all values
    employee1.update.emit(values);
  }

  individualClick() {
    this.organisationclick = false
    this.individualclick = true
  }

  organisationClick() {

    this.individualclick = false
    this.organisationclick = true

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
      { data: { name: 'fields', cancel: true, content: 'Are you sure want to ' + revokeStatus + ' the Sharing' }, width: '500px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      if (res) i.revoke = !i.revoke
    });

  }

  getUserDocList() {
    if (!this.dailogdata.multi) {
      this.documentservice.getCurrentVersionDocFieldWithValues({ documentid: this.dailogdata.content._id, versionid: this.dailogdata.content.versionid }).subscribe(response => {
       console.log(response)
        this.userDoc = response;
        if (((this.userDoc && this.userDoc.fields && this.userDoc.fields.length == 0) || !this.userDoc || this.userDoc.length == 0) && this.Sharetype == 'Signature') {
          this.addFeildsPopUp();
        }
        if (this.userDoc && this.userDoc.fields)
          this.userDoc.fields.forEach(docs => {
            if (docs.people) if (!this.userDocList.some(x => x == docs.people)) this.userDocList.push(docs.people);
          });
      });
    }
  }


  Radiochange(Sharetype) {
    this.employeevalues.forEach(element => {
      element.Sharetype = Sharetype
    })

    if (Sharetype == 'Review') this.dailogdata.title = "Review";
    if (Sharetype == 'Signature') {
      this.dailogdata.title = "Signature";
      setTimeout(() => {
        console.log((this.userDoc && this.userDoc.fields && this.userDoc.fields.length == 0) || !this.userDoc || this.userDoc.length == 0)
        if ((this.userDoc && this.userDoc.fields && this.userDoc.fields.length == 0) || !this.userDoc || this.userDoc.length == 0) this.addFeildsPopUp();
      }, 1000);
    }
  }

  addFeildsPopUp() {
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents' }, width: '500px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      var data={
        fileid:this.dailogdata.content._id 
      }
      this.documentservice.encryptedvalues(data).subscribe((filedata:any)=>{
       
      if (res) { this.dialogRef.close(false);  this.router.navigate(['filecont/'+filedata.encryptdata]); }
      else { this.Sharetype = "Review"; this.dailogdata.title = "Review"; }
      })
    });
  }


  shareRadioChange(info, title) {
    if (title == 'Signature') {
      setTimeout(() => {
        if ((this.userDoc && this.userDoc.fields && this.userDoc.fields.length == 0) || !this.userDoc || this.userDoc.length == 0) this.addShareFeildsPopUp(info);
      }, 10);
    }
  }

  addShareFeildsPopUp(i) {
    let dialogRef = this.dialog.open(CommonDialogComponent,
      { data: { name: 'fields', cancel: true, content: 'Add the Fields to Share documents in Signature mode' }, width: '500px', panelClass: "deletemod" });
    dialogRef.afterClosed().subscribe(res => {
      var data={
        fileid:this.dailogdata.content._id 
      }
      this.documentservice.encryptedvalues(data).subscribe((filedata:any)=>{
      if (res) { this.dialogRef.close(false); this.router.navigate(['filecont/'+filedata.encryptdata]); }
      else i.Sharetype = "Review";
      })
    });
  }

 //Getting document password
 getDocPassword(data)
 {
   data.title = 'getpassword'
   this.documentservice.getSearch('sharingpeoples/checkpassword/' + data._id + '/' + data.filepassword + '/'+data.title).subscribe(passworddata => {
     data.filepassword = passworddata 
   })
 }




}


export interface StateGroup {

}


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

