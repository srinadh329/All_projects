import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import 'jspdf-autotable';
import * as jsPDF from 'jspdf';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as moment from 'moment';
import { element } from 'protractor';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit {
  name: any;
  maxDate = new Date();
  branchUserreport: any;
  maxDateuserwise: any;
  reportdata: any;
  selected: any;
  branches: any;
  productdata: any;

  constructor(private formBuilder: FormBuilder, public router: Router, public adminService: AdminService) { }

  branchUersHeaders = [{h:'S.No',k:''},{h:'User Name',k:'usrnam'},{h:'Login Id',k:'loginid'},{h:'Role',k:'roltyp'},
  {h:'Status',k:'status'},{h:'Created Date',k:'crtdat'}];
  onlineUsersHeaders = [{h:'S.No',k:''},{h:'User name',k:'usrname'},{h:'Country',k:'country'},{h:'Email',k:'email'}, 
  {h:'Status',k:'isactive'},{h:'Phone Number',k:'phonenumber'},{h:'Created Date',k:'crtdate'}];
  branchwisetransactionHeader = [{h:'S.No',k:''},{h:'Trans.No',k:'appno'},{h:'Branch',k:'brnid'},{h:'Product',k:'prdid'},{h:'Customer',k:'appname'}, 
  {h:'Trans Amt',k:''},{h:'Created Date',k:'crtdat'}];
  BranchUserTransactionHeaders = [{h:'S.No',k:''},{h:'Trans.No',k:'appno'},{h:'Branch',k:'brnid'},{h:'Product',k:'prdid'},{h:'Customer',k:'appname'},
  {h:'Trans Amt',k:'amount'},{h:'Created Date',k:'crtdat'}];
  productWiseTransactionHeaders = [{h:'S.No',k:''},{h:'Trans.No',k:'appno'},{h:'Branch',k:'brnid'},{h:'Product',k:'prdlnm'},{h:'Customer',k:'appname'}, 
  {h:'Trans Amt',k:'amount'},{h:'Created Date',k:'crtdat'}];

  @ViewChild('TABLE', { static: false }) table: ElementRef;
  maxDatebranch: any;
  maxDateproduct: any;
  maxDateuser: any;
  branchUsers: any = []; // branch users
  branchUserTransactionForm: any; // Branch user wise transactions form
  branchTransactionsForm: any; // Branch wise transactions form
  productWiseTransactionForm: any; // Product wise transactions form
  userStatusForm: any; // users status Form
  branchUsersData: any; // Branch users reports data
  onlineUsersData: any = []; // Online users reports data
  branchUsersTransactionsData: any = []; // Branch users wise transactions reports
  productWiseTransactionsData: any = []; // Products wise transactions data
  branchWiseTrnsactionsData: any = []; // Branch wise transactions data
  disabletodate: Boolean = true;

  ngOnInit() {
    this.getbranchlistdropdown();
    this.products();
    const reportsdata = this.router.url.split('/')[2];
    console.log(reportsdata);
    if (reportsdata === 'onlusrreports') {
      this.selected = 'Online Users';
    } else if (reportsdata === 'brnwisetransactions') {
      this.selected = 'Branch Wise Transactions';
    } else if (reportsdata === 'prdwisetransactions') {
      this.selected = 'Product Wise Transactions';
    } else if (reportsdata === 'brnusrwisetransactions') {
      this.selected = 'Branch User Wise Transactions';
    } else if (reportsdata === 'brnusrreports') {
      this.selected = 'Branch Users';
    }
    this.reportchange();
    this.disabletodate = true;
  }

  products() {
    this.adminService.getallproducts().subscribe((data: any) => {
      this.productdata = data;
    });
  }

  getbranchlistdropdown() {
    this.adminService.getBranchList().subscribe(data => {
      this.branches = data;
    });
  }

  datechangebranch(event) {
    // console.log(event)
    this.branchTransactionsForm.patchValue({ toDate: '' });
    // this.branchUserreport.patchValue({ toDate: '' })
    // this.productWiseTransactionForm.patchValue({ toDate: '' })
    this.maxDatebranch = event.value;
    this.disabletodate = false;
  }

  datechangeproduct(event) {
    // console.log(event)
    this.productWiseTransactionForm.patchValue({ toDate: '' });
    this.maxDateproduct = event.value;
    this.disabletodate = false;
  }

  datechangeuser(event) {
    // console.log(event)
    this.branchUserreport.patchValue({ toDate: '' });
    this.maxDateuser = event.value;
    this.disabletodate = false;
  }

  datechangeuserwise(event) {
    this.branchUserTransactionForm.patchValue({ toDate: '' });
    this.maxDateuserwise = event.value;
    this.disabletodate = false;
  }

  getbranchwiseuser(branch) {
      this.branchUsers=[];
      this.adminService.getbranchwiseuserdata(Number(branch.value)).subscribe((data: any) => {
        this.branchUsers = data;
      });
  }

  /**
   * Exports as excel file
   * @ param json
   * @ param excelFileName
   */
  public exportAsExcelFile(): void {
    const table: any = document.getElementById('table-data');
    // console.log(table)
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table); // converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  reportchange() {
    if (this.selected === 'Branch Users' || this.selected === 'Online Users') {
      this.userStatusForm = this.formBuilder.group({
        status: ['ALL', Validators.required],
      });
      if (this.selected === 'Branch Users') {
        this.getBranchUserList();
      }
      if (this.selected === 'Online Users') {
        this.getOnlineUsersList();
      }
    } else if (this.selected === 'Branch Wise Transactions') {
      this.branchTransactionsForm = this.formBuilder.group({
        fromDate: [''],
        toDate: [''],
        brnid: ['', Validators.required]
      });
    } else if (this.selected === 'Branch User Wise Transactions') {
      this.branchUserTransactionForm = this.formBuilder.group({
        brnid: ['', Validators.required],
        userid: ['', Validators.required],
        fromDate: [''],
        toDate: [''],
      });
    } else if (this.selected === 'Product Wise Transactions') {
      this.productWiseTransactionForm = this.formBuilder.group({
        prdid: ['', Validators.required],
        fromDate: [''],
        toDate: [''],
      });
    }
  }

  getBranchUserList() {
    this.adminService.branchUserReports(this.userStatusForm.value).subscribe(data => {
      this.branchUsersData = data;
    });
  }

  getOnlineUsersList() {
    this.adminService.onlineuserreports(this.userStatusForm.value).subscribe((data: any) => {
      this.onlineUsersData = data;
    });
  }

  downloadPdf() {
    let pdfproduct;
    const doc = new jsPDF();
    const branchUserColumns = ['S.No', 'User Name', 'Login Id', 'Role', 'Status', 'Created Date'];
    const onlineUserColumns = ['S.No', 'User name', 'Country', 'Email', 'Status', 'Phone Number', 'Created Date'];
    const branchTransColumns = ['S.No', 'Trans.No', 'Branch', 'Product', 'Customer', 'Trans Amt', 'Created Date'];
    const branchUserTransColumns = ['S.No', 'Trans.No', 'Branch', 'Product', 'Customer', 'Trans Amt', 'Created Date'];
    const productTransColumns = ['S.No', 'Trans.No', 'Branch', 'Product', 'Customer', 'Trans Amt', 'Created Date'];
    const rows = [];
    doc.text(85, 10, this.selected);
    // pdf download for daily reports
    if (this.selected === 'Branch Users') {
      this.branchUsersData.forEach((e, index) => {
        const brachUsersData = [index + 1, e.usrnam, e.loginid, e.roltyp, e.status === 'A' ? 'Active' : 'In Active', e.crtdat];
        rows.push(brachUsersData);
      });
      doc.autoTable(branchUserColumns, rows, { margin : {top : 20}});
    } else if (this.selected === 'Online Users') {
      this.onlineUsersData.forEach((e, index) => {
        const onlineUsersData = [index + 1, e.usrname, e.country, e.email,
        e.isactive === '1' ? 'Active' : 'In Active', e.phonenumber, moment(e.crtdate).format('DD-MM-YYYY')];
        rows.push(onlineUsersData);
      });
      doc.autoTable(onlineUserColumns, rows, { margin : {top : 20}});
    } else if (this.selected === 'Branch Wise Transactions') {
      this.branchWiseTrnsactionsData.forEach((e, index) => {
        if (e.prdid === 'NB') { pdfproduct = 'National Bond'; }
        if (e.prdid === 'AA') { pdfproduct = 'Air Arabia'; }
        if (e.prdid === 'TT') { pdfproduct = 'Telegraph Transfer'; }
        if (e.prdid === 'FX') { pdfproduct = 'Foreign Exchange'; }
        if (e.prdid === 'IC') { pdfproduct = 'Instant Cash'; }
        if (e.prdid === 'ID') { pdfproduct = 'Instant Draft'; }
        if (e.prdid === 'DP') { pdfproduct = 'Dubai Police'; }
        if (e.prdid === 'WU') { pdfproduct = 'Western Union'; }
        const brntransData = [index + 1, e.appno, e.brnid, pdfproduct, e.appname, e.amount, e.crtdat];
        rows.push(brntransData);
      });
      doc.autoTable(branchTransColumns, rows, {margin : {top : 20}});
    } else if (this.selected === 'Branch User Wise Transactions') {
      this.branchUsersTransactionsData.forEach((e, index) => {
        if (e.prdid === 'NB') { pdfproduct = 'National Bond'; }
        if (e.prdid === 'AA') { pdfproduct = 'Air Arabia'; }
        if (e.prdid === 'TT') { pdfproduct = 'Telegraph Transfer'; }
        if (e.prdid === 'FX') { pdfproduct = 'Foreign Exchange'; }
        if (e.prdid === 'IC') { pdfproduct = 'Instant Cash'; }
        if (e.prdid === 'ID') { pdfproduct = 'Instant Draft'; }
        if (e.prdid === 'DP') { pdfproduct = 'Dubai Police'; }
        if (e.prdid === 'WU') { pdfproduct = 'Western Union'; }
        const brnusertransData = [index + 1, e.appno, e.brnid, pdfproduct, e.appname, e.amount, e.crtdat];
        rows.push(brnusertransData);
      });
      doc.autoTable(branchUserTransColumns, rows, {margin : {top : 20}});
    } else if (this.selected === 'Product Wise Transactions') {
      this.productWiseTransactionsData.forEach((e, index) => {
        const producttransData = [index + 1, e.appno, e.brnid, e.prdlnm, e.appname, e.amount, e.crtdat];
        rows.push(producttransData);
      });
      doc.autoTable(productTransColumns, rows, {margin : {top : 20}});
    }
    doc.save(`${this.selected}.pdf`);
  }

  branchWiseTransactions() {
    if (this.branchTransactionsForm.valid) {
      this.adminService.branchWiseTransactionReports(this.branchTransactionsForm.value).subscribe((data: any) => {
        this.branchWiseTrnsactionsData = data;
      });
    }
  }

  productWiseTransactions() {
    if (this.productWiseTransactionForm.valid) {
      this.adminService.productWiseTransactionReports(this.productWiseTransactionForm.value).subscribe((data: any) => {
        this.productWiseTransactionsData = data;
      });
    }
  }

  branchuserwise() {
    if (this.branchUserTransactionForm.valid) {
      this.adminService.userWiseTransactionReports(this.branchUserTransactionForm.value).subscribe((data: any) => {
        this.branchUsersTransactionsData = data;
      });
    }
  }

  public exportJsonAsExcelFile(data: any[], fileName): void {
    const updatejson = [];
    let pdfproduct = '';
    if (fileName === 'Branch Users') {
      let obj: any = {};
      data.forEach((e, i) => {
        obj = {};
        obj['S.No'] = i + 1,
          obj['User Name'] = e.usrnam,
          obj['Login Id'] = e.loginid,
          obj['Role'] = e.roltyp,
          obj['Status'] = e.status === 'A' ? 'Active' : 'In Active',
          obj['Created Date'] = e.crtdat;
        updatejson.push(obj);
      });
    } else if (fileName === 'Online Users') {
      let obj: any = {};
      data.forEach((e, i) => {
        obj = {};
        obj['S.No'] = i + 1,
          obj['User name'] = e.usrname,
          obj['Country'] = e.country,
          obj['Email'] = e.email,
          obj['Status'] = e.isactive === '1' ? 'Active' : 'In Active',
          obj['Phone Number'] = e.phonenumber,
          obj['Created Date'] = moment(e.crtdate).format('DD-MM-YYYY');
        updatejson.push(obj);
      });
    } else if (fileName === 'Product Wise Transactions') {
      let obj: any = {};
      data.forEach((e, i) => {
        obj = {};
        obj['S.No'] = i + 1,
          obj['Trans.No'] = e.appno,
          obj['Branch'] = e.brnid,
          obj['Product'] = e.prdlnm,
          obj['Customer'] = e.appname,
          obj['Trans Amt'] = e.amount,
          obj['Created Date'] = e.crtdat,
          updatejson.push(obj);
      });
    } else if (fileName === 'Branch Wise Transactions') {
      let obj: any = {};
      data.forEach((e, i) => {
        obj = {};
        if (e.prdid === 'NB') { pdfproduct = 'National Bond'; }
        if (e.prdid === 'AA') { pdfproduct = 'Air Arabia'; }
        if (e.prdid === 'TT') { pdfproduct = 'Telegraph Transfer'; }
        if (e.prdid === 'FX') { pdfproduct = 'Foreign Exchange'; }
        if (e.prdid === 'IC') { pdfproduct = 'Instant Cash'; }
        if (e.prdid === 'ID') { pdfproduct = 'Instant Draft'; }
        if (e.prdid === 'DP') { pdfproduct = 'Dubai Police'; }
        if (e.prdid === 'WU') { pdfproduct = 'Western Union'; }
        obj['S.No'] = i + 1,
          obj['Trans.No'] = e.appno,
          obj['Branch'] = e.brnid,
          obj['Product'] = pdfproduct,
          obj['Customer'] = e.appname,
          obj['Trans Amt'] = e.amount,
          obj['Created Date'] = e.crtdat;
        updatejson.push(obj);
      });
    } else if (fileName === 'Branch User Wise Transactions') {
      let obj: any = {};
      data.forEach((e, i) => {
        obj = {};
        if (e.prdid === 'NB') { pdfproduct = 'National Bond'; }
        if (e.prdid === 'AA') { pdfproduct = 'Air Arabia'; }
        if (e.prdid === 'TT') { pdfproduct = 'Telegraph Transfer'; }
        if (e.prdid === 'FX') { pdfproduct = 'Foreign Exchange'; }
        if (e.prdid === 'IC') { pdfproduct = 'Instant Cash'; }
        if (e.prdid === 'ID') { pdfproduct = 'Instant Draft'; }
        if (e.prdid === 'DP') { pdfproduct = 'Dubai Police'; }
        if (e.prdid === 'WU') { pdfproduct = 'Western Union'; }
        obj['S.No'] = i + 1,
          obj['Trans.No'] = e.appno,
          obj['Branch'] = e.brnid,
          obj['Product'] = pdfproduct,
          obj['Customer'] = e.appname,
          obj['Trans Amt'] = e.amount,
          obj['Created Date'] = e.crtdat;
        updatejson.push(obj);
      });
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(updatejson);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile2(excelBuffer, fileName);
  }
  private saveAsExcelFile2(buffer: any, filename): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, filename + '.xlsx');
  }

}
