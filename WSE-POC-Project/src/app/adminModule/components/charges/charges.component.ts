import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss']
})
export class ChargesComponent implements OnInit {
  name:any;
  chargeshearder = [{h:'Product Group',k:'prdgnm'},{h:'Product',k:'prdlnm'},{h:'Currency Group',k:'ccygnm'}, {h:'Currency',k:'ccylnm'},
  {h:'Transaction Amount',k:'amtifg'},{h:'Charge Amount',k:'chgamt'},{h:'Status',k:''}, {h:'Action',k:''}];
  chargeslist = []
  productgroup = []
  searchData:any = []
  constructor(public dialog: MatDialog, private Adminservices: AdminService) {

  }

  ngOnInit() {
    this.getCharges()
    // this.getProuductsGroups()
  }
  addCharges(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '500px',
      data: { title: 'Add Charges', dialogType: 'addcharges' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added') {
        this.getCharges();
      }
    });
  }
  updateCharges(charges) {
    console.log(charges)
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '440px',
      data: { title: 'Edit Charges', dialogType: 'updatecharges', formdata: charges }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'editted') {
        this.getCharges();
      }
    });
  }
  getCharges() {
    this.Adminservices.getchargeslist().subscribe((data: any) => {
      this.chargeslist = data;
      this.searchData = data;
    })
  }

  search(text) {
    this.chargeslist = this.searchData.filter(e=>{
      if(e.prdgnm.includes(text.toUpperCase()) || e.prdlnm.includes(text.toUpperCase()) || e.ccygnm.includes(text.toUpperCase()) || e.ccylnm.includes(text.toUpperCase()) ||
       e.amtifg.includes(text) || e.chgamt.includes(text)){
        return e;
      }
    });
  }
}
