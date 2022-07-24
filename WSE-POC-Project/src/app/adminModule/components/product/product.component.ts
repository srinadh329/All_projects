import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { Router } from "@angular/router"
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  name:any;
  producthead = [{h:'Group Code',k:'grpcod'},{h:'Group Name',k:'grpnam'},{h:'Status',k:''}, {h:'Action',k:''}];
  productlist: any;
  currencylist: any;
  searchData: any;
  showProductList: Boolean = true;
  constructor(public dialog: MatDialog, public router: Router, public AdminService: AdminService) { }

  ngOnInit() {
    if (!this.router.url.split('/')[3]) {
      this.showProductList = true;
    } else {

      this.showProductList = false
    }
    this.getGroupProduct();
  }
  addProductGroup() {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '300px',
      data: { title: 'Add Product Group', dialogType: 'addproductgroup' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
        console.log(result)
      }
      this.getGroupProduct();
    });
  }

  navigatetopg(product) {
    this.showProductList = false;
    // this.router.navigate(['admin/product/productgroup'], { queryParams: product })
    console.log(product)
    var encryptid = this.AdminService.encryptData(product.grpcod);
    var encryptname = this.AdminService.encryptData(product.grpnam);
    let obj = { id: encryptid, name: encryptname };
    this.router.navigate(['admin/productgroup'], { queryParams: { data: JSON.stringify(obj) } })
  }

  getGroupProduct() {
    this.AdminService.getProductGroups().subscribe(data => {
      this.productlist = data
      this.searchData = data;
    })
  }

  editProductStatus(product) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '300px',
      data: { title: 'Edit Product Group', dialogType: 'editProductStatus', editProductSts: product }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
        console.log(result)
      }
      this.getGroupProduct();
    });
  }

  search(text) {
    this.productlist =this.searchData.filter(e=>{
      if(e.grpcod.includes(text.toUpperCase()) || e.grpnam.includes(text.toUpperCase())){
        return e;
      }
    });
  }
}
