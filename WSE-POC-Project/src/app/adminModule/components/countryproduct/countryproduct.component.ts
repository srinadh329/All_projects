import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countryproduct',
  templateUrl: './countryproduct.component.html',
  styleUrls: ['./countryproduct.component.scss']
})
export class CountryproductComponent implements OnInit {
  name:any;
  countryproductlist = [{h:'Country',k:'cntnam'},{h:'Product Group',k:'grpnam'},{h:'Product',k:'prdlnm'},{h:'Status',k:''}, {h:'Action',k:''}]
  countryproductdata: any;
  searchData: any;
  constructor(public dialog: MatDialog, private AdminService: AdminService,private router:Router) { }

  ngOnInit() {
    this.getCountryProduct();
  }

  addCountryProduct(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '340px',
      data: { title: 'Add Country Product', dialogType: 'addcountryproduct' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
      }
      this.getCountryProduct();
    });
  }

  editCountryProduct(countryproduct) {
    console.log(countryproduct);
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '240px',
      data: { title: 'Edit Country product', dialogType: 'editcountryProduct', editcntryprod: countryproduct }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
      }
      this.getCountryProduct();
    });
  }


  getCountryProduct() {
    this.AdminService.getProductCountry().subscribe(data => {
      this.countryproductdata = data
      this.searchData = data
    })
  }

  backe(){
    
  }
  search(text) {
    this.countryproductdata =this.searchData.filter(e=>{
      if(e.cntnam.includes(text.toUpperCase()) || e.grpnam.includes(text.toUpperCase()) || e.prdlnm.includes(text.toUpperCase())){
        return e;
      }
    });
  }


}
