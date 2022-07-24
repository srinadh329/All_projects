import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSnackBar } from '@angular/material';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable()
export class StoreService {
  public text = '';

  constructor(private http: HttpClient, public snackBar: MatSnackBar) {
  }

  // banckend url
  serverurl = environment.apiURL;

  /**
 * Exports as excel file
 * @ param json
 * @ param excelFileName
 */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  openSnackBar(message, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['bar-color'],
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  getCurrencies() {
    return this.http.get(this.serverurl + '/api/currencyandrates/country/currencies/');
  }

  /////////////////////////////////////////////// Airarabia,Nationa Bond //////////////////////////////////////////////////////////

  misapplicationcreate(createdata) { // creation
    return this.http.post(this.serverurl + '/api/misc_applications', createdata);
  }

  getpendingapps(application) { // only authorized application
    return this.http.post(this.serverurl + '/api/misc_applications/get/pendingapplications', application);
  }

  getallapplications(application) { // all created applications
    return this.http.post(this.serverurl + '/api/misc_applications/get/allapplications', application);
  }

  viewApplication(applicationno) { // view application
    return this.http.get(this.serverurl + '/api/misc_applications/' + applicationno);
  }

  updateApplication(update) { // authorize application
    return this.http.post(this.serverurl + '/api/misc_applications/miscauthozie', update);
  }

//////////////////////////////////////////////////// Western Union //////////////////////////////////////////////////////////////

authorizeWesternUnion(authorize) { // authorize western union
    return this.http.post(this.serverurl + '/api/western_union/wuauthorize', authorize);
  }

  getwudata(wudata) {
    return this.http.post(this.serverurl + '/api/western_union/searchbymtcn', wudata);
  }

  viewWesternApplication(data) {
    return this.http.get(this.serverurl + '/api/western_union/' + data);
  }

  //////////////////////////////////////////////////// Dubai Police ////////////////////////////////////////////////////////////

  dubaipoliceDetails(searchdata) {
    return this.http.post(this.serverurl + '/api/dubai_police/searchfine', searchdata);
  }

  dubaipolicepay(finedata) {
    return this.http.post(this.serverurl + '/api/dubai_police/payfine', finedata);
  }

  viewdpApplication(dpdata) {
    return this.http.get(this.serverurl + '/api/dubai_police/' + dpdata);
  }

 //////////////////////////////////////////////////// Reports /////////////////////////////////////////////////////////////////

 dailyreportsbybranch(reportdata) {
    return this.http.post(this.serverurl + '/api/store_reports/get/dailyreportsbybranch/', reportdata);
  }

  getproductsbybranch(branchid) {
    return this.http.get(this.serverurl + '/api/misc_applications/getproducts/' + branchid);

  }

  reportsbyproduct(reportdata) {
    return this.http.post(this.serverurl + '/api/store_reports/get/reportsbyproduct/', reportdata);
  }

  reportsbyuser(reportdata) {
    return this.http.post(this.serverurl + '/api/store_reports/get/reportsbyuser/', reportdata);
  }

  productbasedcharges(productdata) {
    return this.http.post(this.serverurl + '/api/misc_applications/getchargesbyproducts' , productdata);
  }

  ////////////////////////////////////////////////// Dash Board /////////////////////////////////////////////////////////////////

  dashboardstats(branchid) {
    return this.http.get(this.serverurl + '/api/store_reports/branchstatus/' + branchid);
  }
  dashboardgraphs(graphsdata) {
    return this.http.post(this.serverurl + '/api/store_reports/branchgraphs', graphsdata);
  }

  //////////////////////////////////////////////////////  Remittance  ///////////////////////////////////////////////////////////////

  getCountries() { // Getting countries
    return this.http.get(this.serverurl + '/api/masters/getcountries');
  }

  getProducts(productdata) { // Getting products data based on country,currency and branch
    return this.http.post(this.serverurl + '/api/tts/' + productdata.countryid + '/' + productdata.currency + '/' + productdata.branchid, productdata);
  }

  goldcardDetailsGetting(goldcardnumber) { // Goldcard Details Getting
    return this.http.get(this.serverurl + '/api/goldcard/' + goldcardnumber);
  }

  getBanknames() { // Getting Banknames
    return this.http.get(this.serverurl + '/api/transactions');
  }

  accountNumberCheck(accnocheck) { // Getting Account Number Details
    return this.http.get(this.serverurl + '/api/transactions/checkaccno/' + accnocheck);
  }

  icapplicationCreate(createic) { // Instant cash  && Instant Draft application create
    return this.http.post(this.serverurl + '/api/transactions', createic);
  }

  ttapplicationCreate(ttcreate) { // Telegraph Transfer application create
    return this.http.post(this.serverurl + '/api/tts', ttcreate);
  }

  getremittanceapplications(tabledata) { // instanst cash created applications data
    return this.http.post(this.serverurl + '/api/transactions/get/allapplications' + '/' + tabledata.branchid, tabledata);
  }

  viewRemittanceApplication(applicationno) { // View data for IC,ID and TT
    return this.http.get(this.serverurl + '/api/transactions/' + applicationno);
  }

  authorizeTTApplication(authorize) { // authorize TT
    return this.http.post(this.serverurl + '/api/tts/authorizett', authorize);
  }

  authorizeICID(updatedata) {
    return this.http.post(this.serverurl + '/api/transactions/authorize/', updatedata);
  }

  rejectedApplication(rejectdata) { // remittance rejection (2nd level authorization)
    return this.http.post(this.serverurl + '/api/transactions/reject/authorize', rejectdata);
  }


  ////////////////////////////////////////////////////// Foreign Exchange //////////////////////////////////////////////////////

  fxcreate(createdata) { // Foreign Exchange application create
    return this.http.post(this.serverurl + '/api/fxtrans/', createdata);
  }

  getFXapplications(fxapplications) { // Getting all created applications
    return this.http.post(this.serverurl + '/api/fxtrans/get/allapplications', fxapplications);
  }

  viewFXapplication(applicationno) { // View Foreign exchange applications
    return this.http.get(this.serverurl + '/api/fxtrans/' + applicationno);
  }

  authorizeForeignExchange(data) { // Authorize Foreign Exchange
    return this.http.post(this.serverurl + '/api/fxtrans/authorreject', data);
  }

  getCurrencyRates(rates) { // Getting Currency rates Based on loginid,branchid and productid
    return this.http.get(this.serverurl + '/api/transactions/' + rates.createduser + '/' + rates.branchid + '/' + rates.prodid);
  }

  checkproductstatus(productdata) {
    return this.http.post(this.serverurl + '/api/misc_applications/getactiveproducts' , productdata);

  }

  // checkremitance(productdata) {
  //   return this.http.get(this.serverurl + '/api/misc_applications/getremitancestatus/' + productdata);
  // }

  sortremittance(productdata) {
    return this.http.post(this.serverurl + '/api/misc_applications/sortremittance' , productdata);
  }

}

