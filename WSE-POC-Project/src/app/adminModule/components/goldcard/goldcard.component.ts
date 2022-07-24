import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-goldcard',
  templateUrl: './goldcard.component.html',
  styleUrls: ['./goldcard.component.scss']
})
export class GoldcardComponent implements OnInit {
  name:any;
  goldcardheader = [{h:'Card Number',k:'gcmnumber'},{h:'Card Type',k:'gcmcrdtyp'},{h:'ID Number',k:'gcmidnumb'},
  {h:'Customer Name',k:'gcmcname'},{h:'Validity',k:'gcmgcexpd'},{h:'Status',k:''}, {h:'Action',k:''}];
  goldcardlist: any;
  updateGoldCard: any;
  searchData: any;
  constructor(public dialog: MatDialog, private AdminService: AdminService) { }

  ngOnInit() {
    this.getGoldCardDetails();
  }
 
  addGold(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '480px',
      data: { title: 'Add Gold Card', dialogType: 'addgold' }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
        console.log(result)
      }
      this.getGoldCardDetails();
    });
  }
  editGoldcard(gold) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '500px',
      data: { title: 'Edit Gold Card', dialogType: 'updategold', updateGoldCard: gold }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
        console.log(result)
      }
      this.getGoldCardDetails();
    });
  }

  getGoldCardDetails() {
    this.AdminService.getGoldCardList().subscribe(data => {
      this.goldcardlist = data
      this.searchData = data
    })
  }
  search(text) {
    this.goldcardlist = this.searchData.filter(e=>{
      if(e.gcmnumber.includes(text) || e.gcmcrdtyp.includes(text.toUpperCase()) 
      || e.gcmidnumb.includes(text.toUpperCase()) || e.gcmcname.includes(text.toUpperCase())){
        return e;
      }
    });
  }
}
