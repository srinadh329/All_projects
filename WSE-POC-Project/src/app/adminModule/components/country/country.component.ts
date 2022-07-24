import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DailogComponent } from '../dailog/dailog.component';
import { AdminService } from '../../admin.service';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  name:any;
  countrylist = [{h:'Country ID',k:'cntcod'},{h:'Country Name',k:'cntnam'},{h:'CountryCurrency',k:'cntccy'},{h:'Swift Code',k:'cnswft'},
  {h:'Country Limit',k:'cntlmt'},{h:'Status',k:''}, {h:'Action',k:''}]
  countrydata: any;
  getCcy: any;
  searchData: any;
  constructor(public dialog: MatDialog, private AdminService: AdminService) { }

  ngOnInit() {
    this.getCountry();
    this.getCountryCCY()
  }
  addCountry(): void {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '435px',
      data: { title: 'Add Country', dialogType: 'addcountry', countryCcy: this.getCcy }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "add") {
      }
      this.getCountry();
    });
  }

  getCountry() {
    this.AdminService.getcountries().subscribe(data => {
      this.countrydata = data
      this.searchData = data
    })
  }

  getCountryCCY() {
    this.AdminService.currenciesGetting().subscribe(data => {
      this.getCcy = data
    })
  }

  editCountry(country) {
    const dialogRef = this.dialog.open(DailogComponent, {
      width: '700px',
      height: '435px',
      data: { title: 'Edit Country', dialogType: 'editcountry', formData: country,countryCcy:this.getCcy }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result == "update") {
      }
      this.getCountry();
    });
  }

  search(e){
    this.countrydata=this.searchData.filter(x => {
     if(x.cntcod.includes(e.toUpperCase()) || x.cntnam.includes(e.toUpperCase()) || x.cntccy.includes(e.toUpperCase()) || x.cnswft.includes(e.toUpperCase()) || x.cntlmt.includes(e)){
       return x;
    };
    });
  }
}
