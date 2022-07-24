import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from '../../store.service';
import { AppService } from 'src/app/app.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-instantdraft',
  templateUrl: './instantdraft.component.html',
  styleUrls: ['./instantdraft.component.scss']
})
export class InstantdraftComponent implements OnInit {
  today: any = new Date().toISOString() // today date
  instantForm: FormGroup; // FormGroup Name
  goldcarddetails: any = []; // getting goldcard details array
  bankname = false; // boolean variable for bankname field
  numberdetails: any = []; // Getting account number details
  vat: any; // vat
  charges: any; // charges
  totalamount: any; // total
  lcamount: any; // lcamount
  amount: any; // amount
  banknames: any = []; // getting banknames array
  username: any; // getting login user details
  productsdata: any; // Getting products details
  currencyrates:any =[];
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public storeservice: StoreService,
    public appservice: AppService, private toaster: ToastrManager, public router: Router) { }

  ngOnInit() {
    this.getBanknames(); // Getting BANKNAMES

    this.username = this.appservice.getUserdetails(); // Getting loginuser Details
    this.productsdata = JSON.parse(localStorage.getItem('products')); // Getting Product details from remittance component

     // Getting Currency rates
     const obj = { createduser: this.username.loginid, branchid: Number(this.username.brnid), prodid: 'ID' };
     this.storeservice.getCurrencyRates(obj).subscribe((data: any) => {
       this.currencyrates = data;
       this.getcharges();
     }, (error: any) => {
       this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
     });

    // Instantdraft Form form builder
    this.instantForm = this.formBuilder.group({
      gcnumber: ['', Validators.required],
      applicantname: [''],
      applicantmobileno: [''],
      applicationaddress: [''],
      applicantcountry: [''],
      benefname: ['', Validators.required],
      benfmobileno: ['', Validators.required],
      benfaddress: ['', Validators.required],
      currencyid: [this.productsdata.cntcurrency, Validators.required],
      rate: [this.productsdata.currencyrate, Validators.required],
      bankname: ['', Validators.required],
      accountno: ['', Validators.required],
      amount: [this.productsdata.fcamount],
      lcamount: [this.productsdata.lcamount],
      vat: [''],
      charges: ['', Validators.required],
      totalamount: ['']
    });
  }

  // Back button for remittance navigation
  back() {
    this.router.navigate(['/store/remittance']);
  }

  currencycharges=false
  getcharges() {
    this.currencycharges=false
    if(this.productsdata && !this.productsdata.lcamount){
      this.lcamount = this.productsdata.fcamount *this.productsdata.currencyrate;
    }else{
      this.lcamount = this.productsdata.lcamount;
    }
    let sortedArray: string[] = this.currencyrates.sort((n1, n2) => {
      if (Number(n1.transactionlimit ) < Number(n2.transactionlimit)) {
        return 1;
      }
      if (Number(n1.transactionlimit) > Number(n2.transactionlimit)) {
        return -1;
      }
      return 0;
    });
    console.log(this.currencyrates)
    this.currencyrates.forEach(element => {
      if (Number(element.transactionlimit)  >= this.lcamount && element.currencyid === this.productsdata.cntcurrency && 
      element.transactionlimit != null) {
        this.currencycharges=true
        this.instantForm.patchValue({
          charges: element.chargeamount,
          vat: Number(element.chargeamount) * 0.05
        });
      }
   
    });
    console.log(this.instantForm.get('charges').value)
    if(this.currencycharges==false) {
        this.instantForm.patchValue({
          charges:0,
          vat: 0
        });
      } 
  }

  // Getting Goldcard Details
  goldcardDetails(goldcardnumber) {
    if (goldcardnumber.length === 16) {
      this.storeservice.goldcardDetailsGetting(goldcardnumber).subscribe((data: any) => {
        this.goldcarddetails = data;
        if (this.goldcarddetails && this.goldcarddetails.gcmgcexpd <= this.today) {
          this.toaster.errorToastr('Goldcard is Expired', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          if (this.goldcarddetails && this.goldcarddetails.gcmgcstat != 'A') {
            this.toaster.errorToastr('Goldcard is Inactive', '', { position: 'bottom-center', maxShown: 1 });
          } else {
            if (this.goldcarddetails == null) {
              this.toaster.errorToastr('Invalid Goldcard', '', { position: 'bottom-center', maxShown: 1 });
            } else {
              this.instantForm.patchValue({
                applicantname: this.goldcarddetails.gcmcname,
                applicantmobileno: this.goldcarddetails.gcmphnum,
                applicationaddress: this.goldcarddetails.gcmcaddr,
                applicantcountry: this.goldcarddetails.gcmcucnty
              });
            }
          }
        }
      })
    }
  }

  // Calculations for total amount
  get calculations() {
    this.vat = Number(this.instantForm.get('charges').value) * 0.05;
    if (this.productsdata.cntcurrency !== 'AED') {
      this.lcamount = Number(this.instantForm.get('amount').value) * Number(this.instantForm.get('rate').value);
      this.totalamount = Number(this.lcamount) +
        Number(this.instantForm.get('charges').value) + Number(this.vat);
        this.instantForm.patchValue({
          totalamount: this.totalamount
        })
    } else {
      this.totalamount = Number(this.instantForm.get('lcamount').value) + Number(this.instantForm.get('charges').value) + Number(this.vat);

      this.instantForm.patchValue({
        totalamount: this.totalamount,

      })
    }
    return {
      totalamount: this.totalamount, lcamount: Number(this.lcamount), vat: Number(this.vat),
      amount: this.instantForm.get('amount').value
    };

  }

  // Getting Bank account details using account number
  accountNumber(number) {
    if (number.length === 20) {
      this.storeservice.accountNumberCheck(number).subscribe(data => {
        this.numberdetails = data;
        if (this.numberdetails == null) {
          this.toaster.errorToastr('Invalid Account Number', '', { position: 'bottom-center', maxShown: 1 });
        } else {
          this.bankname = true;
          this.instantForm.patchValue({
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

  // Instant draft application create
  instantDraftSubmit(instantForm) {
    console.log(instantForm.value)
    if (instantForm.valid) {
      this.getcharges();
      instantForm.value.status = 'C';
      instantForm.value.createddate = moment(instantForm.value.createddate).format('DD-MM-YYYY');
      instantForm.value.createdtime = moment(this.instantForm.value.createdtime).format('hh:mm:ss');
      instantForm.value.createduser = this.username.loginid;
      instantForm.value.branchid = Number(this.username.brnid);
      instantForm.value.productid = this.productsdata.productid;
      instantForm.value.productgrp = this.productsdata.productgroup;
      if (this.productsdata.cntcurrency !== 'AED') {instantForm.value.amount = Number(this.productsdata.fcamount)}
      if (this.productsdata.cntcurrency === 'AED') {instantForm.value.amount = Number(this.productsdata.lcamount)}
      instantForm.value.rate = Number(this.productsdata.currencyrate);
      instantForm.value.applicantcountry = Number(instantForm.value.applicantcountry);
      delete instantForm.value.lcamount;
      this.storeservice.icapplicationCreate(instantForm.value).subscribe((data: any) => {
        if (data.res) {
          this.toaster.successToastr(data.res, '', { position: 'bottom-center', maxShown: 1 });
        }
      }, (error: any) => {
        this.toaster.errorToastr(error.err, '', { position: 'bottom-center', maxShown: 1 });
      })
      this.router.navigate(['/store/remittance']);
    }
  }

  // Reset Instantcash Form
  reset(formDirective: FormGroupDirective) {
    if (this.productsdata.cntcurrency !== 'AED') {
      var LcAmount= Number(this.instantForm.get('amount').value) * Number(this.instantForm.get('rate').value)
    }else{
      var LcAmount= Number(this.instantForm.get('lcamount').value); 
    }
    formDirective.resetForm({
      // charges:this.productsdata.chargeamount, vat:(this.productsdata.chargeamount)*0.05,
      currencyid: this.productsdata.cntcurrency, rate: this.productsdata.currencyrate,amount: this.productsdata.fcamount,
      lcamount:LcAmount
    });
    this.getcharges();
  }
}
