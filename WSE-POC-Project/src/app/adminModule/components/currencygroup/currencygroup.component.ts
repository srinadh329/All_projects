import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-currencygroup',
  templateUrl: './currencygroup.component.html',
  styleUrls: ['./currencygroup.component.scss']
})
export class CurrencygroupComponent implements OnInit {
  name:any;
  tableHeaders = [{h:'Currency ID',k:'ccyid'},{h:'Currency Name',k:'ccylnm'},{h:'Status',k:''}, {h:'Action',k:''}];
  allcurrencydata: any;
  groupId: any;
  gpList: any;
  searchData: any;
  constructor(public dialog: MatDialog,private router:Router, private AdminService: AdminService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.groupId=this.AdminService.decryptData(params.ID);
        this.getCurrencyList();
        this.getcurrecyGroupList();
      })
      console.log(this.groupId)
  }
  listCurrency() {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '320px',
      data: {title: 'Add Currency', dialogType: 'addCurrencylist',currecyList:this.gpList,groupid:this.groupId}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "Getting Successfully") {
        // console.log(result)
      }
      this.getCurrencyList();
    });
  }

  getCurrencyList() {
    this.AdminService.getCcyList(this.groupId).subscribe(data => {
      this.allcurrencydata = data
      this.searchData = data;
    })
  }

  getcurrecyGroupList() {
    this.AdminService.getCcyGroups().subscribe(data => {
      // console.log(data);
      this.gpList = data
    })
  }

  editCurrency(editCCY) {
    // console.log(editCCY)
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '290px',
      data: { title: 'Edit Currency', dialogType: 'editCurrencylist', editData: editCCY }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "Update Successfully") {
        // console.log(result)
      }
      this.getCurrencyList();
    });
  }


  // currencyGroup(group){
  //   this.AdminService.getCcyGroups().subscribe((data:any)=>{
  //     console.log(data);
  //   })
  // }
  backe(){
    this.router.navigate(['admin/currency'])
  }

  search(text) {
    this.allcurrencydata =this.searchData.filter(e=>{
      if(e.ccyid.includes(text.toUpperCase()) || e.ccylnm.includes(text.toUpperCase())){
        return e;
      }
    });
  }
}
