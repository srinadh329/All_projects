import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { StoreService } from '../../store.service';
import { AppService } from 'src/app/app.service';
import { DialogboxComponent } from '../../components/dialogbox/dialogbox.component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'app-foreignexchange',
  templateUrl: './foreignexchange.component.html',
  styleUrls: ['./foreignexchange.component.scss']
})
export class ForeignexchangeComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, public storeservice: StoreService, public appservice: AppService,
    public dialog: MatDialog, private toaster: ToastrManager) {

    // Foreignexchange form form group
    this.foreignexchangeForm = this.formBuilder.group({
      goldcardnumber: ['', Validators.required],
      applicantname: [''],
      applicantmobno: [''],
      applicantadrress: [''],
      country: [''],
      accountno: ['', Validators.required],
      bankname: ['', Validators.required],
      benfname: ['', Validators.required],
      benfmobileno: ['', Validators.required],
      benfaddr: ['', Validators.required],
      vat: [''],
      charges: [''],
      totalamount: ['']
    });
    this.fx = this.formBuilder.array([]);
  }
  get calculations() {
    this.totalamount = 0;
    this.test = false;

    for (let i = 0; i < this.fx.value.length; i++) {
      this.currencyrates.forEach(element => {
        if (element.currencyid === this.fx.value[i].currencyid) {
          if (this.currencyrateshow === false) {
            this.fx.value[i].rate = Number(element.currencyrate);
          }
        }
      });
    }
    this.fx.value.forEach(element => {
      if (element.modes === 'B' && element.currencyid !== 'AED') {
        element.lcamount = element.fcamount * element.rate;
      } else if (element.modes === 'S' && element.currencyid !== 'AED') {
        element.lcamount = element.fcamount / element.rate;
      }
      if (element.currencyid === 'AED') { element.fcamount = 0; }
      if (element.lcamount !== '') {
        this.totalamount += Number(element.lcamount);
        this.test = true;
      }

    });
    this.totalamount = this.totalamount + Number(this.foreignexchangeForm.get('charges').value) +
      Number(this.foreignexchangeForm.get('vat').value);
    if (this.test === true && this.totalamount >= 0) {
      this.foreignexchangeForm.patchValue({
        totalamount: this.totalamount
      });
    }

    return this.fx.value;
  }
  // @Output() searchdata = new EventEmitter<string>(); // search
  searchdata: any = [];
  edit = false; // boolean variable for hide delete and add button
  viewdata: any = []; // Viewdata details array
  numberdetails: any = []; // Account nUmber details getting array
  foreignCreative: any; // boolean variable for create form
  foreignexchangeForm: any; // Form group name for foreign exchange
  fx: FormArray; // row array
  goldcarddetails: any = []; // getting goldcard details array
  currencyrates: any = []; // currencyrates array
  bankname = false; // boolean variable for bankname field
  fcamount; // fcamount
  authorize = false; // boolean variable for buttons hide
  rate: any; // rate
  charges: any; // charges
  vat: any; // vat
  totalamount: any; // total
  lcamount; // lcamount
  username: any; // user login details getting
  userrole: any; // getting user roles
  action = false; // role wise buttons hide variable
  foreignexchange = ['Application No', 'Benificiary Name', 'Date', 'Created User', 'Status', 'Action']; // header names
  foreigndata: any = []; // all created applications data getting array
  buysell: any; // modes full form variable
  banknames: any = []; // getting banknames array
  SelectedCurrency: any; // currency selected variable
  test: any; // variable for totalamount
  currencyrateshow = false; // boolean variable for
  today: any = new Date().toISOString(); // today date
  currencyaed = false;
  TotalFcAmount;

  ngOnInit() {
    this.getBanknames(); // Getting Bank Names
    this.username = this.appservice.getUserdetails(); // getting login user details
    this.userrole = this.appservice.getrole(); // getting user roles details
    if (this.userrole === 'CASHIER') {
      this.action = false;
      this.getFXapplications();
    } else {
      this.action = true;
      this.getFXapplications();
    }

    // Getting Currency rates
    const obj = { createduser: this.username.loginid, branchid: Number(this.username.brnid), prodid: 'FX' };
    var currencydataarray = []
    this.storeservice.getCurrencyRates(obj).subscribe((data: any) => {
      data.forEach((element) => {
        if (element && currencydataarray.length == 0) {
          currencydataarray.push(element)
        }
        else if (element && currencydataarray.length > 0) {
          var check = currencydataarray.filter((value) => {
            if (value.currencyid == element.currencyid)
              return value
          })
          if (check.length == 0) {
            currencydataarray.push(element)
          }
        }
      });
      this.currencyrates = currencydataarray;
    }, (error: any) => {
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
    });
    this.foreignexchangeForm.addControl('fx', this.fx);
  }
  // ROW ARRAY formgroup
  createForeign(): FormGroup {
    return this.formBuilder.group({
      currencyid: ['', Validators.required],
      modes: ['', Validators.required],
      fcamount: [''],
      rate: [''],
      lcamount: ['']
    });
  }

  // GET CREATED APPLICATIONS
  getFXapplications() {
    const obj = { product: 'FX', branchid: Number(this.username.brnid) };
    this.storeservice.getFXapplications(obj).subscribe(data => {
      this.foreigndata = data;
      this.searchdata = data;
    });
  }

  // Getting Bank details based on account Number
  accountNumber(number) {
    if (number.length === 20) {
      this.storeservice.accountNumberCheck(number).subscribe(data => {
        this.numberdetails = data;
        if (this.numberdetails == null) {
          this.toaster.errorToastr('Invalid Account Number', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          this.bankname = true;
          this.foreignexchangeForm.patchValue({
            bankname: this.numberdetails.bnknam
          });
        }
      });
    }
  }

  // Getting Banknames
  getBanknames() {
    this.storeservice.getBanknames().subscribe(data => {
      this.banknames = data;
      this.bankname = false;
    });
  }


  // Selection of currencies
  currencychange(event, Index) {
    this.SelectedCurrency = event.value;
  }

  // Adding rows
  rowAdded() {
    this.fx = this.foreignexchangeForm.get('fx');
    this.currencyrateshow = false;
    this.fx.push(this.createForeign());
  }
  // Delete Particular Row
  rowDelete(i: number) {
    this.fx = this.foreignexchangeForm.get('fx');
    this.fx.removeAt(i);
  }

  // Getting Goldcard Details
  goldcardDetails(goldcardnumber) {
    if (goldcardnumber.length === 16) {
      this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        console.log(this.goldcarddetails)
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.today) {
          this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          if (this.goldcarddetails && this.goldcarddetails.gcmgcstat !== 'A') {
            this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown: 1 });
          } else {
            if (this.goldcarddetails == null) {
              this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown: 1 });
            } else {
              this.foreignexchangeForm.patchValue({
                applicantname: this.goldcarddetails.gcmcname,
                applicantmobno: this.goldcarddetails.gcmphnum,
                applicantadrress: this.goldcarddetails.gcmcaddr,
                country: this.goldcarddetails.gcmcucnty
              });
            }
          }
        }
      });
    }
  }

  // Calculations for vat charges and total amount
  currencycharges = false
  getcharges() {
    this.TotalFcAmount = 0;
    this.fx.value.forEach(element => {
      this.currencycharges = false
      if (element) {
        this.TotalFcAmount += Number(element.lcamount);
      }
      let sortedArray: string[] = this.currencyrates.sort((n1, n2) => {
        if (Number(n1.transactionlimit) < Number(n2.transactionlimit)) {
          return 1;
        }
        if (Number(n1.transactionlimit) > Number(n2.transactionlimit)) {
          return -1;
        }
        return 0;
      });
      this.currencyrates.forEach(element => {
        if (Number(element.transactionlimit) >= this.TotalFcAmount && element.transactionlimit != null) {
          this.currencycharges = true
          this.foreignexchangeForm.patchValue({
            charges: element.chargeamount,
            vat: Number(element.chargeamount) * 0.05
          });
        }
      });
      if (this.currencycharges === false) {
        this.foreignexchangeForm.patchValue({
          charges: 0,
          vat: 0
        });
      }
    });
  }


  foreignexchangeSubmit(foreignexchangeForm) {
    if (foreignexchangeForm.valid) {
      foreignexchangeForm.value.createdstatus = 'C';
      foreignexchangeForm.value.createddate = moment(this.foreignexchangeForm.value.createddate).format('DD-MM-YYYY');
      foreignexchangeForm.value.createdtime = moment(this.foreignexchangeForm.value.createdtime).format('hh:mm:ss');
      foreignexchangeForm.value.country = Number(foreignexchangeForm.value.country);
      foreignexchangeForm.value.charges = Number(foreignexchangeForm.value.charges);
      foreignexchangeForm.value.productgroup = this.currencyrates[0].productgrp;
      foreignexchangeForm.value.branchid = Number(this.username.brnid);
      foreignexchangeForm.value.productid = 'FX';
      foreignexchangeForm.value.createduser = this.username.loginid;
      foreignexchangeForm.value.fx.forEach(element => {
        element.fcamount = Number(element.fcamount);
        element.lcamount = Number(element.lcamount);
      });
      delete foreignexchangeForm.value.productgroup;
      this.storeservice.fxcreate(foreignexchangeForm.value).subscribe((data: any) => {
        this.ngOnInit();
        if (data.res) {
          const dialogRef = this.dialog.open(DialogboxComponent, {
            width: '400px',
            height: '200px',
            data: { title: 'Success', res: data.res, dialogType: 'success' }
          });
          dialogRef.afterClosed().subscribe(result => {
            this.foreignCreative = false;
            this.edit = false;
          });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      });
    }

  }
  //  Create form fields button
  createForm() {
    const obj = { product: 'FX', branchid: this.username.brnid };
    this.storeservice.checkproductstatus(obj).subscribe(data => {
      if (data) {
        this.foreignCreative = !this.foreignCreative;
      } else {
        const dialogRef = this.dialog.open(DialogboxComponent, {
          width: '400px',
          height: '250px',
          data: { title: 'Success', dialogType: 'blocked' }
        });
      }
    });
    this.authorize = false;
    if (this.fx.value.length > 0) {
      this.fx.value.forEach((element, index) => {
        this.rowDelete(index);
      });
    }
    if (this.edit === false) {
      if (this.fx.value.length === 0) {
        this.rowAdded();
      }
    }
    this.foreignexchangeForm.reset();
  }

  // Back to table view
  back() {
    this.foreignCreative = false;
    this.edit = false;
    this.foreignexchangeForm.setControl('fx', this.formBuilder.array([]));
  }
  // View Data
  showforeignformdata(event) {
    this.currencyrateshow = true;
    this.edit = true;
    this.bankname = true;
    this.createForm();
    this.storeservice.viewFXapplication(event.appno).subscribe(data => {
      this.viewdata = data;
      this.authorize = true;
      if (this.userrole === 'CASHIER') {
        this.action = false;
      } else if (this.userrole === 'SUPERVISOR') {
        if (this.viewdata[0].status === 'A' || this.viewdata[0].status === 'R') { this.action = false; } else { this.action = true; }
      }
      if (this.fx.value.length > 0) {
        this.fx.value.forEach((element, index) => {
          this.rowDelete(index);
        });
      }

      this.viewdata.forEach(element => {
        // if( element.ccyid == 'AED'){element.fcamount=0;}
        if (element.modes === 'S') { this.buysell = 'Sell'; } else { this.buysell = 'Buy'; }
        if (element) {
          this.fx = this.foreignexchangeForm.get('fx');
          element.modes = this.buysell;
          this.fx.push(
            this.formBuilder.group({
              currencyid: element.ccyid,
              fcamount: element.fca,
              rate: element.rate,
              lcamount: element.lca,
              modes: element.modes
            })
          );
        }
      });

      this.foreignexchangeForm.patchValue({
        goldcardnumber: this.viewdata[0].gcmnumber,
        applicantname: this.viewdata[0].appname,
        applicantmobno: this.viewdata[0].appmobno,
        applicantadrress: this.viewdata[0].appadr,
        country: this.viewdata[0].actr,
        accountno: this.viewdata[0].accno,
        bankname: this.viewdata[0].bnknm,
        benfname: this.viewdata[0].bnfname,
        benfmobileno: this.viewdata[0].bmobno,
        benfaddr: this.viewdata[0].baddr,
        vat: this.viewdata[0].vat,
        charges: this.viewdata[0].chgrat,
        totalamount: this.viewdata[0].totamt,
      });
    });
  }

  // Authorize application based on type
  authorizeFx(type) {
    const data = {
      authdate: moment().format('DD-MM-YYYY'),
      authtime: moment().format('hh:mm:ss'),
      authstatus: type,
      applicationnumber: Number(this.viewdata[0].appno),
      authuser: this.username.loginid,
      branchid: Number(this.username.brnid)
    };
    this.storeservice.authorizeForeignExchange(data).subscribe((data: any) => {
      if (data.res && type === 'A') {
        this.storeservice.openSnackBar(data.res + '' + 'Authorised Successfully', 'X');
        this.foreignCreative = false;
      }
      if (data.res && type === 'R') {
        this.storeservice.openSnackBar('' + data.res, 'X');
        this.foreignCreative = false;
      }
    }, (error: any) => {
      this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
    });
    this.getFXapplications();
  }

  // Reset Form
  reset(formDirective) {
    formDirective.resetForm();
  }

  // Search
  search(event) {
    // this.storeservice.text = event;
    this.foreigndata = this.searchdata.filter(element => {
      if (element.appno.includes(event) || element.bnfname.toLowerCase().includes(event.toLowerCase()) ||
        element.crtdat.includes(event) || element.crtusr.includes(event) || element.status.toLowerCase().includes(event.toLowerCase())) { return element; }
    });
  }
}
