import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StoreService } from '../../store.service';
import { AppService } from 'src/app/app.service';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as moment from 'moment'
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  searchdata: any = [];
  reportForm: any;
  selected = 'daily';
  products: any;
  user: any;
  productreportdata: any;
  date = new Date();
  goldcarddetails: any = [];
  reportHeader = ['S.No', 'Transaction No', 'Applicant Name', 'Product', 'Transaction Amount'];
  productHeader = ['S.No', 'Transaction No', 'Applicant Name', 'Date', 'Transaction  Amount'];
  userHeader = ['S.No', 'Transaction No', 'Product', 'Date', 'Transaction  Amount'];
  name: any;
  reportdata: any;
  disabletodate = true;
  constructor(private formBuilder: FormBuilder, public storeservice: StoreService,
    private appservice: AppService, private toaster: ToastrManager) {}

  ngOnInit() {
    this.user = JSON.parse(this.appservice.getLocalStoarge('user'));
    this.storeservice.getproductsbybranch(this.user.brnid).subscribe(data => {
      this.products = data;
    });
    this.reportForm = this.formBuilder.group({
      product: ['', Validators.required],
      fromdate: [''],
      gcnumber: ['', Validators.required],
      // todate: [''],
    });
    this.reportchange();
  }

  datechange(event) {
    this.reportForm.patchValue({ todate: '' });
    this.disabletodate = false;
  }

  reportchange() {
    if (this.selected === 'daily') {
      this.dailyreports();
    }
    if (this.selected === 'product') {
      this.productreports();
    }
    if (this.selected === 'user') {
      this.userreports();
    }
  }
  dailyreports() {
    const obj = { branchid: this.user.brnid };
    this.storeservice.dailyreportsbybranch(obj).subscribe(data => {
      this.reportdata = data;
      this.reportdata.forEach(element => {
        element.total = Number(element.amount) + Number(element.vat) + Number(element.charges);
        if (element.prdid === 'NB') { element.prdid = 'National Bond'; }
        if (element.prdid === 'AA') { element.prdid = 'Air Arabia'; }
        if (element.prdid === 'TT') { element.prdid = 'Telegraph Transfer'; }
        if (element.prdid === 'FX') { element.prdid = 'Foreign Exchange'; }
        if (element.prdid === 'IC') { element.prdid = 'Instant Cash'; }
        if (element.prdid === 'ID') { element.prdid = 'Instant Draft'; }
        if (element.prdid === 'DP') { element.prdid = 'Dubai Police'; }
        if (element.prdid === 'WU') { element.prdid = 'Western Union'; }
      });
    });
  }
  productreports() {
    console.log(this.reportForm.value)
    const productobj = {
      branchid: this.user.brnid,
      productid: this.reportForm.value.product,
      todate: this.reportForm.value.todate,
      fromdate: this.reportForm.value.fromdate
    };
    this.storeservice.reportsbyproduct(productobj).subscribe(data => {
      this.reportdata = data;
      console.log(this.reportdata)
      this.reportdata.forEach(element => {
        element.total = Number(element.amount) + Number(element.vat) + Number(element.charges);
      });
    });

  }
  userreports() {
    console.log(this.reportForm.value)
    const userobj = {
      branchid: this.user.brnid,
      gcnumber: this.reportForm.value.gcnumber,
      todate: this.reportForm.value.todate,
      fromdate: this.reportForm.value.fromdate
    };
    this.reportdata=[]
    if (this.reportForm.value.gcnumber !== '') {
      this.storeservice.reportsbyuser(userobj).subscribe(data => {
        this.reportdata = data;
        console.log("result",this.reportdata)
        this.reportdata.forEach(element => {
          element.total = Number(element.amount) + Number(element.vat) + Number(element.charges);
          if (element.prdid === 'NB') { element.prdid = 'National Bond'; }
          if (element.prdid === 'AA') { element.prdid = 'Air Arabia'; }
          if (element.prdid === 'TT') { element.prdid = 'Telegraph Transfer'; }
          if (element.prdid === 'FX') { element.prdid = 'Foreign Exchange'; }
          if (element.prdid === 'IC') { element.prdid = 'Instant Cash'; }
          if (element.prdid === 'ID') { element.prdid = 'Instant Draft'; }
          if (element.prdid === 'DP') { element.prdid = 'Dubai Police'; }
          if (element.prdid === 'WU') { element.prdid = 'Western Union'; }
        });
      });
    }
  }

  // pdf Downlaod
  downloadPDF() {
    const doc = new jsPDF();
    doc.setFontSize(15);
    const col = ['S.No', 'Transaction No', 'Applicant Name', 'Product', 'Transaction Amount'];
    const col2 = ['S.No', 'Transaction No', 'Applicant Name', 'Date', 'Transaction  Amount'];
    const col3 = ['S.No', 'Transaction No', 'Product', 'Date', 'Transaction  Amount'];
    const rows = [];

    // pdf download for daily reports
    if (this.selected === 'daily') {
      doc.text(85, 10, 'Daily Reports');
      this.reportdata.forEach((element, index) => {
        const dailyreports = [index + 1, element.trnno, element.appname, element.prdid, element.total];
        rows.push(dailyreports);
      });
    }
    // pdf downlaod for product wise reports
    if (this.selected === 'product') {
      doc.text(80, 10, 'Product Reports');
      this.reportdata.forEach((element, index) => {
        const productreports = [index + 1, element.trnno, element.appname, element.crtdat, element.total];
        rows.push(productreports);
      });
    }

    // pdf download for userwise reports
    if (this.selected === 'user') {
      doc.text(85, 10, 'User Reports');
      this.reportdata.forEach((element, index) => {
        const userreports = [index + 1, element.trnno, element.prdid, element.crtdat, element.total];
        rows.push(userreports);
      });
    }
    // { html: '#my-table' }
    if (this.selected === 'daily') { doc.autoTable(col, rows, { theme: 'grid', margin: { top: 20 } }); }
    if (this.selected === 'product') { doc.autoTable(col2, rows, { theme: 'grid', margin: { top: 20 } }); }
    if (this.selected === 'user') { doc.autoTable(col3, rows, { theme: 'grid', margin: { top: 20 } }); }
    doc.save('Reports.pdf');
  }

  // Excel Download
  downloadExcel() {
    const dailyexceldata = [];
    const productexceldata = [];
    const userexceldata = [];
    // Excel file download for Daily reports
    if (this.selected === 'daily') {
      for (let i = 0; i < this.reportdata.length; i++) {
        dailyexceldata.push({
          SNo: i + 1, TransactionNo: this.reportdata[i].trnno, ApplicantName: this.reportdata[i].appname,
          Product: this.reportdata[i].prdid, TransactionAmount: this.reportdata[i].total
        });
      }
    }
    // Excel file download for Product reports
    if (this.selected === 'product') {
      for (let i = 0; i < this.reportdata.length; i++) {
        productexceldata.push({
          SNo: i + 1, TransactionNo: this.reportdata[i].trnno, ApplicantName: this.reportdata[i].appname,
          Date: this.reportdata[i].crtdat, TransactionAmount: this.reportdata[i].total
        });
      }
    }

    // Excel file download for User reports
    if (this.selected === 'user') {
      for (let i = 0; i < this.reportdata.length; i++) {
        userexceldata.push({
          SNo: i + 1, TransactionNo: this.reportdata[i].trnno, Product: this.reportdata[i].prdid,
          Date: this.reportdata[i].crtdat, TransactionAmount: this.reportdata[i].total
        });
      }
    }
    if (this.selected === 'daily') { this.storeservice.exportAsExcelFile(dailyexceldata, 'Daily Reports'); }
    if (this.selected === 'product') { this.storeservice.exportAsExcelFile(productexceldata, 'Product Reports'); }
    if (this.selected === 'user') { this.storeservice.exportAsExcelFile(userexceldata, 'User Reports'); }
  }

  search(event) {
    this.storeservice.text = event;
  }

  reset(formDirective) {
    formDirective.resetForm();
    this.reportchange();
  }

  goldcardDetails(goldcardnumber) { // Getting Goldcard Details
    if (goldcardnumber.length === 16) {
      this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.date) {
          this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          if (this.goldcarddetails && this.goldcarddetails.gcmgcstat !== 'A') {
            this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown: 1 });
          } else {
            if (this.goldcarddetails == null) {
              this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown: 1 });
            }
          }
        }
      });
    }
  }
}

export interface SatDatepickerRangeValue<D> {   
  begin: D | null;   
  end: D | null; 
}

