import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-productgroup',
  templateUrl: './productgroup.component.html',
  styleUrls: ['./productgroup.component.scss']
})
export class ProductgroupComponent implements OnInit {
  name:any;
  tableHeaders = [{h:'Product ID',k:'prdid'},{h:'Small Name',k:'prdsnm'},{h:'Large Name',k:'prdlnm'},{h:'Currency Group',k:'ccygrp'},
  {h:'Status',k:''}, {h:'Action',k:''}];
  allproductgroup: any;
  productGroupList: any;
  searchData: any;
  list:any;
  constructor(public dialog: MatDialog, private route: ActivatedRoute, private AdminService: AdminService,private router:Router,private Location:Location) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        var x = JSON.parse(params.data);
        this.productGroupList = {
          id: this.AdminService.decryptData(x.id),
          name: this.AdminService.decryptData(x.name),
        }
      })
    this.getProductList()
    this.getlist()
  }
  listProductGroup() {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '320px',
      data: { title: 'Add Product', dialogType: 'addproduct', productList: this.productGroupList }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "Getting Successfully") {
        console.log(result)
      }
      this.getProductList();
    });
  }
  editproduct(listProduct) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '324px',
      data: { title: 'Edit Product', dialogType: 'editproduct', editProductLitst: listProduct, productData:this.productGroupList }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
        console.log(result)
      }
      this.getProductList();
    });
  }

  getProductList() {
    this.AdminService.getProducts(this.productGroupList.id).subscribe(data => {
      this.allproductgroup = data;
      this.searchData = data;
    })
  }

  search(text) {
    this.allproductgroup = this.searchData.filter(e=>{
      if(e.prdid.includes(text.toUpperCase()) || e.prdsnm.includes(text.toUpperCase()) ||
       e.prdlnm.includes(text.toUpperCase()) || e.ccygrp.includes(text.toUpperCase())){
        return e;
      }
    });
  }

  getlist() {
    console.log("group")
    this.AdminService.getListProduct().subscribe(data => {
      console.log(data);
      this.list = data
    })
  }

  backe(){
    // require('../product')
    this.router.navigate(['admin/product'])
  }

}
