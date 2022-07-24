import { Component, OnInit, HostListener } from '@angular/core';
import { UserService } from '../user.service';
import { DepartmentdialogComponent } from '../departmentdialog/departmentdialog.component';
import { MatDialog, MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { OrganizationService } from '../organization.service';
import { MatSnackBar } from '@angular/material';
import { DocumentService } from '../document.service';
declare var $;
@Component({
  selector: 'app-adddepartment',
  templateUrl: './adddepartment.component.html',
  styleUrls: ['./adddepartment.component.css']
})
export class AdddepartmentComponent implements OnInit {
  errorshow: boolean = false;
  errorshow1: boolean = false;
  check: any
  checkdept: boolean
  userdata: any
  Departmentdata: any
  departmentchecked = false
  show: boolean
  edit: any
  delete: any
  deptname: any
  employees: any;
  profiledata: any;
  getemployeedata: any = [];
  parentdepartmentid
  data: any
  formSubmitted: boolean
  delete1
  windowWidth: any;
  isloading: boolean = true
  nodepartment: boolean = true
  searchresult:boolean=true
  iebrowser
  selectRecord
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.windowWidth = window.innerWidth;

  }
  constructor(public snackBar: MatSnackBar, private documentservice: DocumentService, private userservice: UserService, public dialog: MatDialog, private router: Router, private adminService: AdminService, private organizationService: OrganizationService) { this.getScreenSize(); }

  getdepartments() {
    this.isloading = true;
    this.organizationService.getDepartments().subscribe(data => {
      this.Departmentdata = data

      this.isloading = false;
    })
  }
  getemp() {
    this.isloading = true;
    this.organizationService.getemplist().subscribe(data => {
      this.getemployeedata = data
      this.isloading = false
    })
  }

  getdeptlist() {
    this.isloading = true
    this.organizationService.getDeptlist().subscribe(data => {
      this.employees = data
      if(this.employees.length==0 && this.employees)
      {
        this.searchresult=false
      } 
      else this.searchresult=true
      console.log(this.employees)
      this.isloading = false
    })
  }

  ngOnInit() {
    this.parentdepartmentid = ''
    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
   this.iebrowser=true
   $(".ietop1").css("margin-top", "100px");
     }
     else   this.iebrowser=false
    $(document).ready(function () {

      // alert($(".divwdth").width());
      // alert($(".tblwdth").width());
      var divwidth = $(".divwdth").width();
      var tablewidth = $(".tblwdth").width();
      if (tablewidth > divwidth) {

        $(".divwdth").addClass("table-responsive");


      }
      else {
        $(".divwdth").removeClass("table-responsive");
      }
    });
    $(window).resize(function () {
      var divwidth = $(".divwdth").width();
      var tablewidth = $(".tblwdth").width();
      if (tablewidth > divwidth) {

        $(".divwdth").addClass("table-responsive");


      }
      else {
        $(".divwdth").removeClass("table-responsive");
      }
    });


    this.getdepartments();
    this.getemp();
    this.getdeptlist();
    this.adminService.getProfile().subscribe(data => {
      this.profiledata = data
      if (this.getemployeedata && this.Departmentdata) {
        this.getemployeedata.forEach(element => {
          this.Departmentdata.forEach(element1 => {
            if (element1.parentdepartmentid != null && element._id == element1.parentdepartmentid._id) {
              element1.employeeemail = element.email
            }
          });
        });
      }
    })
  }

  showDocuments() {
    this.show = !this.show
  }


  onclick() {
    this.show = !this.show;
  }
  onKeyDown(departmentname) {
    this.check = false;
    var regx = new RegExp('([A-Za-z]|[0-9])')
    if (regx.test(departmentname)) {
      this.userservice.getDept(departmentname).subscribe(data => {
        this.userdata = data
        this.departmentchecked = true;
        if (this.userdata.data) {
          this.check = true
        }

      })

    }
  }

  adddepartment(addForm) {
    if (addForm.value.deptname && addForm.value.parentdepartmentid && this.userdata.data ){
      this.documentservice.openSnackBar("Department Already Exists", "X");
    }
    else {
    
      if (addForm.value.deptname && addForm.value.parentdepartmentid && !this.userdata.data) {
        this.isloading=true
        this.organizationService.addDep(addForm.value).subscribe(data => {
          if(data)
          { this.isloading=false
            document.getElementById("sample").click();
            
            this.userdata = data
           this.closeModel1(addForm)
           if (this.userdata.data) {
             this.check = true
           }
           this.show = !this.show;
           this.organizationService.getDepartments().subscribe(data => {
           this.Departmentdata = data
           this.searchresult=true
           this.documentservice.openSnackBar("Department Added Successfully", "X");
            })
          }
          else this.isloading=false
    
        })
   

      }

    }

  }

  closeModel1(form) {
    if (form) { this.deptname='';this.parentdepartmentid=''; }
    this.errorshow = false;
    this.errorshow1 = false;
  }

  editData(element) {
    const filedialog = this.dialog.open(DepartmentdialogComponent, {
      width: '1140px',
      panelClass: "withoutpadding",
      disableClose: true,
      autoFocus: true,
      data: element
    });
    filedialog.afterClosed().subscribe(res => {
      if (res == true) {
        this.isloading = true
        this.organizationService.getDepartments().subscribe(data => {
          this.Departmentdata = data
          if (data) {
            this.isloading = false;
            this.documentservice.openSnackBar("Department Updated Successfully", "X");
          }
          else this.isloading = false
        })
      }
    });
   
  }



  deleteData(a) {
    var obj=this.getemployeedata.some(x =>(x.department && x.department.deptname) == a.deptname)
    if(obj == true)
    {
      this.documentservice.openSnackBar("Sorry Cannot Delete Department, Already Assigned To Employees", "X");

    }else{

    const filedialog = this.dialog.open(DepartmentdialogComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true,
      panelClass: "deletemod",
      data: { name: 'delete', employee: a }

    });
    filedialog.afterClosed().subscribe(res => {
      if (res) {
        this.isloading=true
        a.active = false
        this.organizationService.updateempdetails(a).subscribe(data => {
          if (data) {
            this.isloading=false
            this.organizationService.getDepartments().subscribe(data => {
              this.Departmentdata = data
              if(this.Departmentdata.length==0 && this.Departmentdata)
              {
                this.searchresult=false
              }
              else this.searchresult=true
              this.documentservice.openSnackBar("Department Deleted Successfully", "X");
            })
          }
          else this.isloading=false

        })
      }
      else this.isloading=false
    });

    }
  }
  clearresult()
  { 
  this.organizationService.getDepartments().subscribe(data => {
    this.Departmentdata = data
    });  
  }
  //Sort Departmentname in ascending order
  sortDeptAsc() {
    this.Departmentdata.sort(function (a, b) {
      var nameA = a.deptname.toLowerCase()
      var nameB = b.deptname.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })
  }
  //Sort Departmentname in descending order
  sortDeptDsc() {
    this.Departmentdata.sort(function (a, b) {
      var nameA = a.deptname.toLowerCase()
      var nameB = b.deptname.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })

  }
  //Sort Companyname by using organisationid in ascending order 
  sortCompAsc() {

    this.Departmentdata.sort(function (a, b) {
      var nameA = a.organizationid.companyname.toLowerCase()
      var nameB = b.organizationid.companyname.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1; }
      return 0;
    })

  }
  //Sort Companyname by using organisationid in descending order
  sortCompDsc() {
    this.Departmentdata.sort(function (a, b) {
      var nameA = a.organizationid.companyname.toLowerCase()
      var nameB = b.organizationid.companyname.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA > nameB) { return -1; }
      return 0;
    })

  }




  disp() {
    this.check = false;

  }

  searchBackend(search) {
    var data = {
      search: search
    }
    this.organizationService.SearchDepartment(data).subscribe(data => {
      this.Departmentdata = data
    })
  }


  searchdepartments(search) {
    if(search &&search.length>0){
    var data = {
      search: search
    }
    this.organizationService.SearchDepartment(data).subscribe(data => {
      this.Departmentdata = data
    })
  }
  else {
  this.documentservice.openSnackBar("Please Enter text ", "X"); 
  }
}

  cancel(data) {
    data.resetForm();
  }


}


