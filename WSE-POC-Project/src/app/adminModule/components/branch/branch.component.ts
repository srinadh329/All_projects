import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { Router } from '@angular/router'
import { AdminService } from '../../admin.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  name:any;
  tableheader = [{h:'Branch ID',k:'brnid'}, {h:'Branch Name',k:'brnnam'}, {h:'Country',k:'cntnam'}, {h:'Branch Limit',k:'brnlmt'},
   {h:'Address',k:'braddr'}, {h:'Product Group',k:'grpnam'},{h:'Status',k:''}, {h:'Action',k:''}];
  branchdata: any;
  searchData:any=[];
  allBranchesShow: Boolean = true;
  constructor(public dialog: MatDialog, public router: Router, private AdminService: AdminService) {

  }
  search(text) {
      this.branchdata=this.searchData.filter(e=>{
        if(e.brnid.includes(text) || e.brnnam.includes(text.toUpperCase()) ||
         e.cntnam.includes(text.toUpperCase()) || e.brnlmt.includes(text) ||
          e.braddr.includes(text.toUpperCase()) || e.grpnam.includes(text.toUpperCase())){
          return e;
        }
      })
  }
  ngOnInit() {
    this.getBranchs();
    if (!this.router.url.split('/')[3]) {
      this.allBranchesShow = true;
    } else {
      this.allBranchesShow = false
    }
  }

  addBranch(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '460px',
      panelClass: 'customheight',
      data: { title: 'Add Branch', dialogType: 'addbranch', }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {

      }
      this.getBranchs();
    });
  }

  editbranch(branch) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '460px',
      data: { title: 'Edit Branch', dialogType: 'editbranch', editbrachlist: branch }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
      }
      this.getBranchs();
    });
  }

  navigateToBranch(branch) {
    this.allBranchesShow = false;
    let obj={id:this.AdminService.encryptData(branch.brnid),name:this.AdminService.encryptData(branch.brnnam)};
    this.router.navigate(['admin/branchusers'], { queryParams:{data:JSON.stringify(obj)}});
  }

  getBranchs() {
    this.AdminService.getBranchList().subscribe(data => {
      this.branchdata = data;
      this.searchData=data;
    })
  }

}
