import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { Router } from "@angular/router"
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {
  name:any;
  currencyhead = [{h:'Group Code',k:'ccygid'},{h:'Group Name',k:'grpnam'},{h:'Status',k:''}, {h:'Action',k:''}]
  currencylist: any;
  searchData: any;
  showAllCurrency: Boolean = true
  constructor(public dialog: MatDialog, private router: Router, private AdminService: AdminService) { }

  ngOnInit() {

    this.getCurrencyGroup();
    if (this.router.url.split('/')[2]) {
      this.showAllCurrency = true;
    } else {
      this.showAllCurrency = false;
    }
  }
  addCurrencyGroup() {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '290px',
      data: { title: 'Add Group', dialogType: 'addcurrencygroup' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
      }
      this.getCurrencyGroup();
    });
  }

  editCurrencyGroup(editGroupData) {
    console.log(editGroupData)
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '290px',
      data: { title: 'Edit Currency Group', dialogType: 'editCurrencyGroup1', editGroupData: editGroupData }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
      }
      this.getCurrencyGroup();
    });
  }

  getCurrencyGroup() {
    this.AdminService.getCcyGroups().subscribe(data => {
      this.currencylist = data
      this.searchData = data;
    })
  }
  CurrencyGroupNav(Data) {
    this.showAllCurrency = false
    var encryptid= this.AdminService.encryptData(Data.ccygid)
    this.router.navigate(['admin/currencylist'], { queryParams: { ID: encryptid } })
  }
  search(text) {
    this.currencylist =this.searchData.filter(e=>{
      if(e.ccygid.includes(text.toUpperCase()) || e.grpnam.includes(text.toUpperCase())){
        return e;
      }
    });
  }

}
