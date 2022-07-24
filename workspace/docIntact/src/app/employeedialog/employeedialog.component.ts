import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DocumentService } from '../document.service';


@Component({
  selector: 'app-employeedialog',
  templateUrl: './employeedialog.component.html',
  styleUrls: ['./employeedialog.component.css']
})
export class EmployeedialogComponent implements OnInit {
  userdata: any
  check: any
  fname: any
  lname: any
  mobilenumber: any
  email: any
  name: any
  deptname: any
  departments
  gender: any
  department: any
  departmentname: any


  constructor(private userservice: UserService,
    public dialogRef: MatDialogRef<EmployeedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog, private router: Router,private documentservice:DocumentService, private organizationService: OrganizationService) { }

  ngOnInit() {

    this.organizationService.getDepartments().subscribe(data => {
      this.departments = data
    })
    if(this.data.employee)
    {
      this.fname = this.data.employee.fname;
      this.lname = this.data.employee.lname;
      this.mobilenumber = this.data.employee.mobilenumber;
      this.email = this.data.employee.email;
      if(this.data && this.data.employee.gender ){
        if(this.data.employee.genderr=='F' || this.data.employee.genderr=='f'){
          this.gender='female'
        }
        else if(this.data.employee.gender=='M' || this.data.employee.gender=='m'){
          this.gender='male'
        }
        else this.gender = this.data.employee.gender.toLowerCase();

      }
      
       if(this.data.employee.department)this.department = this.data.employee.department._id;
    }

    if (this.data.name != 'delete' && this.data.name != 'exitemployee') this.name = this.data.name;

  }


  save() {
    this.dialogRef.close();
  }


  close() {
    this.dialogRef.close();
  }

  departname(id): void {
    this.department = id;
    var dept = this.departments.find(x=>x._id == id);
    if(dept) this.departmentname = dept.deptname;    
  }


  updateempDetails(emp) 
  {
    if(emp.valid){
      emp._id = emp.department
      var data1 = {
        mobilenumber: emp.value.mobilenumber,
        lname: emp.value.lname,
        email: emp.value.email,
        fname: emp.value.fname,
        gender: emp.value.gender,
        departmentname: this.departmentname,
        department: this.department,
      }
      this.organizationService.updateemployeelogindetails(data1).subscribe(data => {
        this.dialogRef.close(true);
        
        
      })
    }
   
  }
}
export interface DialogData {
  title: string;
  content: string;
}