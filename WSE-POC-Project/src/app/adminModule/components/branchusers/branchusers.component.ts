import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-branchusers',
  templateUrl: './branchusers.component.html',
  styleUrls: ['./branchusers.component.scss']
})
export class BranchusersComponent implements OnInit {
  name:any;
  tableheader=[{h:'User Name',k:'usrnam'},{h:'User Login ID',k:'loginid'},{h:'Role',k:'roltyp'},{h:'Status',k:''}, {h:'Action',k:''}];
  allbranchusers:any;
  branchDetails:any;
  searchData:any;
  currentRouter:any
  constructor(public router:Router,public dialog: MatDialog,private route:ActivatedRoute,private AdminService:AdminService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var x=JSON.parse(params.data);
      this.branchDetails={
        id:this.AdminService.decryptData(x.id),
        name:this.AdminService.decryptData(x.name)
      }

      this.getBranchUserList();
      // this.branchID=params.branchDetails.
      // this.getcurrecyGroupList();
    })

  }
    addBranchusers(): void {
      const dialogRef = this.dialog.open(DailogComponent, {
        width: '700px',
        height: '460px',
        data: {title: 'Add User', dialogType: 'addbranchusers' , BranchDetails:this.branchDetails}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result == "add") {
        }
        this.getBranchUserList();
      });
  }

  // editBranchusers(branchuser){
  //   console.log(branchuser)
  //   const dialogRef = this.dialog.open(DailogComponent, {
  //     width: '700px',
  //     height: '460px',
  //     data: {title: 'Change Password', dialogType: 'editbranchusers',branchUserList:branchuser}
  //   });
  // }

  getBranchUserList(){
    this.AdminService.getBranchUsers(this.branchDetails.id).subscribe(data =>{
      this.allbranchusers =data;
      this.searchData = data;
    })
  }

  editBranchusers(branchuser){
    if(branchuser.type == 'settings'){
      console.log(branchuser.type)
      const dialogRef = this.dialog.open(DailogComponent, {
        width: '700px',
        height: '260px',
        data: {title: 'Edit Password', dialogType: 'changeBranchuser',passwordChange:branchuser}
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if (result == "update") {
        }
        this.getBranchUserList();
      });
    }
    else{
      branchuser.brnid = this.branchDetails.id;
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '300px',
      data: {title: 'Change Status Role', dialogType: 'editbranchusers',branchUserList:branchuser}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
      }
      this.getBranchUserList();
    });
  }
  }


  search(e){
    this.allbranchusers=this.searchData.filter(x => {
     if(x.usrnam.toLowerCase().includes(e.toLowerCase()) || x.loginid.includes(e.toUpperCase()) || x.roltyp.includes(e.toUpperCase())){
       return x;
    };
    });
  }
  branch(){
    this.router.navigate(['admin/branch'])

  }
}
