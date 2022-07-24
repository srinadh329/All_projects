import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {
  name:any;
  ratesheaders = [{h:'Currency Group',k:'grpnam'},{h:'Currency',k:'ccylnm'},{h:'Lower Rate',k:'lowrat'},{h:'Higher Rate',k:'higrat'}, 
  {h:'Currency Rate',k:'ccyrat'},{h:'Status',k:''}, {h:'Action',k:''}]
  rateslist = []
  constructor(public dialog: MatDialog, private AdminService: AdminService) { }
  allRates: any;
  searchData:any;
  ngOnInit() {
    this.getrates();
  }


  rates(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '430px',
      data: { title: 'Add Rates', dialogType: 'addrates' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'added') {
        this.getrates();
      }
    });
  }


  editRates(Data) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '430px',
      data: { title: 'Edit Rates', dialogType: 'editrates', formdata: Data }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'editted') {
        this.getrates();
      }
    });
  }

  getrates() {
    this.AdminService.getRates().subscribe((data: any) => {
      this.rateslist = data;
      this.searchData = data
    })
  }

  search(text) {
    this.rateslist = this.searchData.filter(e=>{
      if(e.grpnam.includes(text.toUpperCase()) || e.ccylnm.includes(text.toUpperCase()) ||
       e.lowrat.includes(text) || e.higrat.includes(text) || e.ccyrat.includes(text)){
        return e;
      }
    });
  }
}
