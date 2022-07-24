import { Component, OnInit ,ViewChild} from '@angular/core';
import { AdminService } from '../admin.service';
import { UserService } from '../user.service';
import { EmployeedialogComponent } from '../employeedialog/employeedialog.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { OrganizationService } from '../organization.service';
import { DocumentService } from '../document.service';
import { embeddedViewEnd } from '@angular/core/src/render3';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import readXlsxFile from 'read-excel-file'
import { saveAs } from 'file-saver';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';

declare var $: any;
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  show: boolean
  fname: any
  lname: any
  email: any
  mobilenumber: any
  department: any
  gender: any
  userdata: any
  check: any
  check1 = false;
  departments: any
  emailchecked = false;
  getemployeedata: any = [];
  getemployedata: any = [];
  red: any
  profiledata: any;
  comparison
  formSubmitted
  isloading: boolean = true
  noemployee: boolean = true
  tst1
  GenderNotSelected: Boolean = false;
  emailconfirmation:any;
  element:any
  showlist:boolean=false
  selectedName;
  emailcheck1:any;
  searchresult:boolean=true
  iebrowser
  selectRecord
  path
  search
  showexcelbutton:boolean=false
  Firstname:boolean=false
  Lastname:boolean=false
  Gender:boolean=false
  @ViewChild('fileInput') fileInput;
  // activeuser:boolean=true
resultarry
butttonid
  constructor(private adminservice: AdminService, private documentservice: DocumentService, private userservice: UserService, public dialog: MatDialog, private router: Router, private organizationService: OrganizationService) { }
  getdepartments() {
    this.isloading = true
    this.organizationService.getDepartments().subscribe(data => {
      this.departments = data
      this.isloading = false

    })
  }
  getemployees() {
    this.isloading = true
    this.organizationService.getemplist().subscribe(data => {
      this.getemployeedata = data
      if(this.getemployeedata.length==0 && this.getemployeedata)
      {
        this.showexcelbutton=true
       this.searchresult=false 
      }
      else this.searchresult=true
      this.isloading = false
    })

  }
  ngOnInit() {
    if (!!(window as any).MSInputMethodContext && !!(document as any).documentMode) {
      this.iebrowser=true
         $(".ietop1").css("margin-top", "100px");
       }
       else this.iebrowser=false
    this.getdepartments();
    this.getemployees();    if(!!(window as any).MSInputMethodContext && !!(document as any).documentMode) 
    { 
   this.iebrowser=true
     }
     else   this.iebrowser=false

  }
  //Sort Firstname in ascending order
  sortFNameAsc() {

    this.getemployeedata.sort(function (a, b) {
      var nameA = a.fname.toLowerCase()
      var nameB = b.fname.toLowerCase()
      if (nameA > nameB) { return 1 };
      if (nameA < nameB) { return -1 };
      return 0;
    });
  }
  //Sort Firstname in Descending order
  sortFNameDsc() {
    this.getemployeedata.sort(function (a, b) {
      var nameA = a.fname.toLowerCase()
      var nameB = b.fname.toLowerCase()
      if (nameA < nameB) { return 1 };
      if (nameA > nameB) { return -1 };
      return 0;
    });
  }

  //Sort Lastname in Ascending order
  sortLNameAsc() {
    this.getemployeedata.sort(function (a, b) {
      var nameA = a.lname.toLowerCase()
      var nameB = b.lname.toLowerCase()
      if (nameA > nameB) { return 1; }
      if (nameA < nameB) { return -1 };
      return 0;
    })

  }
  //Sort Lastname in Descending order
  sortLNameDsc() {
    this.getemployeedata.sort(function (a, b) {
      var nameA = a.lname.toLowerCase()
      var nameB = b.lname.toLowerCase()
      if (nameA < nameB) { return 1; }
      if (nameA < nameB) { return -1 };
      return 0;
    })

  }

  closeModel1(form) {
    this.check1=false
    this.GenderNotSelected = false;
    form.resetForm();
    this.formSubmitted = false;
  }

  onclick() {
    this.show = !this.show;
  }

  showemployeeDetails() {
    this.show = !this.show
  }
  addemployee(emp) {
    console.log(emp.value)
   if(this.emailcheck1.user &&  (emp.value.email==this.emailcheck1.user.email) && !this.emailcheck1.user.status && !this.emailcheck1.user.active)
   {
    const filedialog = this.dialog.open(EmployeedialogComponent, {
      width: '500px',
      disableClose: false,
      autoFocus: true,
      panelClass: "deletemod",
      data: { name: 'exitemployee' }
    });
    filedialog.afterClosed().subscribe(res => {
      console.log(res)
      if (res) 
      { var data1={
        email:this.emailcheck1.user.email,
        type:'replace'
      }
        this.organizationService.updateemployeelogindetails(data1).subscribe((data:any) => {
          if(data.email)
          { 
            
            this.isloading=true
            this.formSubmitted = false;
            document.getElementById("sample").click();
            this.organizationService.postemp(emp.value).subscribe(data => {
              if(data)
              {
                this.userdata = data;
                this.emailchecked = true;
               this.isloading=false
                this.organizationService.getemplist().subscribe(data => {
                  this.getemployeedata = data
                  this.searchresult=true
                  this.documentservice.openSnackBar("Employee Added Successfully", "X");
                })
              }
              else this.isloading=false
              emp.resetForm();
              this.GenderNotSelected = false;
            })
          }
        });  
      }
    });

   }
   else{
    if (emp.value.gender == null) this.GenderNotSelected = true;
    if (emp.valid && !this.check1) {
      this.isloading=true
      this.formSubmitted = false;
      document.getElementById("sample").click();
      this.organizationService.postemp(emp.value).subscribe(data => {
        if(data)
        {
          this.userdata = data;
          this.emailchecked = true;
         this.isloading=false
          this.organizationService.getemplist().subscribe(data => {
            this.getemployeedata = data
            this.searchresult=true
            this.documentservice.openSnackBar("Employee Added Successfully", "X");
          })
        }
        else this.isloading=false
        emp.resetForm();
        this.GenderNotSelected = false;
      })
    }
   }
  }
  EmailVerification(email) {
    this.emailcheck1=null;
    this.userservice.getemail(email.toLowerCase()).subscribe((data: any) => {
      this.emailcheck1=data;
      console.log(this.emailcheck1)

      if( this.emailcheck1 && this.emailcheck1.user &&this.emailcheck1.user.status==true && this.emailcheck1.user.active==true)
      {
        if( this.emailcheck1.data==true) 
        {
          this.check1 = true;
        }
      }
      else if(this.emailcheck1 && this.emailcheck1.user &&this.emailcheck1.user.status==true && this.emailcheck1.user.active==false){
        this.check1 = true;
      }
    });
  }
  editempData(employee) {
    const filedialog = this.dialog.open(EmployeedialogComponent, {
      width: '900px',
      panelClass: "withoutpadding",
      disableClose: true,
      autoFocus: true,
      data: { employee }
    });
    filedialog.afterClosed().subscribe(res => {
      console.log(res)
      if (res) 
      {
        // this.getemployees();
        this.organizationService.getemplist().subscribe(data => {
          this.getemployeedata = data
        })
      this.documentservice.openSnackBar("Employee Details Updated Successfully", "X");
      }
    });
  }

  test(data) {
    console.log(data)
    this.tst1 = data
  }

  deleteempData(remove,status) {
    if(status == 'delete')
    {
      const filedialog = this.dialog.open(EmployeedialogComponent, {
        width: '500px',
        disableClose: false,
        autoFocus: true,
        panelClass: "deletemod",
        data: { name: 'delete', employee: remove }
      });
      filedialog.afterClosed().subscribe(res => {
        
        if (res) 
        {
          this.isloading=true
          remove.active = false;
          remove.status = false;
          remove.type="replace"
          this.organizationService.updateemployeelogindetails(remove).subscribe(data => {
            if(data)
            { 

              this.isloading=false
              remove.type = ''
              this.organizationService.getemplist().subscribe(data => {
                this.getemployeedata = data
                if(this.getemployeedata.length==0 && this.getemployeedata)
                {
                  remove.activeuser=true
                  this.searchresult=false
                }
                else this.searchresult=true
              })
              this.documentservice.openSnackBar("Employee Deleted Successfully", "X");
            }
            else this.isloading=false
       
           })
        }
        else this.isloading=false 
      });
    }
    else
    {
      let active='active';
      remove.activeuser=false
      if(remove.status){
        active="In active"
      }
      let dialogRef = this.dialog.open(CommonDialogComponent,
        { data: { name: 'sharesubmit', cancel: true, content: 'Are you sure you want to '+ active+ ' the user?' }, width: '500px', panelClass: "deletemod",disableClose:true });
        dialogRef.afterClosed().subscribe(res => {
        
        if (res == true) 
        {
          this.organizationService.updateemployeelogindetails(remove).subscribe((data:any) => {
            if(data)
            { 
              this.isloading=false
              this.organizationService.getemplist().subscribe(data => {
                this.getemployeedata = data
              })
              if(!data.status) this.documentservice.openSnackBar("Employee is InActive successfully", "X");
              else if(data.status) this.documentservice.openSnackBar("Employee is Active successfully", "X");

            }
            else this.isloading=false
          } )
        }
        else{
          remove.status=!remove.status
        }
        })
    }
   
  }

  searchBackend(search) {
   
this.search=search
      var data = {
        search: search
      }
      this.organizationService.SearchEmployee(data).subscribe(data => {
        this.getemployeedata = data
      })
  }

  searchemployee(search) {
    this.search=search
    if( search && search.length>0){
    var data = {
      search: search
    }
    this.organizationService.SearchEmployee(data).subscribe(data => {
      this.getemployeedata = data
    })
  }
  else {
    this.documentservice.openSnackBar("Please Enter text ", "X"); 

  }
  }
  resendmail(element)
  {
    console.log(element)
      console.log("resend")
      var Info = { email: element.email};
      this.adminservice.resedEmailforemp(Info).subscribe(data => {
      this.emailconfirmation = data
      console.log(this.emailconfirmation)
      if (this.emailconfirmation.res == "success") 
      {
      this.documentservice.openSnackBar("Verification link sent to Email", "X")
      }
    })
  }
  selectdata(element)
  {
    this.showlist=true
    this.element=element;
this.selectedName=element._id
  }
  clearresult()
  {this.search=''
    this.organizationService.getemplist().subscribe(data => {
      this.getemployeedata = data
    });
  }
  addteztexcel(){
    this.isloading=true
var  input = this.fileInput.nativeElement
document.getElementById("closeexcelmodel").click();
  readXlsxFile(input.files[0]).then((rows) => {
   
    
    this.organizationService.addemployeesfromexcel(rows).subscribe((data :any)=> {
    console.log(data) 
      this.isloading=false
this.resultarry=data
if(this.resultarry && this.resultarry.faileddata){
  this.resultarry.faileddata.forEach((element ,index) => {
    if (element) {
      var name =/^[a-zA-Z]+$/
      var mailformat =/^([A-Za-z]|[0-9])[A-Za-z0-9.-]+[A-Za-z0-9]@((?:[-a-z0-9]+\.)+[a-z]{2,})$/;
      var mobilepat=/^\d{10}$/; 
     if(name.test(String(element.fname)) && name.test(String(element.lname))&& ((String(element.gender).toLowerCase()=='f')||(String(element.gender).toLowerCase()=='male')||(String(element.gender).toLowerCase()=='m')||(String(element.gender).toLowerCase()=='female'))&&element.mobilenumber && element.email && element.departmentname){
     var sampleDATA=  this.departments.filter(data => data.deptname.toLowerCase() == String(element.departmentname).toLowerCase())

     if(mailformat.test(String(element.email).toLowerCase()) && mobilepat.test(element.mobilenumber)){
       this.resultarry.faileddata[index]['dept']=true

     }
     else if( !mailformat.test(String(element.email).toLowerCase()) && mobilepat.test(element.mobilenumber)){

       if( sampleDATA && sampleDATA.length!=0){
         this.resultarry.faileddata[index]['emailinvalid']=true

       }
       else {
         this.resultarry.faileddata[index]['emailinvalid']=true
         this.resultarry.faileddata[index]['dept']=true


      }
     }
     else if( mailformat.test(String(element.email).toLowerCase()) && !mobilepat.test(element.mobilenumber)){
 
        if(sampleDATA && sampleDATA.length!=0){

          this.resultarry.faileddata[index]['mobileinvalid']=true
        }
        else {
          this.resultarry.faileddata[index]['mobileinvalid']=true
          this.resultarry.faileddata[index]['dept']=true
        }
      }
      else {   
          if(sampleDATA && sampleDATA.length!=0){
            this.resultarry.faileddata[index]['emailinvalid']=true
            this.resultarry.faileddata[index]['mobileinvalid']=true

          }
          else {
            this.resultarry.faileddata[index]['emailinvalid']=true
            this.resultarry.faileddata[index]['mobileinvalid']=true
            this.resultarry.faileddata[index]['dept']=true
          }
        }
     }
     else{
      if(element && element.departmentname)   var sampleDATA=  this.departments.filter(data => data.deptname.toLowerCase() == String(element.departmentname).toLowerCase())
      if(element && element.fname){
        if(name.test(String(element.fname))){
         this.Firstname=false
        }
        else this.Firstname=true

      }
      if(element && element.lname){
        if(name.test(String(element.lname))){
          this.Lastname=false
        }
        else{
          this.Lastname=true
        } 

}
      if(element && element.gender){
        if(((String(element.gender).toLowerCase()=='f')||(String(element.gender).toLowerCase()=='male')||(String(element.gender).toLowerCase()=='m')||(String(element.gender).toLowerCase()=='female'))){
          this.Gender=false
        }
        else{
          this.Gender=true
        }

      }
      if( element && element.email && element.mobilenumber ){
        if(mailformat.test(String(element.email).toLowerCase())  && mobilepat.test(element.mobilenumber) )  {
         if(sampleDATA && sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
         if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
         if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
         if(this.Gender) this.resultarry.faileddata[index]['gender1']=true


        }
        else  if(!mailformat.test(String(element.email).toLowerCase())  && mobilepat.test(element.mobilenumber) )  {
          {
          this.resultarry.faileddata[index]['emailinvalid']=true
         if(sampleDATA && sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
         if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
         if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
         if(this.Gender) this.resultarry.faileddata[index]['gender1']=true

          }
        }
        else  if(mailformat.test(String(element.email).toLowerCase())  && !mobilepat.test(element.mobilenumber) )  {
          this.resultarry.faileddata[index]['mobileinvalid']=true
          if(sampleDATA && sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
           if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
         if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
         if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
 
        }else{
          this.resultarry.faileddata[index]['mobileinvalid']=true
          if(sampleDATA && sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
           if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
         if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
         if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
         if(this.Gender) this.resultarry.faileddata[index]['emailinvalid']=true

        }
      }
      else if(element&& element.mobilenumber &&!element.email){ 
        
          if(element && element.departmentname && mobilepat.test(element.mobilenumber)) {
          if(sampleDATA &&sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
          if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
          if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
          } 
           else if(element && element.departmentname && !mobilepat.test(element.mobilenumber)) {
            this.resultarry.faileddata[index]['mobileinvalid']=true
            if(sampleDATA &&sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
            if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
            if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
            if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        }else if(!mobilepat.test(element.mobilenumber)){
          this.resultarry.faileddata[index]['mobileinvalid']=true
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
          if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
          if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        }else{
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
          if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
          if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        }
      }
      else if( element &&element.email && !element.mobilenumber){
  
        if(element && element.departmentname && mailformat.test(String(element.email).toLowerCase())) {
          if(sampleDATA &&sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
          if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
          if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
          } 
           else if(element && element.departmentname && !mailformat.test(String(element.email).toLowerCase())) {
            this.resultarry.faileddata[index]['emailinvalid']=true
            if(sampleDATA &&sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
            if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
            if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
            if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        } else if(!mailformat.test(String(element.email).toLowerCase())){
          this.resultarry.faileddata[index]['emailinvalid']=true;
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
            if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
            if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        }else{
          if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
          if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
          if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
        }
      }else{
        if(sampleDATA &&sampleDATA.length==0) this.resultarry.faileddata[index]['dept']=true
            if(this.Firstname) this.resultarry.faileddata[index]['firstname']=true
            if(this.Lastname) this.resultarry.faileddata[index]['lastname']=true
            if(this.Gender) this.resultarry.faileddata[index]['gender1']=true
      }

     }
    }
  });
}
if(data.res=="Invalid excel format"){
  this.documentservice.openSnackBar("Invalid Excel Format, Please Download sample Template", "X")

}
else if(data.res=="Empty data" ){
  this.documentservice.openSnackBar("Empty data sheet  upload", "X")

}
    else{
        // this.ngOnInit()
        setTimeout(() => {
          this.organizationService.getemplist().subscribe(data1 => {
           document.getElementById("showresults").click();

            this.getemployeedata = data1
            // this.searchresult=true
            // this.documentservice.openSnackBar("Employees Added Successfully", "X");
          })
        }, 100);
     
      }
    })


  },error=>{
   this.isloading=false;

      this.documentservice.openSnackBar("Invalid File Choose", "X")

  })


  }
  selectexcelsheet()
{
 if(this.fileInput.nativeElement.value ) this.fileInput.nativeElement.value = '';
  document.getElementById("selectinputfile").click();

}
downloadsheet()

{
  document.getElementById("closeexcelmodel").click();
var path='https://docintact.s3.amazonaws.com/uploads/1568910062141_DocintactEmployeeFormat.xlsx'
  var xhr = new XMLHttpRequest()
  xhr.open("GET", path)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response,'DocintactEmployeeFormat.xlsx');
  }
  xhr.send()
  this.documentservice.openSnackBar("File download Successfully", "X");

    }
   
  

}



