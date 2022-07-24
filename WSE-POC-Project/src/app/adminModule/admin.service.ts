import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as  CryptoJs from 'crypto-js';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ToastrManager } from 'ng6-toastr-notifications';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';


@Injectable()
export class AdminService {
  constructor(private http: HttpClient, private toastr: ToastrManager) {
  }
  public text: string = '';

  // banckend url
  serverurl = environment.apiURL;


  /**
   * Exports as excel file
   * @ param json
   * @ param excelFileName
   */
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  // Compare two object on update functions
  copmareTwoObjects = (mainObject, copyObject) => {
    let dummyObject = {}, dummyObject1 = {};
    Object.keys(mainObject).forEach(key1 => {
      Object.keys(copyObject).forEach(key2 => {
        if (key1 === key2) {
          dummyObject[key1] = copyObject[key1];
          dummyObject1[key1] = mainObject[key1];
        }
      });
    });
    if (JSON.stringify(dummyObject1) === JSON.stringify(dummyObject)) {
      this.toastr.warningToastr('Please change any value to Update');
      return false;
    } else {
      return true;
    }
  }

  // login
  userLogin(loginData) {
    console.log(this.serverurl);
    return this.http.post(this.serverurl + '/auth/local', loginData);
  }
  getUserrole() {
    return this.http.get(this.serverurl + '/api/usrmas/allroles');
  }

  editUserrole(formvalue) {
    return this.http.put(this.serverurl + '', formvalue);
  }

  getUserStatus() {
    return this.http.get(this.serverurl + '');
  }
  getbranchwiseuserdata(brnid) {
    return this.http.get(this.serverurl + '/api/usrmas/branch/users/' + brnid);
  }

  addRole(data) {
    return this.http.post(this.serverurl + '/api/usrmas/roles', data);
  }
  // currency group get
  getCcyGroups() {
    return this.http.get(this.serverurl + '/api/groups/get/ccygroups/');
  }
  // currency group post/
  currencyGroup(Data) {
    console.log(Data);
    //  serverurl/api/groups/ccygroup;
    return this.http.post(this.serverurl + '/api/groups/ccygroup', Data);
  }
  // currency group post
  //  currencyGroup(Data){
  //    console.log(Data)
  //    return this.http.post(this.serverurl + '/api/groups/ccygroup', Data)
  //  }
  // currency list post
  currencyList(Data) {
    console.log(Data, 'ttttttttt');
    return this.http.post(this.serverurl + '/api/currencyandrates/currencymaintainance', Data);
  }
  // currency list get
  getCcyList(groupid) {
    return this.http.get(this.serverurl + '/api/currencyandrates/groupcurrency/' + groupid);
  }
  // coutry & currency getting
  currenciesGetting() {
    return this.http.get(this.serverurl + '/api/currencyandrates/country/currencies/');
  }
  // country post method
  countrymaintainance(Data) {
    return this.http.post(this.serverurl + '/api/masters/country', Data);
  }
  // country gettin method
  getcountries() {
    return this.http.get(this.serverurl + '/api/masters/getcountries/');
  }
  // adding branch post method
  addBranchList(Data) {
    return this.http.post(this.serverurl + '/api/usrmas/branchadd/', Data);
  }
  // getting branh get method
  getBranchList() {
    return this.http.get(this.serverurl + '/api/usrmas/getBranch/');
  }
  // updat branch post method
  updateBranch(Data) {
    //  api/usrmas/updatebranch
    return this.http.post(this.serverurl + '/api/usrmas/updatebranch/', Data);

  }
  //  adding branch user post method
  addBranchUserMaintainance(Data) {
    console.log(Data, 'sssssssss');
    return this.http.post(this.serverurl + '/api/usrmas/branch/usermaintainance', Data);
  }
  // getting branch user get method
  getBranchUsers(brnid) {
    console.log(brnid);
    return this.http.get(this.serverurl + '/api/usrmas/branch/users/' + brnid);
  }
  // adding gold card post method
  addGoldCardMaintainance(Data) {
    //  api/goldcard/gcmaintainance
    return this.http.post(this.serverurl + '/api/goldcard/gcmaintainance/', Data);
  }
  // getting gold card details get method
  getGoldCardList() {
    return this.http.get(this.serverurl + '/api/goldcard/allcards/');
  }
  // adding product group post
  addProductGroup(Data) {
    return this.http.post(this.serverurl + '/api/groups/prdgroup/', Data);
  }
  // getting product group
  getProductGroups() {
    return this.http.get(this.serverurl + '/api/groups/get/prdgroups');
  }
  // adding product list
  addProduct(Data) {
    return this.http.post(this.serverurl + '/api/products/add/', Data);
  }
  // get product list
  getProducts(groupid) {
    return this.http.get(this.serverurl + '/api/products/' + groupid);
  }
  // get  list product
  getListProduct() {
    return this.http.get(this.serverurl + '/api/products/list');
  }


  addNewCharges(data) {
    return this.http.post(this.serverurl + '/api/charges/', data);
  }

  getchargeslist() {
    return this.http.get(this.serverurl + '/api/charges/allcharges');
  }


  addRates(data) {
    return this.http.post(this.serverurl + '/api/currencyandrates/ratemaintainance', data);
  }
  getRates() {
    return this.http.get(this.serverurl + '/api/currencyandrates/rates');
  }

  getproductList(GroupId) {
    return this.http.get(this.serverurl + '/api/products/' + GroupId);
  }

  // country product get
  getCountryProduct() {
    return this.http.get(this.serverurl + '/api/products');
  }

  // post countryproduct data
  countryProducts(Data) {
    return this.http.post(this.serverurl + '/api/products/countryprd', Data);

  }
  // getting country product
  getProductCountry() {
    return this.http.get(this.serverurl + '/api/products/countryproducts');
  }
  // getting active roles
  getActiveRoles() {
    return this.http.get(this.serverurl + '/api/usrmas/activeroles');
  }

  encryptData(Data) {
    return CryptoJs.AES.encrypt(JSON.stringify(Data), 'secret key 123').toString();
  }

  decryptData(data) {
    if (data) {
      const bytes = CryptoJs.AES.decrypt(data, 'secret key 123');
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      }
    }
  }

  getallproducts() {
    return this.http.get(this.serverurl + '/api/products/');
  }

  getTotalGoldcardCount() {
    console.log('totalproducts');
    return this.http.get(this.serverurl + '/api/adminreports/goldcards/count');
  }

  getTotalBranches() {
    return this.http.get(this.serverurl + '/api/adminreports/total/branches');
  }

  getBrancheUserCount() {
    return this.http.get(this.serverurl + '/api/adminreports/branchusers/count');
  }

  getOnlineUserCount() {
    return this.http.get(this.serverurl + '/api/adminreports/onlineusers/count');
  }

  getTotalTransactions() {
    return this.http.get(this.serverurl + '/api/adminreports/total/transactions');
  }

  getProductData() {
    return this.http.get(this.serverurl + '/api/adminreports/product/transcount');
  }

  onlineuserreports(reportdata) {
    return this.http.post(this.serverurl + '/api/adminreports/onlineuser', reportdata);
  }

  branchUserReports(reportdata) {
    return this.http.post(this.serverurl + '/api/adminreports/branchusers', reportdata);
  }

  branchWiseTransactionReports(reportdata) {
    return this.http.post(this.serverurl + '/api/adminreports/branch/transactions', reportdata);
  }

  productWiseTransactionReports(reportdata) {
    return this.http.post(this.serverurl + '/api/adminreports/product/transactions', reportdata);
  }

  userWiseTransactionReports(reportdata) {
    return this.http.post(this.serverurl + '/api/adminreports/user/transactions', reportdata);
  }

  getTopGoldcadList() {
    return this.http.get(this.serverurl + '/api/adminreports/topgoldcard/transactions');
  }
  getBranchData() {
    return this.http.get(this.serverurl + '/api/adminreports/branch/transcount');
  }
  getBranchUserData() {
    return this.http.get(this.serverurl + '/api/adminreports/branchusers/transactions');
  }

}

