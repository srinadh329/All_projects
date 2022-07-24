import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { OrganizationService } from '../organization.service';
import { AdminService } from '../admin.service';
import { DocumentService } from '../document.service';
@Component({
  selector: 'app-departmentdialog',
  templateUrl: './departmentdialog.component.html',
  styleUrls: ['./departmentdialog.component.css']
})
export class DepartmentdialogComponent implements OnInit {
  deptname: any
  name: any
  userdata: any;
  check: any
  Departmentdata
  profiledata
  getemployeedata
  parentdepartmentid: any
  companyname: any
  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<DepartmentdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private documentservice:DocumentService, private organizationService: OrganizationService,
    private adminService: AdminService) { }

  ngOnInit() {
    // this.parentdepartmentid = ''
    this.deptname = '';
    if (this.data.name != 'delete') this.deptname = this.data.deptname;
    if (this.data.organizationid) this.companyname = this.data.organizationid.companyname;
    this.organizationService.getDepartments().subscribe(data => {
      this.Departmentdata = data
    })

    this.adminService.getProfile().subscribe(data => {
      this.profiledata = data
      this.organizationService.getemplist().subscribe(data => {
        this.getemployeedata = data
        if (this.data.parentdepartmentid) this.parentdepartmentid = this.data.parentdepartmentid._id;
      })
    })
  }

  save() {
    this.dialogRef.close(false);
  }

  close() {
    this.dialogRef.close(false);
  }

  closeModel1(addform) 
  {
    addform.resetForm();
  }

  updateDetails(emp) {
    var updatedata = {
      _id:this.data._id,
      deptname:emp.value.deptname,
      parentdepartmentid: emp.value.parentdepartmentid
    }
    if (emp.value.deptname != "" && emp.value.parentdepartmentid != "") {
      this.organizationService.updateempdetails(updatedata).subscribe(data => {
        this.dialogRef.close(true);
       
      })
    }
     
  }

}
export interface DialogData {
  title: string;
  content: string;
}