import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { ClientSideService } from 'src/app/services/client-side.service';
declare var $: any;

@Component({
  selector: 'app-property-managers',
  templateUrl: './property-managers.component.html',
  styleUrls: ['./property-managers.component.scss']
})
export class PropertyManagersComponent implements OnInit {

  buildingList: any;
  userForm: FormGroup;
  selectedUser: any;
  userList:any = [];
  userCount = 0;
  lastUserCount = 0;
  listView:any = [];
  deleteUserData:any = {};
  filterBy:any = {
    start:this.lastUserCount,
    count:9
  }

  constructor(private admin: AdminService, private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService, private clientSide: ClientSideService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getBuildingList();
    this.initUserForm();
    this.getUserList();
  }

  get getFormControls() {
    return this.userForm.controls
  }

  

  getBuildingList() {
    this.admin.buildingList.subscribe((data) => {
      if (data) {
        this.buildingList = data;
      }
    })
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      loginEmail: ['', [Validators.required, Validators.email]],
      building: [null, Validators.required],
    })
  }

  submitUserForm() {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      let buildingId = [];
      const obj = { ...this.userForm.value }
      delete obj.building;
      buildingId.push(+this.getFormControls.building.value)
      if (buildingId && buildingId.length) {
        obj['propertyIdList'] = buildingId
      }
      this.spinner.show();
      this.admin.createUser(obj).subscribe((data) => {
        if (!data.message) {
          this.spinner.hide();
          this.userForm.reset();
          this.resetList();
          // this.userCount = 0
          this.getUserList();
          this.toaster.success('Property Manager Created Successfully')
        }
        else {
          this.userForm.reset();
          this.toaster.error('Email already exists')
          this.spinner.hide();
        }
      }, err => {
        this.toaster.error('Network Error')
        this.spinner.hide();
      })
    }
  }

  getUserList() {
    this.spinner.show();
    this.admin.getUserList(this.filterBy).subscribe((data :any) => {
      if (data) {
        this.spinner.hide();
        this.updateList(data);
        this.userList = this.getLastViewedUserList();
      } 
      else {
        this.spinner.hide();
      }
    } , err => {
      this.spinner.hide();
    })
  }

  getLastViewedUserList() {
    return this.listView;
  }

  updateList(obj:any) {
    let isResult = false;
    if (obj && obj.length) {
      this.listView.push(...obj);
      isResult = true;
    }

    if (isResult === true) {
      this.lastUserCount += 9;
      this.filterBy.start = this.lastUserCount
    }

  }


  onScroll() {
    if (this.userCount !== this.lastUserCount) {
      this.spinner.show();
      this.admin.getUserList(this.filterBy).subscribe((data: any) => {
        this.spinner.hide();
        if (data && data.length) {
          this.updateList(data);
        }
      })
      this.userList = this.getLastViewedUserList();
      this.userCount = this.lastUserCount;
    }
  }

  resetList() {
    this.userList = [];
    this.userCount = 0;
    this.lastUserCount = 0;
    this.listView = [];
    this.filterBy.start = this.lastUserCount;
  }

  removeUser(data:any) {
    if (this.clientSide.checkPlatformBrowser()) {
      $('#removeUser').modal('show');
      this.deleteUserData = data;
    }
  }

  deleteUser() {
    if(this.deleteUserData && this.deleteUserData.id) {
      this.spinner.show();
      this.admin.deleteUser(this.deleteUserData.id , this.deleteUserData.disabled == 0 ? 0 : 1).subscribe((data) => {
        if (data) {
           this.spinner.hide();
           this.toaster.success("User Disabled Successfully");
           this.resetList();
          //  this.userCount = 0
           this.getUserList();
        }
      } , err => {
        this.spinner.hide();
      })
    }
  }

  enableUser(data:any) {
    if (this.clientSide.checkPlatformBrowser()) {
      $('#activateUser').modal('show');
      this.deleteUserData = data;
    }
  }

  addUser() {
    if(this.deleteUserData && this.deleteUserData.id) {
      this.spinner.show();
      this.admin.deleteUser(this.deleteUserData.id , this.deleteUserData.disabled == 1 ? 1 : 0).subscribe((data) => {
        if (data) {
           this.spinner.hide();
           this.toaster.success("User Activated Successfully");
           this.resetList();
          //  this.userCount = 0
           this.getUserList();
        }
      } , err => {
        this.spinner.hide();
      })
    }
  }

  appliedFilter(event: any) {
    if (event) {
      this.resetList();
      this.filterBy = { ...this.filterBy, ...event }
      this.getUserList();
    }
  }


}
